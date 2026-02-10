import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { experiments } from '@/data/experiments';
import { FlaskConical, Flame, Trophy, Zap, Play, Clock, WifiOff, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { name, level, xp, xpToNext, streak, completedExperiments, currentExperimentId } = useAppStore();

  const completedIds = new Set(completedExperiments.map(e => e.experimentId));
  const recommended = experiments.filter(e => !completedIds.has(e.id)).slice(0, 3);
  const dailyChallenge = experiments.find(e => !completedIds.has(e.id)) || experiments[0];

  const xpPercent = (xp / xpToNext) * 100;

  return (
    <div className="p-4 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="text-xl font-display font-bold text-foreground">{name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 glass-card px-3 py-1.5 rounded-full">
            <WifiOff className="w-3 h-3 text-success" />
            <span className="text-xs text-success font-medium">Offline Ready</span>
          </div>
        </div>
      </div>

      {/* Level + XP Bar */}
      <div className="glass-card p-4 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Level {level}</p>
              <p className="text-xs text-muted-foreground">{xp} / {xpToNext} XP</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-streak" />
            <span className="text-sm font-bold text-streak">{streak}</span>
            <span className="text-xs text-muted-foreground">day streak</span>
          </div>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full progress-bar-glow transition-all duration-500"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      {/* Daily Challenge */}
      <div className="glass-card-hover p-4 rounded-xl border-primary/20 cursor-pointer" onClick={() => navigate(`/experiment/${dailyChallenge.id}`)}>
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-4 h-4 text-xp" />
          <span className="text-xs font-semibold text-xp uppercase tracking-wider">Daily Challenge</span>
        </div>
        <h3 className="font-display text-sm font-semibold text-foreground mb-1">{dailyChallenge.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{dailyChallenge.objective}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{dailyChallenge.estimatedTime} min</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-xp" />+{dailyChallenge.xpReward} XP</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Play className="w-4 h-4 text-primary ml-0.5" />
          </div>
        </div>
      </div>

      {/* Resume Experiment */}
      {currentExperimentId && (
        <div
          className="glass-card-hover p-4 rounded-xl cursor-pointer animate-shimmer"
          onClick={() => navigate(`/experiment/${currentExperimentId}`)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FlaskConical className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-accent font-medium">Continue Experiment</p>
                <p className="text-sm font-semibold text-foreground">
                  {experiments.find(e => e.id === currentExperimentId)?.title}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Recommended Experiments */}
      <div>
        <h2 className="font-display text-sm font-semibold text-foreground mb-3">Recommended</h2>
        <div className="space-y-2">
          {recommended.map(exp => (
            <div
              key={exp.id}
              className="glass-card-hover p-3 rounded-xl cursor-pointer flex items-center gap-3"
              onClick={() => navigate(`/experiment/${exp.id}`)}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                exp.difficulty === 'beginner' ? 'bg-success/20' :
                exp.difficulty === 'intermediate' ? 'bg-info/20' : 'bg-destructive/20'
              }`}>
                <FlaskConical className={`w-5 h-5 ${
                  exp.difficulty === 'beginner' ? 'text-success' :
                  exp.difficulty === 'intermediate' ? 'text-info' : 'text-destructive'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{exp.title}</p>
                <p className="text-xs text-muted-foreground">{exp.category} · {exp.estimatedTime} min</p>
              </div>
              <div className="text-xs text-xp font-semibold">+{exp.xpReward} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
