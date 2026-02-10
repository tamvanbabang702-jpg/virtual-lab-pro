import { create } from 'zustand';
import { storage } from '@/services/storage';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface ExperimentRecord {
  experimentId: string;
  completedAt: string;
  score: number;
  xpEarned: number;
}

export interface UserState {
  name: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  lastActiveDate: string;
  achievements: Achievement[];
  completedExperiments: ExperimentRecord[];
  currentExperimentId: string | null;
  currentStep: number;
  skillScores: {
    stoichiometry: number;
    reactionUnderstanding: number;
    labTechniques: number;
    safetyAwareness: number;
  };
}

interface AppStore extends UserState {
  // Actions
  setName: (name: string) => void;
  addXP: (amount: number) => void;
  completeExperiment: (record: ExperimentRecord) => void;
  unlockAchievement: (achievement: Achievement) => void;
  setCurrentExperiment: (id: string | null) => void;
  setCurrentStep: (step: number) => void;
  updateStreak: () => void;
  updateSkill: (skill: keyof UserState['skillScores'], delta: number) => void;
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

const XP_PER_LEVEL = 500;

const defaultState: UserState = {
  name: 'Student',
  level: 1,
  xp: 0,
  xpToNext: XP_PER_LEVEL,
  streak: 0,
  lastActiveDate: '',
  achievements: [],
  completedExperiments: [],
  currentExperimentId: null,
  currentStep: 0,
  skillScores: {
    stoichiometry: 10,
    reactionUnderstanding: 10,
    labTechniques: 10,
    safetyAwareness: 15,
  },
};

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first-experiment', title: 'First Experiment', description: 'Complete your first experiment', icon: '🧪' },
  { id: 'five-experiments', title: 'Lab Regular', description: 'Complete 5 experiments', icon: '🔬' },
  { id: 'ten-experiments', title: 'Lab Master', description: 'Complete all 10 experiments', icon: '🏆' },
  { id: 'perfect-quiz', title: 'Perfect Score', description: 'Get 100% on a quiz', icon: '⭐' },
  { id: 'level-5', title: 'Rising Chemist', description: 'Reach level 5', icon: '📈' },
  { id: 'level-10', title: 'Expert Chemist', description: 'Reach level 10', icon: '🎓' },
  { id: 'streak-3', title: 'Consistent', description: '3-day streak', icon: '🔥' },
  { id: 'streak-7', title: 'Dedicated', description: '7-day streak', icon: '💪' },
  { id: 'safety-first', title: 'Safety First', description: 'Read all safety warnings', icon: '🛡️' },
  { id: 'speed-run', title: 'Speed Chemist', description: 'Complete an experiment in under 2 min', icon: '⚡' },
];

export const useAppStore = create<AppStore>((set, get) => ({
  ...defaultState,

  setName: (name) => {
    set({ name });
    get().saveToStorage();
  },

  addXP: (amount) => {
    const { xp, level, xpToNext } = get();
    let newXP = xp + amount;
    let newLevel = level;
    let newXPToNext = xpToNext;

    while (newXP >= newXPToNext) {
      newXP -= newXPToNext;
      newLevel++;
      newXPToNext = XP_PER_LEVEL + (newLevel - 1) * 100;
    }

    set({ xp: newXP, level: newLevel, xpToNext: newXPToNext });

    // Check level achievements
    if (newLevel >= 5) get().unlockAchievement(ALL_ACHIEVEMENTS.find(a => a.id === 'level-5')!);
    if (newLevel >= 10) get().unlockAchievement(ALL_ACHIEVEMENTS.find(a => a.id === 'level-10')!);

    get().saveToStorage();
  },

  completeExperiment: (record) => {
    const { completedExperiments } = get();
    const updated = [...completedExperiments, record];
    set({ completedExperiments: updated });

    // Achievement checks
    if (updated.length === 1) get().unlockAchievement(ALL_ACHIEVEMENTS.find(a => a.id === 'first-experiment')!);
    if (updated.length >= 5) get().unlockAchievement(ALL_ACHIEVEMENTS.find(a => a.id === 'five-experiments')!);
    if (new Set(updated.map(e => e.experimentId)).size >= 10) get().unlockAchievement(ALL_ACHIEVEMENTS.find(a => a.id === 'ten-experiments')!);
    if (record.score === 100) get().unlockAchievement(ALL_ACHIEVEMENTS.find(a => a.id === 'perfect-quiz')!);

    get().saveToStorage();
  },

  unlockAchievement: (achievement) => {
    const { achievements } = get();
    if (achievements.find(a => a.id === achievement.id)) return;
    set({ achievements: [...achievements, { ...achievement, unlockedAt: new Date().toISOString() }] });
    get().saveToStorage();
  },

  setCurrentExperiment: (id) => {
    set({ currentExperimentId: id, currentStep: 0 });
    get().saveToStorage();
  },

  setCurrentStep: (step) => {
    set({ currentStep: step });
    get().saveToStorage();
  },

  updateStreak: () => {
    const today = new Date().toDateString();
    const { lastActiveDate, streak } = get();
    if (lastActiveDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isConsecutive = lastActiveDate === yesterday.toDateString();

    const newStreak = isConsecutive ? streak + 1 : 1;
    set({ streak: newStreak, lastActiveDate: today });

    if (newStreak >= 3) get().unlockAchievement(ALL_ACHIEVEMENTS.find(a => a.id === 'streak-3')!);
    if (newStreak >= 7) get().unlockAchievement(ALL_ACHIEVEMENTS.find(a => a.id === 'streak-7')!);

    get().saveToStorage();
  },

  updateSkill: (skill, delta) => {
    const { skillScores } = get();
    set({
      skillScores: {
        ...skillScores,
        [skill]: Math.min(100, Math.max(0, skillScores[skill] + delta)),
      },
    });
    get().saveToStorage();
  },

  loadFromStorage: async () => {
    const data = await storage.get<UserState>('user_state');
    if (data) {
      set({ ...data });
    }
  },

  saveToStorage: async () => {
    const state = get();
    const { setName, addXP, completeExperiment, unlockAchievement, setCurrentExperiment, setCurrentStep, updateStreak, updateSkill, loadFromStorage, saveToStorage, ...data } = state;
    await storage.set('user_state', data);
  },
}));
