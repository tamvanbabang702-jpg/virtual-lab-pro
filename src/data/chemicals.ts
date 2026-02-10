export interface Chemical {
  id: string;
  name: string;
  formula: string;
  molarity: number;
  type: 'acid' | 'base' | 'salt' | 'metal' | 'indicator' | 'water' | 'other';
  color: string;
  pH?: number;
}

export interface ReactionRule {
  reactants: string[]; // chemical IDs
  products: string[];
  equation: string;
  balancedEquation: string;
  type: 'neutralization' | 'redox' | 'precipitation' | 'decomposition' | 'combustion' | 'displacement';
  effects: {
    colorChange?: string;
    gasProduced?: string;
    precipitate?: string;
    temperatureChange: number; // °C delta
    exothermic: boolean;
  };
  pHResult?: number;
}

export const chemicals: Chemical[] = [
  { id: 'hcl', name: 'Hydrochloric Acid', formula: 'HCl', molarity: 1, type: 'acid', color: '#e0e0e0', pH: 0 },
  { id: 'h2so4', name: 'Sulfuric Acid', formula: 'H₂SO₄', molarity: 1, type: 'acid', color: '#d4d4d4', pH: 0.3 },
  { id: 'hno3', name: 'Nitric Acid', formula: 'HNO₃', molarity: 1, type: 'acid', color: '#ffffcc', pH: 0 },
  { id: 'ch3cooh', name: 'Acetic Acid', formula: 'CH₃COOH', molarity: 1, type: 'acid', color: '#f0f0f0', pH: 2.4 },
  { id: 'naoh', name: 'Sodium Hydroxide', formula: 'NaOH', molarity: 1, type: 'base', color: '#f5f5f5', pH: 14 },
  { id: 'koh', name: 'Potassium Hydroxide', formula: 'KOH', molarity: 1, type: 'base', color: '#f0f0f0', pH: 14 },
  { id: 'ca_oh_2', name: 'Calcium Hydroxide', formula: 'Ca(OH)₂', molarity: 0.5, type: 'base', color: '#fafafa', pH: 12.4 },
  { id: 'nh3', name: 'Ammonia Solution', formula: 'NH₃(aq)', molarity: 1, type: 'base', color: '#f0f5ff', pH: 11.6 },
  { id: 'nacl', name: 'Sodium Chloride', formula: 'NaCl', molarity: 1, type: 'salt', color: '#ffffff', pH: 7 },
  { id: 'agno3', name: 'Silver Nitrate', formula: 'AgNO₃', molarity: 0.1, type: 'salt', color: '#f0f0f0', pH: 5.5 },
  { id: 'cuso4', name: 'Copper Sulfate', formula: 'CuSO₄', molarity: 0.5, type: 'salt', color: '#4fc3f7', pH: 4 },
  { id: 'baco2', name: 'Barium Chloride', formula: 'BaCl₂', molarity: 0.5, type: 'salt', color: '#f0f0f0', pH: 7 },
  { id: 'na2so4', name: 'Sodium Sulfate', formula: 'Na₂SO₄', molarity: 0.5, type: 'salt', color: '#f5f5f5', pH: 7 },
  { id: 'pb_no3_2', name: 'Lead Nitrate', formula: 'Pb(NO₃)₂', molarity: 0.5, type: 'salt', color: '#f0f0f0', pH: 4 },
  { id: 'ki', name: 'Potassium Iodide', formula: 'KI', molarity: 0.5, type: 'salt', color: '#f5f5f0', pH: 7 },
  { id: 'zn', name: 'Zinc Metal', formula: 'Zn', molarity: 0, type: 'metal', color: '#b0bec5', pH: 7 },
  { id: 'fe', name: 'Iron Metal', formula: 'Fe', molarity: 0, type: 'metal', color: '#78909c', pH: 7 },
  { id: 'cu', name: 'Copper Metal', formula: 'Cu', molarity: 0, type: 'metal', color: '#ef6c00', pH: 7 },
  { id: 'mg', name: 'Magnesium Metal', formula: 'Mg', molarity: 0, type: 'metal', color: '#cfd8dc', pH: 7 },
  { id: 'phenolphthalein', name: 'Phenolphthalein', formula: 'C₂₀H₁₄O₄', molarity: 0.01, type: 'indicator', color: '#f5f5f5', pH: 7 },
  { id: 'methyl_orange', name: 'Methyl Orange', formula: 'C₁₄H₁₄N₃NaO₃S', molarity: 0.01, type: 'indicator', color: '#ff9800', pH: 7 },
  { id: 'litmus', name: 'Litmus Solution', formula: 'Litmus', molarity: 0.01, type: 'indicator', color: '#9c27b0', pH: 7 },
  { id: 'water', name: 'Distilled Water', formula: 'H₂O', molarity: 55.5, type: 'water', color: '#e3f2fd', pH: 7 },
];

export const reactions: ReactionRule[] = [
  {
    reactants: ['hcl', 'naoh'],
    products: ['nacl', 'water'],
    equation: 'HCl + NaOH → NaCl + H₂O',
    balancedEquation: 'HCl + NaOH → NaCl + H₂O',
    type: 'neutralization',
    effects: { temperatureChange: 12, exothermic: true },
    pHResult: 7,
  },
  {
    reactants: ['h2so4', 'naoh'],
    products: ['na2so4', 'water'],
    equation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
    balancedEquation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
    type: 'neutralization',
    effects: { temperatureChange: 18, exothermic: true },
    pHResult: 7,
  },
  {
    reactants: ['agno3', 'nacl'],
    products: [],
    equation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    balancedEquation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    type: 'precipitation',
    effects: { precipitate: 'White curdy precipitate (AgCl)', temperatureChange: 1, exothermic: false },
  },
  {
    reactants: ['pb_no3_2', 'ki'],
    products: [],
    equation: 'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃',
    balancedEquation: 'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃',
    type: 'precipitation',
    effects: { precipitate: 'Bright yellow precipitate (PbI₂)', colorChange: '#ffd600', temperatureChange: 0, exothermic: false },
  },
  {
    reactants: ['zn', 'hcl'],
    products: [],
    equation: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    balancedEquation: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    type: 'displacement',
    effects: { gasProduced: 'Hydrogen gas (H₂) bubbles', temperatureChange: 8, exothermic: true },
  },
  {
    reactants: ['zn', 'cuso4'],
    products: [],
    equation: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    balancedEquation: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    type: 'displacement',
    effects: { colorChange: '#e0e0e0', temperatureChange: 5, exothermic: true },
  },
  {
    reactants: ['mg', 'hcl'],
    products: [],
    equation: 'Mg + 2HCl → MgCl₂ + H₂↑',
    balancedEquation: 'Mg + 2HCl → MgCl₂ + H₂↑',
    type: 'displacement',
    effects: { gasProduced: 'Vigorous hydrogen gas bubbles', temperatureChange: 15, exothermic: true },
  },
  {
    reactants: ['fe', 'cuso4'],
    products: [],
    equation: 'Fe + CuSO₄ → FeSO₄ + Cu',
    balancedEquation: 'Fe + CuSO₄ → FeSO₄ + Cu',
    type: 'displacement',
    effects: { colorChange: '#a5d6a7', temperatureChange: 3, exothermic: true },
  },
  {
    reactants: ['baco2', 'na2so4'],
    products: [],
    equation: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl',
    balancedEquation: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl',
    type: 'precipitation',
    effects: { precipitate: 'White precipitate (BaSO₄)', temperatureChange: 0, exothermic: false },
  },
];

export function findReaction(chem1Id: string, chem2Id: string): ReactionRule | null {
  return reactions.find(r =>
    (r.reactants.includes(chem1Id) && r.reactants.includes(chem2Id)) ||
    (r.reactants[0] === chem2Id && r.reactants[1] === chem1Id)
  ) || null;
}

export function getIndicatorColor(indicatorId: string, pH: number): string {
  switch (indicatorId) {
    case 'phenolphthalein':
      return pH >= 8.2 ? '#e91e63' : '#f5f5f5';
    case 'methyl_orange':
      if (pH < 3.1) return '#ff1744';
      if (pH > 4.4) return '#ffeb3b';
      return '#ff9800';
    case 'litmus':
      if (pH < 4.5) return '#f44336';
      if (pH > 8.3) return '#2196f3';
      return '#9c27b0';
    default:
      return '#ffffff';
  }
}
