import { useState } from 'react';
import { type Chemical } from '@/data/chemicals';
import { Beaker } from 'lucide-react';

interface Props {
  chemical: Chemical | null;
  volume: number;
  onVolume: (v: number) => void;
  onDrop: (chem: Chemical) => void;
  label: string;
}

export default function BeakerDropZone({ chemical, volume, onVolume, onDrop, label }: Props) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    try {
      const chem: Chemical = JSON.parse(e.dataTransfer.getData('application/json'));
      onDrop(chem);
    } catch {}
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-20 h-28 rounded-b-xl rounded-t-sm border-2 transition-all duration-300 flex items-end justify-center overflow-hidden relative ${
          dragOver
            ? 'border-primary scale-105 shadow-[0_0_20px_hsl(var(--primary)/0.4)]'
            : chemical
            ? 'border-primary/50'
            : 'border-border border-dashed'
        }`}
      >
        {!chemical && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground">
            <Beaker className={`w-5 h-5 transition-transform ${dragOver ? 'scale-110 text-primary' : ''}`} />
            <span className="text-[8px]">Drop here</span>
          </div>
        )}
        {chemical && (
          <div
            className="w-full transition-all duration-500 rounded-b-lg"
            style={{
              height: `${(volume / 20) * 100}%`,
              backgroundColor: chemical.color,
              opacity: 0.8,
            }}
          />
        )}
      </div>
      <p className="text-[10px] text-muted-foreground text-center w-20 truncate">
        {chemical?.formula || label}
      </p>
      {chemical && (
        <input
          type="range"
          min={1}
          max={20}
          value={volume}
          onChange={(e) => onVolume(Number(e.target.value))}
          className="w-16 accent-primary"
        />
      )}
      <span className="text-[10px] text-muted-foreground">{volume} ml</span>
    </div>
  );
}
