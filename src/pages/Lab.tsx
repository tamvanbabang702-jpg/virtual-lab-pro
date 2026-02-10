import { useState } from 'react';
import { chemicals, findReaction, getIndicatorColor, type Chemical } from '@/data/chemicals';
import { simulateReaction, type SimulationResult } from '@/services/chemEngine';
import { FlaskConical, Thermometer, Droplets, Wind, AlertTriangle, Beaker, TestTubes, Flame } from 'lucide-react';

const tools = [
  { id: 'beaker', name: 'Beaker', icon: Beaker },
  { id: 'test-tube', name: 'Test Tube', icon: TestTubes },
  { id: 'burner', name: 'Burner', icon: Flame },
  { id: 'thermometer', name: 'Thermometer', icon: Thermometer },
];

export default function LabPage() {
  const [selectedChemicals, setSelectedChemicals] = useState<[Chemical | null, Chemical | null]>([null, null]);
  const [volumes, setVolumes] = useState<[number, number]>([10, 10]);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [reacting, setReacting] = useState(false);
  const [activeTool, setActiveTool] = useState<string>('beaker');

  const selectChemical = (chem: Chemical) => {
    if (!selectedChemicals[0]) {
      setSelectedChemicals([chem, null]);
    } else if (!selectedChemicals[1] && chem.id !== selectedChemicals[0]?.id) {
      setSelectedChemicals([selectedChemicals[0], chem]);
    }
  };

  const runReaction = () => {
    if (!selectedChemicals[0] || !selectedChemicals[1]) return;
    setReacting(true);
    setResult(null);

    setTimeout(() => {
      const res = simulateReaction(
        selectedChemicals[0]!.id, volumes[0],
        selectedChemicals[1]!.id, volumes[1],
      );
      setResult(res);
      setReacting(false);
    }, 1500);
  };

  const reset = () => {
    setSelectedChemicals([null, null]);
    setResult(null);
    setReacting(false);
  };

  const chemGroups = {
    acids: chemicals.filter(c => c.type === 'acid'),
    bases: chemicals.filter(c => c.type === 'base'),
    salts: chemicals.filter(c => c.type === 'salt'),
    metals: chemicals.filter(c => c.type === 'metal'),
    indicators: chemicals.filter(c => c.type === 'indicator'),
    other: chemicals.filter(c => c.type === 'water' || c.type === 'other'),
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="font-display text-lg font-bold neon-text">Virtual Lab</h1>

      {/* Tools Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tools.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTool === t.id
                  ? 'bg-primary/20 text-primary neon-border border'
                  : 'glass-card text-muted-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t.name}
            </button>
          );
        })}
      </div>

      {/* Reaction Zone */}
      <div className="glass-card p-4 rounded-xl space-y-4">
        <h2 className="text-sm font-display font-semibold text-foreground">Reaction Zone</h2>

        <div className="flex items-end gap-3 justify-center min-h-[140px]">
          {/* Chemical 1 */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-16 h-24 rounded-b-xl rounded-t-sm border-2 transition-all duration-300 flex items-end justify-center overflow-hidden ${
                selectedChemicals[0] ? 'border-primary/50' : 'border-border'
              }`}
            >
              {selectedChemicals[0] && (
                <div
                  className="w-full transition-all duration-500 rounded-b-lg"
                  style={{
                    height: `${(volumes[0] / 20) * 100}%`,
                    backgroundColor: selectedChemicals[0].color,
                    opacity: 0.8,
                  }}
                />
              )}
            </div>
            <p className="text-[10px] text-muted-foreground text-center w-16 truncate">
              {selectedChemicals[0]?.formula || 'Select'}
            </p>
            {selectedChemicals[0] && (
              <input
                type="range"
                min={1}
                max={20}
                value={volumes[0]}
                onChange={(e) => setVolumes([Number(e.target.value), volumes[1]])}
                className="w-16 accent-primary"
              />
            )}
            <span className="text-[10px] text-muted-foreground">{volumes[0]} ml</span>
          </div>

          {/* Plus / Reaction */}
          <div className="flex flex-col items-center gap-2 pb-8">
            {reacting ? (
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <FlaskConical className="w-5 h-5 text-primary animate-spin" />
              </div>
            ) : (
              <span className="text-2xl font-bold text-primary">+</span>
            )}
          </div>

          {/* Chemical 2 */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-16 h-24 rounded-b-xl rounded-t-sm border-2 transition-all duration-300 flex items-end justify-center overflow-hidden ${
                selectedChemicals[1] ? 'border-primary/50' : 'border-border'
              }`}
            >
              {selectedChemicals[1] && (
                <div
                  className="w-full transition-all duration-500 rounded-b-lg"
                  style={{
                    height: `${(volumes[1] / 20) * 100}%`,
                    backgroundColor: selectedChemicals[1].color,
                    opacity: 0.8,
                  }}
                />
              )}
            </div>
            <p className="text-[10px] text-muted-foreground text-center w-16 truncate">
              {selectedChemicals[1]?.formula || 'Select'}
            </p>
            {selectedChemicals[1] && (
              <input
                type="range"
                min={1}
                max={20}
                value={volumes[1]}
                onChange={(e) => setVolumes([volumes[0], Number(e.target.value)])}
                className="w-16 accent-primary"
              />
            )}
            <span className="text-[10px] text-muted-foreground">{volumes[1]} ml</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={runReaction}
            disabled={!selectedChemicals[0] || !selectedChemicals[1] || reacting}
            className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-display text-sm font-semibold disabled:opacity-30 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
          >
            {reacting ? 'Reacting...' : 'Mix & React'}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 rounded-lg glass-card text-muted-foreground text-sm font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="glass-card p-4 rounded-xl space-y-3 border-primary/30">
          <h3 className="text-sm font-display font-semibold neon-text">Reaction Result</h3>

          {result.reaction && (
            <div className="glass-card p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Equation</p>
              <p className="text-sm font-medium text-foreground">{result.reaction.balancedEquation}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="glass-card p-3 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <Droplets className="w-3 h-3 text-info" />
                <p className="text-[10px] text-muted-foreground">pH</p>
              </div>
              <p className="text-lg font-bold text-foreground">{result.finalPH.toFixed(1)}</p>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <Thermometer className="w-3 h-3 text-destructive" />
                <p className="text-[10px] text-muted-foreground">Temp Δ</p>
              </div>
              <p className="text-lg font-bold text-foreground">
                {result.temperatureChange > 0 ? '+' : ''}{result.temperatureChange.toFixed(1)}°C
              </p>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <FlaskConical className="w-3 h-3 text-primary" />
                <p className="text-[10px] text-muted-foreground">Completeness</p>
              </div>
              <p className="text-lg font-bold text-foreground">{result.reactionCompleteness.toFixed(0)}%</p>
            </div>
            <div className="glass-card p-3 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <Wind className="w-3 h-3 text-success" />
                <p className="text-[10px] text-muted-foreground">Type</p>
              </div>
              <p className="text-sm font-bold text-foreground capitalize">
                {result.effects.exothermic ? 'Exothermic' : 'Endothermic'}
              </p>
            </div>
          </div>

          {/* Effects */}
          <div className="space-y-1">
            {result.effects.gasProduced && (
              <div className="flex items-center gap-2 text-xs text-info">
                <Wind className="w-3 h-3" /> {result.effects.gasProduced}
              </div>
            )}
            {result.effects.precipitate && (
              <div className="flex items-center gap-2 text-xs text-xp">
                <Droplets className="w-3 h-3" /> {result.effects.precipitate}
              </div>
            )}
            {result.limitingReagent && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="w-3 h-3 text-warning" /> Limiting reagent: {result.limitingReagent}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chemical Selector */}
      <div className="space-y-3">
        <h2 className="text-sm font-display font-semibold text-foreground">Select Chemicals</h2>

        {Object.entries(chemGroups).map(([group, chems]) => (
          <div key={group}>
            <p className="text-xs text-muted-foreground mb-1.5 capitalize">{group}</p>
            <div className="flex flex-wrap gap-1.5">
              {chems.map(chem => {
                const isSelected = selectedChemicals[0]?.id === chem.id || selectedChemicals[1]?.id === chem.id;
                return (
                  <button
                    key={chem.id}
                    onClick={() => selectChemical(chem)}
                    disabled={isSelected}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-primary/20 text-primary neon-border border'
                        : 'glass-card text-secondary-foreground hover:border-primary/30 border border-transparent'
                    } disabled:opacity-50`}
                  >
                    {chem.formula}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
