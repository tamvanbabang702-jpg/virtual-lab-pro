import { useAppStore } from '@/stores/useAppStore';
import { experiments } from '@/data/experiments';
import { BarChart3, Target, FlaskConical, Shield, Beaker } from 'lucide-react';

const skillLabels: Record<string, { label: string; icon: typeof BarChart3; color: string }> = {
  stoichiometry: { label: 'Stoichiometry', icon: Target, color: 'text-primary' },
  reactionUnderstanding: { label: 'Reactions', icon: FlaskConical, color: 'text-info' },
  labTechniques: { label: 'Lab Skills', icon: Beaker, color: 'text-xp' },
  safetyAwareness: { label: 'Safety', icon: Shield, color: 'text-success' },
};

export default function ProgressPage() {
  const { level, xp, xpToNext, completedExperiments, skillScores } = useAppStore();

  const totalXPEarned = completedExperiments.reduce((sum, e) => sum + e.xpEarned, 0);
  const avgScore = completedExperiments.length > 0
    ? Math.round(completedExperiments.reduce((sum, e) => sum + e.score, 0) / completedExperiments.length)
    : 0;

  const uniqueCompleted = new Set(completedExperiments.map(e => e.experimentId)).size;

  return (
    <div className="p-4 space-y-5">
      <h1 className="font-display text-lg font-bold neon-text">Progress</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card p-4 rounded-xl text-center">
          <p className="text-2xl font-display font-bold text-primary">{level}</p>
          <p className="text-[10px] text-muted-foreground">Level</p>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <p className="text-2xl font-display font-bold text-xp">{totalXPEarned}</p>
          <p className="text-[10px] text-muted-foreground">Total XP</p>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <p className="text-2xl font-display font-bold text-foreground">{uniqueCompleted}/{experiments.length}</p>
          <p className="text-[10px] text-muted-foreground">Experiments</p>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <p className="text-2xl font-display font-bold text-info">{avgScore}%</p>
          <p className="text-[10px] text-muted-foreground">Avg Quiz Score</p>
        </div>
      </div>

      {/* Skills */}
      <div className="glass-card p-4 rounded-xl space-y-4">
        <h2 className="text-sm font-display font-semibold text-foreground">Skill Mastery</h2>
        {Object.entries(skillScores).map(([key, value]) => {
          const info = skillLabels[key];
          if (!info) return null;
          const Icon = info.icon;
          return (
            <div key={key} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${info.color}`} />
                  <span className="text-xs text-foreground font-medium">{info.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">{value}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${value}%`,
                    background: `linear-gradient(90deg, hsl(var(--primary)/0.5), hsl(var(--primary)))`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent History */}
      <div className="space-y-2">
        <h2 className="text-sm font-display font-semibold text-foreground">Recent Activity</h2>
        {completedExperiments.length === 0 ? (
          <p className="text-xs text-muted-foreground glass-card p-4 rounded-xl text-center">
            No experiments completed yet. Start your first one!
          </p>
        ) : (
          completedExperiments.slice(-5).reverse().map((record, idx) => {
            const exp = experiments.find(e => e.id === record.experimentId);
            return (
              <div key={idx} className="glass-card p-3 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                  <FlaskConical className="w-4 h-4 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{exp?.title}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(record.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-foreground">{record.score}%</p>
                  <p className="text-[10px] text-xp">+{record.xpEarned} XP</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
