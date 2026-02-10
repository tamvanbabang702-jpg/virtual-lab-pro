import { useState } from 'react';
import { useAppStore, ALL_ACHIEVEMENTS } from '@/stores/useAppStore';
import { User, Flame, Trophy, Star, Pencil, Check } from 'lucide-react';

export default function ProfilePage() {
  const { name, setName, level, xp, xpToNext, streak, achievements, completedExperiments } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const saveName = () => {
    setName(tempName);
    setEditing(false);
  };

  return (
    <div className="p-4 space-y-5">
      {/* Profile Header */}
      <div className="glass-card p-6 rounded-xl flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center neon-glow">
          <User className="w-10 h-10 text-primary" />
        </div>
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="bg-secondary text-foreground text-sm px-3 py-1.5 rounded-lg border border-border focus:outline-none focus:border-primary"
              autoFocus
            />
            <button onClick={saveName} className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-primary" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="font-display text-lg font-bold text-foreground">{name}</h1>
            <button onClick={() => setEditing(true)} className="text-muted-foreground">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1 text-primary">
            <Star className="w-4 h-4" />
            <span className="font-semibold">Level {level}</span>
          </div>
          <div className="flex items-center gap-1 text-streak">
            <Flame className="w-4 h-4" />
            <span className="font-semibold">{streak} day streak</span>
          </div>
        </div>
        {/* XP */}
        <div className="w-full mt-2">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>{xp} XP</span>
            <span>{xpToNext} XP to next level</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full progress-bar-glow transition-all" style={{ width: `${(xp / xpToNext) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="glass-card p-3 rounded-xl text-center">
          <p className="text-lg font-display font-bold text-foreground">{completedExperiments.length}</p>
          <p className="text-[10px] text-muted-foreground">Experiments</p>
        </div>
        <div className="glass-card p-3 rounded-xl text-center">
          <p className="text-lg font-display font-bold text-foreground">{achievements.length}</p>
          <p className="text-[10px] text-muted-foreground">Badges</p>
        </div>
        <div className="glass-card p-3 rounded-xl text-center">
          <p className="text-lg font-display font-bold text-foreground">
            {completedExperiments.length > 0
              ? Math.round(completedExperiments.reduce((s, e) => s + e.score, 0) / completedExperiments.length)
              : 0}%
          </p>
          <p className="text-[10px] text-muted-foreground">Avg Score</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        <h2 className="text-sm font-display font-semibold text-foreground flex items-center gap-2">
          <Trophy className="w-4 h-4 text-xp" /> Achievements
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {ALL_ACHIEVEMENTS.map(a => {
            const unlocked = achievements.find(ua => ua.id === a.id);
            return (
              <div
                key={a.id}
                className={`glass-card p-3 rounded-xl transition-all ${
                  unlocked ? 'border-primary/30 neon-glow' : 'opacity-40'
                }`}
              >
                <div className="text-2xl mb-1">{a.icon}</div>
                <p className="text-xs font-semibold text-foreground">{a.title}</p>
                <p className="text-[10px] text-muted-foreground">{a.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
