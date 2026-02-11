import { type SimulationResult } from '@/services/chemEngine';

interface Props {
  result: SimulationResult | null;
  reacting: boolean;
}

export default function ReactionEffects({ result, reacting }: Props) {
  if (!reacting && !result) return null;

  const showBubbles = reacting || result?.effects.gasProduced;
  const showPrecipitate = result?.effects.precipitate;
  const colorChange = result?.effects.colorChange;
  const isExothermic = result?.effects.exothermic;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {/* Bubbles */}
      {showBubbles && (
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="absolute rounded-full bg-primary/30 animate-bubble"
              style={{
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                left: `${15 + Math.random() * 70}%`,
                bottom: '10%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.2 + Math.random() * 1.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Color flash */}
      {(reacting || colorChange) && (
        <div
          className="absolute inset-0 animate-color-flash"
          style={{
            backgroundColor: colorChange || 'hsl(var(--primary))',
            opacity: 0,
          }}
        />
      )}

      {/* Exothermic heat glow */}
      {isExothermic && !reacting && (
        <div className="absolute inset-0 animate-heat-glow rounded-xl" />
      )}

      {/* Precipitate particles */}
      {showPrecipitate && !reacting && (
        <div className="absolute inset-0">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={`p-${i}`}
              className="absolute rounded-full bg-muted-foreground/50 animate-precipitate"
              style={{
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                left: `${20 + Math.random() * 60}%`,
                top: '20%',
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Steam / gas wisps */}
      {result?.effects.gasProduced && !reacting && (
        <div className="absolute inset-x-0 top-0 h-1/2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`s-${i}`}
              className="absolute w-6 h-6 rounded-full bg-muted/40 blur-sm animate-steam"
              style={{
                left: `${25 + Math.random() * 50}%`,
                bottom: '0%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 1.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
