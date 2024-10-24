// @ts-nocheck

import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel, BaseViewModelProps } from "@vuo/viewModels/BaseViewModel";

import questDataStore, { CategoryQuest } from "@vuo/stores/QuestDataStore";
import sessionDataStore from "@vuo/stores/SessionDataStore";
import { Quest } from "@vuo/models/Quest";
import { PlayerAchievement } from "@vuo/models/PlayerAchievement";
import { PlayerProfile } from "@vuo/models/PlayerProfile";

//FOR CREATING SHADOW ACCOUNT

export interface ShadowAccountResponse {
  token: string;
  username: string;
  user: any;
}
  
export interface ProfileResponse {
  sex: string;
  age: number;
  height: number;
  currentWeight: number;
  goalWeight: number;
  motivation: string;
  activityLevel: string;
  mindset: string;
  speed: number;
  dietPlan: string;
  pastExperience: string;
  format: string;
  allergies: string[];
  dislikes: string[];
  cuisines: string[];
  pantry: string[];
  cookingSkills: string;
  onboardingStatus: any;
}

export interface QuestLinePlayerAchievement extends PlayerAchievement {
  progressQuests?: Quest[];
}

export interface QuestLine {
  mainPlayerAchievement: PlayerAchievement;
  subPlayerAchievements?: QuestLinePlayerAchievement[];
  completedPercentage: number;
}

export default class QuestBrowseViewModel extends BaseViewModel {

  private sessionDataStore = sessionDataStore; // Use sessionDataStore

  questDataStore = questDataStore
  foundQuests?: Quest[]
  currentQuestLines: QuestLine[] = []

  constructor() {
    super()

    makeObservable(this, {
      ...BaseViewModelProps,
      loadData: action,
      searchQuests: action,
      data: computed,
      currentQuestLines: observable,
      foundQuests: observable,
    })

    this.loadData()
  }

  get data(): CategoryQuest[] | undefined {
    return this.questDataStore.data
  }

  async loadData(): Promise<void> {
    const data = await this.fetchData<Quest[]>({ url: 'v1/quests', method: 'GET' });

    if (data) {
      const tagMap: Record<string, CategoryQuest> = {}

      data.forEach(quest => {
        quest.tags.forEach(tag => {
          if (!tagMap[tag.title]) {
            tagMap[tag.title] = { title: tag.title, quests: [] };
          }
          tagMap[tag.title].quests.push(quest);
        });
      });
      runInAction(() => {
        this.questDataStore.data = Object.values(tagMap)
      })
    }

    const playerProfile = await this.fetchData<PlayerProfile>({ url: 'v1/players/me/profile', method: 'GET' })
    if (playerProfile) {
      const { trackedPlayerAchievements } = playerProfile
      const achievements = await this.fetchData<PlayerAchievement[]>({ url: 'v1/playerAchievements/me', method: 'GET' })
      if (achievements) {
        const questLines = trackedPlayerAchievements.map(trackedPlayerAchievement => {
          const mainPlayerAchievement = achievements!.find(questLine => (questLine.achievement.id === trackedPlayerAchievement.achievement.id))
          if (mainPlayerAchievement) {
            const subPlayerAchievements = achievements!.filter(subQuestline =>
              mainPlayerAchievement?.achievement.subAchievements.some(subAchievement =>
                subAchievement.id === subQuestline.achievement.id
              )
            );
            const completedPercentage = (subPlayerAchievements.filter(sb => sb.completed).length / subPlayerAchievements.length) * 100
            return {
              mainPlayerAchievement,
              subPlayerAchievements,
              completedPercentage
            } as QuestLine
          }
          return undefined
        }).filter(Boolean) as QuestLine[]
        runInAction(() => {
          this.currentQuestLines = questLines || []
        })
      }
    }
  }

  async createShadowAccount(): Promise<any> {
    const response = await this.fetchData<ShadowAccountResponse>({
      url: "v1/register/create-shadow-account",
      method: "POST"
    });
    //TODO create a new store for accounts
    this.sessionDataStore.token = response!.token;
    this.sessionDataStore.username = response!.username;
    this.sessionDataStore.user = response!.user;
    this.sessionDataStore.shadowAccount = true;
    return response?.user.id
  }

  async createUserProfile(shadowAccountUserId: string): Promise<void> {
    const config: any = {
      url: 'v1/profile/create', //TODO make this follow the pattern of the rest of the code
    };
    const userProfile = await this.postData<ProfileResponse>(config.url, {userId: shadowAccountUserId});
    if (userProfile) {
      this.sessionDataStore.userProfile = userProfile;
    }
    console.log("storeeee", this.sessionDataStore)
  }

  async searchQuests(): Promise<void> {
    const data = await this.fetchData<Quest[]>({ url: 'api/quests/search', method: 'GET' });

    if (data) {
      runInAction(() => {
        this.foundQuests = data
      })
    }
  }
}