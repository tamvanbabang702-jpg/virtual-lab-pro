import { useNavigate } from 'react-router-dom';
import { experiments } from '@/data/experiments';
import { useAppStore } from '@/stores/useAppStore';
import { FlaskConical, Clock, Zap, CheckCircle2, Lock } from 'lucide-react';

export default function ExperimentsPage() {
  const navigate = useNavigate();
  const { completedExperiments } = useAppStore();
  const completedIds = new Set(completedExperiments.map(e => e.experimentId));

  const categories = [...new Set(experiments.map(e => e.category))];

  return (
    <div className="p-4 space-y-5">
      <h1 className="font-display text-lg font-bold neon-text">Experiments</h1>
      <p className="text-xs text-muted-foreground">
        {completedIds.size}/{experiments.length} completed
      </p>

      {/* Progress Bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full progress-bar-glow transition-all duration-500"
          style={{ width: `${(completedIds.size / experiments.length) * 100}%` }}
        />
      </div>

      {categories.map(cat => {
        const catExperiments = experiments.filter(e => e.category === cat);
        return (
          <div key={cat} className="space-y-2">
            <h2 className="text-sm font-display font-semibold text-foreground">{cat}</h2>
            {catExperiments.map(exp => {
              const completed = completedIds.has(exp.id);
              return (
                <div
                  key={exp.id}
                  className="glass-card-hover p-3 rounded-xl cursor-pointer flex items-center gap-3"
                  onClick={() => navigate(`/experiment/${exp.id}`)}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    completed ? 'bg-success/20' :
                    exp.difficulty === 'beginner' ? 'bg-primary/10' :
                    exp.difficulty === 'intermediate' ? 'bg-info/10' : 'bg-destructive/10'
                  }`}>
                    {completed ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <FlaskConical className={`w-5 h-5 ${
                        exp.difficulty === 'beginner' ? 'text-primary' :
                        exp.difficulty === 'intermediate' ? 'text-info' : 'text-destructive'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{exp.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`capitalize px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        exp.difficulty === 'beginner' ? 'bg-success/10 text-success' :
                        exp.difficulty === 'intermediate' ? 'bg-info/10 text-info' : 'bg-destructive/10 text-destructive'
                      }`}>{exp.difficulty}</span>
                      <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{exp.estimatedTime}m</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-xp font-semibold">
                    <Zap className="w-3 h-3" />
                    {exp.xpReward}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
