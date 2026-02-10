import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experiments } from '@/data/experiments';
import { chemicals } from '@/data/chemicals';
import { useAppStore } from '@/stores/useAppStore';
import { ArrowLeft, CheckCircle2, ChevronRight, FlaskConical, Clock, Zap, AlertTriangle, BookOpen, HelpCircle } from 'lucide-react';

export default function ExperimentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addXP, completeExperiment, setCurrentExperiment, updateSkill } = useAppStore();

  const experiment = experiments.find(e => e.id === id);
  const [tab, setTab] = useState<'theory' | 'procedure' | 'quiz'>('theory');
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showReport, setShowReport] = useState(false);

  if (!experiment) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Experiment not found</p>
        <button onClick={() => navigate('/experiments')} className="mt-4 text-primary text-sm">Go back</button>
      </div>
    );
  }

  const handleStepComplete = (idx: number) => {
    const updated = [...stepsCompleted];
    updated[idx] = true;
    setStepsCompleted(updated);
    if (idx < experiment.steps.length - 1) {
      setCurrentStep(idx + 1);
    }
  };

  const allStepsDone = stepsCompleted.filter(Boolean).length === experiment.steps.length;

  const handleQuizAnswer = (qIdx: number, aIdx: number) => {
    if (quizSubmitted) return;
    const updated = [...quizAnswers];
    updated[qIdx] = aIdx;
    setQuizAnswers(updated);
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    const correct = experiment.quiz.filter((q, i) => quizAnswers[i] === q.correctIndex).length;
    const score = Math.round((correct / experiment.quiz.length) * 100);

    addXP(experiment.xpReward);
    completeExperiment({
      experimentId: experiment.id,
      completedAt: new Date().toISOString(),
      score,
      xpEarned: experiment.xpReward,
    });
    updateSkill('reactionUnderstanding', 5);
    updateSkill('labTechniques', 3);
    updateSkill('stoichiometry', 4);
    setCurrentExperiment(null);
  };

  const quizScore = quizSubmitted
    ? Math.round((experiment.quiz.filter((q, i) => quizAnswers[i] === q.correctIndex).length / experiment.quiz.length) * 100)
    : null;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/experiments')} className="w-8 h-8 rounded-lg glass-card flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-sm font-bold text-foreground">{experiment.title}</h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className={`capitalize px-1.5 py-0.5 rounded text-[10px] font-medium ${
              experiment.difficulty === 'beginner' ? 'bg-success/10 text-success' :
              experiment.difficulty === 'intermediate' ? 'bg-info/10 text-info' : 'bg-destructive/10 text-destructive'
            }`}>{experiment.difficulty}</span>
            <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{experiment.estimatedTime}m</span>
            <span className="flex items-center gap-0.5"><Zap className="w-3 h-3 text-xp" />{experiment.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 glass-card p-1 rounded-lg">
        {(['theory', 'procedure', 'quiz'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-md text-xs font-medium transition-all capitalize ${
              tab === t ? 'bg-primary/20 text-primary' : 'text-muted-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Theory Tab */}
      {tab === 'theory' && (
        <div className="space-y-4">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-display font-semibold text-foreground">Objective</h3>
            </div>
            <p className="text-xs text-secondary-foreground leading-relaxed">{experiment.objective}</p>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <h3 className="text-sm font-display font-semibold text-foreground mb-2">Theory</h3>
            <p className="text-xs text-secondary-foreground leading-relaxed">{experiment.theory}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card p-3 rounded-xl">
              <h4 className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Chemicals</h4>
              <div className="space-y-1">
                {experiment.chemicals.map(cId => {
                  const chem = chemicals.find(c => c.id === cId);
                  return chem ? (
                    <div key={cId} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chem.color, border: '1px solid hsl(var(--border))' }} />
                      <span className="text-xs text-foreground">{chem.formula}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            <div className="glass-card p-3 rounded-xl">
              <h4 className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Tools</h4>
              <div className="space-y-1">
                {experiment.tools.map(t => (
                  <div key={t} className="flex items-center gap-1.5">
                    <FlaskConical className="w-3 h-3 text-primary" />
                    <span className="text-xs text-foreground capitalize">{t.replace('-', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="glass-card p-3 rounded-xl border-warning/30 bg-warning/5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <p className="text-xs text-warning font-medium">Safety: Always wear goggles and gloves in a real lab.</p>
            </div>
          </div>

          <button
            onClick={() => { setTab('procedure'); setCurrentExperiment(experiment.id); }}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm font-semibold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all"
          >
            Start Experiment
          </button>
        </div>
      )}

      {/* Procedure Tab */}
      {tab === 'procedure' && (
        <div className="space-y-3">
          {experiment.steps.map((step, idx) => {
            const done = stepsCompleted[idx];
            const isCurrent = idx === currentStep;
            return (
              <div
                key={idx}
                className={`glass-card p-3 rounded-xl transition-all ${
                  isCurrent ? 'border-primary/40 neon-glow' : done ? 'border-success/30' : 'opacity-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    done ? 'bg-success/20 text-success' : isCurrent ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">{step.instruction}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Expected: {step.expectedResult}</p>
                    {isCurrent && !done && (
                      <button
                        onClick={() => handleStepComplete(idx)}
                        className="mt-2 px-3 py-1.5 rounded-md bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-all"
                      >
                        Complete Step <ChevronRight className="w-3 h-3 inline" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {allStepsDone && (
            <button
              onClick={() => setTab('quiz')}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm font-semibold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all"
            >
              Take Quiz →
            </button>
          )}
        </div>
      )}

      {/* Quiz Tab */}
      {tab === 'quiz' && (
        <div className="space-y-4">
          {experiment.quiz.map((q, qIdx) => (
            <div key={qIdx} className="glass-card p-4 rounded-xl space-y-2">
              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-info shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-foreground">{q.question}</p>
              </div>
              <div className="space-y-1.5 pl-6">
                {q.options.map((opt, aIdx) => {
                  const selected = quizAnswers[qIdx] === aIdx;
                  const isCorrect = q.correctIndex === aIdx;
                  return (
                    <button
                      key={aIdx}
                      onClick={() => handleQuizAnswer(qIdx, aIdx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all border ${
                        quizSubmitted
                          ? isCorrect
                            ? 'bg-success/20 border-success/50 text-success'
                            : selected
                              ? 'bg-destructive/20 border-destructive/50 text-destructive'
                              : 'glass-card text-muted-foreground'
                          : selected
                            ? 'bg-primary/20 border-primary/50 text-primary'
                            : 'glass-card border-transparent text-secondary-foreground hover:border-primary/20'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
                {quizSubmitted && quizAnswers[qIdx] !== q.correctIndex && (
                  <p className="text-[10px] text-muted-foreground italic mt-1">{q.explanation}</p>
                )}
              </div>
            </div>
          ))}

          {!quizSubmitted ? (
            <button
              onClick={submitQuiz}
              disabled={quizAnswers.filter(a => a !== null && a !== undefined).length < experiment.quiz.length}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm font-semibold disabled:opacity-30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all"
            >
              Submit Quiz
            </button>
          ) : (
            <div className="glass-card p-4 rounded-xl text-center space-y-2 border-primary/30">
              <p className="text-2xl font-display font-bold neon-text">{quizScore}%</p>
              <p className="text-xs text-muted-foreground">
                You earned <span className="text-xp font-semibold">+{experiment.xpReward} XP</span>
              </p>
              <button
                onClick={() => navigate('/experiments')}
                className="mt-2 px-4 py-2 rounded-lg bg-primary/20 text-primary text-xs font-medium"
              >
                Back to Experiments
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
