import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store"
import { Quest } from "@vuo/models/Quest";
import { ChannelUser } from "./WebSocketStore";

export interface CategoryQuest {
  title: string;
  quests: Quest[];
}

class QuestDataStore {
  data?: CategoryQuest[] = undefined;

  //TODO separate user data store maybe?
  token?: string = undefined;
  shadowAccount: boolean = false
  username: string = ""
  user?: ChannelUser = undefined;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private async init() {
    await makePersistable(this, {
      name: "QuestDataStore",
      // properties: ["data"],
      //Added for handling shadowaccounts, refactor into other store
      properties: ["data", "token", "shadowAccount", "username", "user"],
      storage: window.localStorage,
    });
  }

  get getQuestById() {
    return (id: string): Quest | undefined => {
      if (!this.data) return undefined;

      return this.data.reduce(
        (foundQuest: Quest | undefined, category: CategoryQuest) =>
          foundQuest || category.quests.find(q => q.id === id),
        undefined
      );
    }
  }
}

const questDataStore = new QuestDataStore()
export default questDataStore