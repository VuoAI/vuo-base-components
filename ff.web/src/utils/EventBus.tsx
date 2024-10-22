import mitt from 'mitt';
import { PlayerAchievement } from '@vuo/models/PlayerAchievement';
import { Step } from '@vuo/models/Step';
import { PlayerQuest } from '@vuo/models/PlayerQuest';
import { ChannelUser } from '@vuo/stores/WebSocketStore';

export interface StepCompleteParameters {
  step: Step;
  playerQuest?: PlayerQuest;
}

export interface QuestCompletedParameters {
  questId: string;
  playerQuest?: PlayerQuest;
}

export interface PlayerQuestDataChangedParameters {
  playerQuest: PlayerQuest;
}

export interface MembershipClaimedParameters { }

export type Events = {
  achievementUnlocked: PlayerAchievement;
  questCompleted: QuestCompletedParameters;
  stepCompleted: StepCompleteParameters;
  playerQuestDataChanged: PlayerQuestDataChangedParameters;
  playerJoinedChannel: ChannelUser;
  membershipClaimed: MembershipClaimedParameters;
}

const EventBus = mitt<Events>();
export default EventBus
