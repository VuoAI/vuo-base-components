import mongoose, { Schema, Document } from 'mongoose';

enum OnboardingStatus {
  notStarted = 'notStarted',
  inProgress = 'inProgress',
  completed = 'completed',
}

interface IOnboarding extends Document {
  userId: mongoose.Types.ObjectId;
  sex?: string;
  age?: number;
  height?: number;
  currentWeight?: number;
  goalWeight?: number;
  motivation?: string;
  activityLevel?: string;
  mindset?: string;
  speed?: number;
  dietPlan?: string;
  pastExperience?: string;
  format?: string;
  allergies?: string[];
  dislikes?: string[];
  cuisines?: string[];
  pantry?: string[];
  cookingSkills?: string;
  onboardingStatus?: OnboardingStatus;
}

const OnboardingSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sex: { type: String, default: '' },
  age: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  currentWeight: { type: Number, default: 0 },
  goalWeight: { type: Number, default: 0 },
  motivation: { type: String, default: '' },
  activityLevel: { type: String, default: '' },
  mindset: { type: String, default: '' },
  speed: { type: Number, default: 0 },
  dietPlan: { type: String, default: '' },
  pastExperience: { type: String, default: '' },
  format: { type: String, default: '' },
  allergies: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
  cuisines: { type: [String], default: [] },
  pantry: { type: [String], default: [] },
  cookingSkills: { type: String, default: '' },
  onboardingStatus: {
    type: String,
    enum: Object.values(OnboardingStatus),
    default: OnboardingStatus.notStarted,
  },
}, {
  timestamps: true,
});

const Onboarding = mongoose.model<IOnboarding>('Onboarding', OnboardingSchema);

export default Onboarding;
export { IOnboarding, OnboardingSchema, OnboardingStatus };