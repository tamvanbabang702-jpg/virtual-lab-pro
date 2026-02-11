import { type Chemical } from '@/data/chemicals';

interface Props {
  chemical: Chemical;
  isSelected: boolean;
  onClick?: () => void;
}

export default function DraggableChemical({ chemical, isSelected, onClick }: Props) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(chemical));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <button
      draggable={!isSelected}
      onDragStart={handleDragStart}
      onClick={() => !isSelected && onClick?.()}
      disabled={isSelected}
      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-grab active:cursor-grabbing ${
        isSelected
          ? 'bg-primary/20 text-primary neon-border border'
          : 'glass-card text-secondary-foreground hover:border-primary/30 border border-transparent'
      } disabled:opacity-50 disabled:cursor-default`}
    >
      {chemical.formula}
    </button>
  );
}
