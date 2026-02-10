export interface ExperimentStep {
  instruction: string;
  action: 'pour' | 'heat' | 'stir' | 'measure' | 'cool' | 'observe' | 'add';
  chemicalId?: string;
  toolId?: string;
  expectedResult: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Experiment {
  id: string;
  title: string;
  objective: string;
  theory: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  tools: string[];
  chemicals: string[];
  steps: ExperimentStep[];
  quiz: QuizQuestion[];
  category: string;
  estimatedTime: number; // minutes
}

export const experiments: Experiment[] = [
  {
    id: 'acid-base-neutralization',
    title: 'Acid–Base Neutralization',
    objective: 'Observe the neutralization reaction between HCl and NaOH and measure pH changes.',
    theory: 'Neutralization occurs when an acid reacts with a base to form salt and water. The reaction is exothermic, releasing heat. The pH changes from acidic/basic to neutral (pH 7).',
    difficulty: 'beginner',
    xpReward: 100,
    tools: ['beaker', 'test-tube', 'thermometer', 'stirrer'],
    chemicals: ['hcl', 'naoh', 'phenolphthalein'],
    steps: [
      { instruction: 'Add 10 ml of NaOH solution to the beaker', action: 'pour', chemicalId: 'naoh', toolId: 'beaker', expectedResult: 'Clear solution in beaker' },
      { instruction: 'Add 2 drops of phenolphthalein indicator', action: 'add', chemicalId: 'phenolphthalein', expectedResult: 'Solution turns pink' },
      { instruction: 'Slowly add HCl to the beaker while stirring', action: 'pour', chemicalId: 'hcl', toolId: 'beaker', expectedResult: 'Pink color starts fading' },
      { instruction: 'Stir the solution gently', action: 'stir', toolId: 'stirrer', expectedResult: 'Uniform mixing' },
      { instruction: 'Measure the temperature', action: 'measure', toolId: 'thermometer', expectedResult: 'Temperature increased (~12°C rise)' },
      { instruction: 'Observe the final color', action: 'observe', expectedResult: 'Solution becomes colorless at pH 7' },
    ],
    quiz: [
      { question: 'What is produced in a neutralization reaction?', options: ['Salt and water', 'Only salt', 'Only water', 'Gas'], correctIndex: 0, explanation: 'Acid + Base → Salt + Water' },
      { question: 'What is the pH of the neutral solution?', options: ['0', '7', '14', '3'], correctIndex: 1, explanation: 'pH 7 is neutral' },
      { question: 'Is neutralization exothermic or endothermic?', options: ['Exothermic', 'Endothermic', 'Neither', 'Both'], correctIndex: 0, explanation: 'Neutralization releases heat' },
      { question: 'What color is phenolphthalein in basic solution?', options: ['Pink', 'Blue', 'Yellow', 'Colorless'], correctIndex: 0, explanation: 'Phenolphthalein turns pink in pH > 8.2' },
      { question: 'What is the salt formed from HCl + NaOH?', options: ['NaCl', 'KCl', 'CaCl₂', 'NaOH'], correctIndex: 0, explanation: 'NaCl (table salt) is produced' },
    ],
    category: 'Acid-Base Chemistry',
    estimatedTime: 15,
  },
  {
    id: 'ph-indicator-test',
    title: 'pH Indicator Test',
    objective: 'Test various solutions with different pH indicators and observe color changes.',
    theory: 'pH indicators are substances that change color depending on the pH of the solution. Different indicators work in different pH ranges, allowing us to estimate the acidity or basicity.',
    difficulty: 'beginner',
    xpReward: 80,
    tools: ['test-tube', 'pipette'],
    chemicals: ['hcl', 'naoh', 'water', 'phenolphthalein', 'methyl_orange', 'litmus'],
    steps: [
      { instruction: 'Add HCl to test tube 1', action: 'pour', chemicalId: 'hcl', toolId: 'test-tube', expectedResult: 'Clear acidic solution' },
      { instruction: 'Add water to test tube 2', action: 'pour', chemicalId: 'water', toolId: 'test-tube', expectedResult: 'Clear neutral solution' },
      { instruction: 'Add NaOH to test tube 3', action: 'pour', chemicalId: 'naoh', toolId: 'test-tube', expectedResult: 'Clear basic solution' },
      { instruction: 'Add phenolphthalein to each tube', action: 'add', chemicalId: 'phenolphthalein', expectedResult: 'Only basic solution turns pink' },
      { instruction: 'Observe all color changes', action: 'observe', expectedResult: 'Different colors in each tube' },
    ],
    quiz: [
      { question: 'What color is litmus in acid?', options: ['Red', 'Blue', 'Green', 'Purple'], correctIndex: 0, explanation: 'Litmus turns red in acidic solutions' },
      { question: 'Which indicator turns pink in base?', options: ['Phenolphthalein', 'Methyl orange', 'Litmus', 'Universal'], correctIndex: 0, explanation: 'Phenolphthalein is pink in basic solutions' },
      { question: 'What is the pH range of methyl orange?', options: ['3.1–4.4', '0–1', '8–10', '7'], correctIndex: 0, explanation: 'Methyl orange transitions between pH 3.1 and 4.4' },
    ],
    category: 'Acid-Base Chemistry',
    estimatedTime: 10,
  },
  {
    id: 'redox-reaction',
    title: 'Redox Reaction',
    objective: 'Observe a displacement reaction between zinc and copper sulfate solution.',
    theory: 'In a redox reaction, one substance is oxidized (loses electrons) and another is reduced (gains electrons). More reactive metals displace less reactive metals from their salt solutions.',
    difficulty: 'intermediate',
    xpReward: 150,
    tools: ['beaker', 'thermometer', 'stirrer'],
    chemicals: ['zn', 'cuso4'],
    steps: [
      { instruction: 'Add 20 ml CuSO₄ solution to the beaker', action: 'pour', chemicalId: 'cuso4', toolId: 'beaker', expectedResult: 'Blue solution in beaker' },
      { instruction: 'Add zinc metal strip to the solution', action: 'add', chemicalId: 'zn', expectedResult: 'Zinc placed in blue solution' },
      { instruction: 'Stir gently and observe', action: 'stir', toolId: 'stirrer', expectedResult: 'Blue color fades, reddish copper deposits' },
      { instruction: 'Measure temperature change', action: 'measure', toolId: 'thermometer', expectedResult: 'Temperature rises slightly' },
      { instruction: 'Observe the final state', action: 'observe', expectedResult: 'Solution turns colorless, copper deposited on zinc' },
    ],
    quiz: [
      { question: 'Which metal is oxidized?', options: ['Zinc', 'Copper', 'Both', 'Neither'], correctIndex: 0, explanation: 'Zinc loses electrons and is oxidized' },
      { question: 'What color change is observed?', options: ['Blue to colorless', 'Colorless to blue', 'Red to green', 'No change'], correctIndex: 0, explanation: 'Blue CuSO₄ becomes colorless ZnSO₄' },
      { question: 'What is deposited on the zinc?', options: ['Copper', 'Silver', 'Gold', 'Iron'], correctIndex: 0, explanation: 'Copper metal is deposited' },
    ],
    category: 'Redox Chemistry',
    estimatedTime: 20,
  },
  {
    id: 'electrolysis-water',
    title: 'Electrolysis of Water',
    objective: 'Decompose water into hydrogen and oxygen using electrical energy.',
    theory: 'Electrolysis uses direct current to drive a non-spontaneous chemical reaction. Water decomposes into hydrogen gas at the cathode and oxygen gas at the anode in a 2:1 ratio.',
    difficulty: 'intermediate',
    xpReward: 150,
    tools: ['beaker', 'test-tube'],
    chemicals: ['water', 'h2so4'],
    steps: [
      { instruction: 'Fill beaker with water and add dilute H₂SO₄', action: 'pour', chemicalId: 'water', toolId: 'beaker', expectedResult: 'Acidified water in beaker' },
      { instruction: 'Place two test tubes inverted over electrodes', action: 'add', toolId: 'test-tube', expectedResult: 'Test tubes submerged and inverted' },
      { instruction: 'Observe gas collection at cathode', action: 'observe', expectedResult: 'Hydrogen gas collects (2x volume)' },
      { instruction: 'Observe gas collection at anode', action: 'observe', expectedResult: 'Oxygen gas collects (1x volume)' },
      { instruction: 'Note the volume ratio', action: 'measure', expectedResult: 'H₂ : O₂ = 2 : 1' },
    ],
    quiz: [
      { question: 'What gas is produced at the cathode?', options: ['Hydrogen', 'Oxygen', 'Chlorine', 'Nitrogen'], correctIndex: 0, explanation: 'H₂ is produced at the cathode (reduction)' },
      { question: 'What is the H₂:O₂ volume ratio?', options: ['2:1', '1:2', '1:1', '3:1'], correctIndex: 0, explanation: '2H₂O → 2H₂ + O₂' },
    ],
    category: 'Electrochemistry',
    estimatedTime: 25,
  },
  {
    id: 'reaction-rate-temp',
    title: 'Reaction Rate vs Temperature',
    objective: 'Study how temperature affects the rate of reaction between acid and metal.',
    theory: 'Increasing temperature provides reactant particles with more kinetic energy, resulting in more frequent and energetic collisions, thus increasing reaction rate.',
    difficulty: 'intermediate',
    xpReward: 130,
    tools: ['beaker', 'thermometer', 'burner'],
    chemicals: ['hcl', 'mg'],
    steps: [
      { instruction: 'Add HCl to beaker at room temperature (25°C)', action: 'pour', chemicalId: 'hcl', toolId: 'beaker', expectedResult: 'HCl at 25°C' },
      { instruction: 'Add magnesium ribbon and time the reaction', action: 'add', chemicalId: 'mg', expectedResult: 'Moderate bubbling, note reaction time' },
      { instruction: 'Heat a fresh batch of HCl to 40°C', action: 'heat', toolId: 'burner', expectedResult: 'HCl heated to 40°C' },
      { instruction: 'Add magnesium and observe rate difference', action: 'add', chemicalId: 'mg', expectedResult: 'Faster bubbling, shorter reaction time' },
      { instruction: 'Compare reaction times', action: 'observe', expectedResult: 'Higher temp = faster reaction' },
    ],
    quiz: [
      { question: 'How does temperature affect reaction rate?', options: ['Increases it', 'Decreases it', 'No effect', 'Stops it'], correctIndex: 0, explanation: 'Higher temperature increases kinetic energy and collision frequency' },
      { question: 'What gas is produced?', options: ['Hydrogen', 'Oxygen', 'CO₂', 'Nitrogen'], correctIndex: 0, explanation: 'Mg + 2HCl → MgCl₂ + H₂↑' },
    ],
    category: 'Kinetics',
    estimatedTime: 20,
  },
  {
    id: 'precipitation-reaction',
    title: 'Precipitation Reaction',
    objective: 'Observe the formation of an insoluble precipitate when two solutions are mixed.',
    theory: 'A precipitation reaction occurs when two soluble ionic compounds are mixed and form an insoluble product (precipitate) that settles out of solution.',
    difficulty: 'beginner',
    xpReward: 100,
    tools: ['beaker', 'test-tube', 'stirrer'],
    chemicals: ['pb_no3_2', 'ki'],
    steps: [
      { instruction: 'Add lead nitrate solution to the beaker', action: 'pour', chemicalId: 'pb_no3_2', toolId: 'beaker', expectedResult: 'Clear colorless solution' },
      { instruction: 'Add potassium iodide solution', action: 'pour', chemicalId: 'ki', toolId: 'beaker', expectedResult: 'Bright yellow precipitate forms immediately' },
      { instruction: 'Stir and observe', action: 'stir', toolId: 'stirrer', expectedResult: '"Golden rain" effect - yellow PbI₂ precipitate' },
      { instruction: 'Let the precipitate settle', action: 'observe', expectedResult: 'Yellow solid settles to bottom' },
    ],
    quiz: [
      { question: 'What precipitate is formed?', options: ['Lead iodide (PbI₂)', 'Lead chloride', 'Silver iodide', 'Barium sulfate'], correctIndex: 0, explanation: 'PbI₂ is the bright yellow precipitate' },
      { question: 'What is a precipitate?', options: ['Insoluble solid', 'Gas', 'Liquid', 'Dissolved salt'], correctIndex: 0, explanation: 'A precipitate is an insoluble solid formed in solution' },
    ],
    category: 'Precipitation',
    estimatedTime: 10,
  },
  {
    id: 'acid-base-titration',
    title: 'Acid–Base Titration',
    objective: 'Determine the concentration of an unknown acid using a standardized base.',
    theory: 'Titration is a quantitative analytical technique. A solution of known concentration (titrant) is added to a solution of unknown concentration until the equivalence point is reached, indicated by a color change.',
    difficulty: 'advanced',
    xpReward: 200,
    tools: ['burette', 'beaker', 'pipette', 'stirrer'],
    chemicals: ['hcl', 'naoh', 'phenolphthalein'],
    steps: [
      { instruction: 'Pipette 10 ml of HCl into the beaker', action: 'pour', chemicalId: 'hcl', toolId: 'pipette', expectedResult: '10 ml HCl in beaker' },
      { instruction: 'Add 2 drops of phenolphthalein indicator', action: 'add', chemicalId: 'phenolphthalein', expectedResult: 'Solution remains colorless (acidic)' },
      { instruction: 'Fill the burette with NaOH solution', action: 'pour', chemicalId: 'naoh', toolId: 'burette', expectedResult: 'Burette filled with NaOH' },
      { instruction: 'Slowly add NaOH drop by drop while stirring', action: 'pour', toolId: 'burette', expectedResult: 'Temporary pink at drop site' },
      { instruction: 'Stop when persistent pink color appears', action: 'observe', expectedResult: 'End point reached - permanent pink color' },
      { instruction: 'Record the volume of NaOH used', action: 'measure', toolId: 'burette', expectedResult: 'Volume reading noted for calculation' },
    ],
    quiz: [
      { question: 'What is the equivalence point?', options: ['When moles of acid = moles of base', 'When pH = 0', 'When all acid is added', 'When temperature is max'], correctIndex: 0, explanation: 'Equivalence point = stoichiometric equal moles' },
      { question: 'Why is phenolphthalein used?', options: ['Shows end point by color change', 'Speeds up reaction', 'Cools solution', 'Adds flavor'], correctIndex: 0, explanation: 'Phenolphthalein indicates pH change at end point' },
      { question: 'What is the titrant in this experiment?', options: ['NaOH', 'HCl', 'Phenolphthalein', 'Water'], correctIndex: 0, explanation: 'NaOH is the solution of known concentration in the burette' },
    ],
    category: 'Acid-Base Chemistry',
    estimatedTime: 25,
  },
  {
    id: 'exothermic-reaction',
    title: 'Exothermic Reaction',
    objective: 'Observe heat release during a chemical reaction and measure temperature change.',
    theory: 'Exothermic reactions release energy to surroundings as heat. The temperature of surroundings increases. Examples include combustion, neutralization, and some metal-acid reactions.',
    difficulty: 'beginner',
    xpReward: 90,
    tools: ['beaker', 'thermometer', 'stirrer'],
    chemicals: ['mg', 'hcl'],
    steps: [
      { instruction: 'Measure initial temperature of HCl', action: 'measure', toolId: 'thermometer', chemicalId: 'hcl', expectedResult: 'Initial temp: 25°C' },
      { instruction: 'Add HCl to the beaker', action: 'pour', chemicalId: 'hcl', toolId: 'beaker', expectedResult: 'Clear acid in beaker' },
      { instruction: 'Add magnesium ribbon', action: 'add', chemicalId: 'mg', expectedResult: 'Vigorous reaction with bubbling' },
      { instruction: 'Measure final temperature', action: 'measure', toolId: 'thermometer', expectedResult: 'Temperature rose by ~15°C' },
      { instruction: 'Observe the exothermic nature', action: 'observe', expectedResult: 'Heat released, solution warm to touch' },
    ],
    quiz: [
      { question: 'What is an exothermic reaction?', options: ['Releases heat', 'Absorbs heat', 'No heat change', 'Only light'], correctIndex: 0, explanation: 'Exothermic = heat flows out to surroundings' },
      { question: 'What happens to temperature?', options: ['Increases', 'Decreases', 'Same', 'Fluctuates'], correctIndex: 0, explanation: 'Temperature increases due to heat release' },
    ],
    category: 'Thermochemistry',
    estimatedTime: 12,
  },
  {
    id: 'endothermic-reaction',
    title: 'Endothermic Reaction',
    objective: 'Observe heat absorption during dissolution and measure temperature decrease.',
    theory: 'Endothermic reactions absorb energy from surroundings as heat. The temperature of surroundings decreases. Dissolving certain salts like ammonium nitrate is endothermic.',
    difficulty: 'beginner',
    xpReward: 90,
    tools: ['beaker', 'thermometer', 'stirrer'],
    chemicals: ['water'],
    steps: [
      { instruction: 'Add water to the beaker', action: 'pour', chemicalId: 'water', toolId: 'beaker', expectedResult: 'Water at room temperature' },
      { instruction: 'Measure initial temperature', action: 'measure', toolId: 'thermometer', expectedResult: 'Initial temp: 25°C' },
      { instruction: 'Add citric acid crystals (simulated)', action: 'add', expectedResult: 'Crystals dissolve' },
      { instruction: 'Stir the solution', action: 'stir', toolId: 'stirrer', expectedResult: 'Complete dissolution' },
      { instruction: 'Measure final temperature', action: 'measure', toolId: 'thermometer', expectedResult: 'Temperature dropped by ~5°C' },
    ],
    quiz: [
      { question: 'What is an endothermic reaction?', options: ['Absorbs heat', 'Releases heat', 'No change', 'Explosion'], correctIndex: 0, explanation: 'Endothermic = heat flows in from surroundings' },
      { question: 'What happens to temperature?', options: ['Decreases', 'Increases', 'Same', 'Oscillates'], correctIndex: 0, explanation: 'Temperature decreases as heat is absorbed' },
    ],
    category: 'Thermochemistry',
    estimatedTime: 12,
  },
  {
    id: 'metal-reactivity-series',
    title: 'Metal Reactivity Series',
    objective: 'Determine the relative reactivity of metals by displacement reactions.',
    theory: 'The reactivity series ranks metals by their tendency to lose electrons. A more reactive metal displaces a less reactive metal from its salt solution.',
    difficulty: 'advanced',
    xpReward: 180,
    tools: ['test-tube', 'beaker'],
    chemicals: ['zn', 'fe', 'cu', 'cuso4', 'hcl'],
    steps: [
      { instruction: 'Add CuSO₄ solution to 3 test tubes', action: 'pour', chemicalId: 'cuso4', toolId: 'test-tube', expectedResult: 'Blue solution in each tube' },
      { instruction: 'Add zinc to tube 1', action: 'add', chemicalId: 'zn', expectedResult: 'Reaction occurs - zinc displaces copper' },
      { instruction: 'Add iron to tube 2', action: 'add', chemicalId: 'fe', expectedResult: 'Slow reaction - iron displaces copper' },
      { instruction: 'Add copper to HCl in tube 3', action: 'add', chemicalId: 'cu', expectedResult: 'No reaction - copper is less reactive' },
      { instruction: 'Compare and rank reactivity', action: 'observe', expectedResult: 'Mg > Zn > Fe > Cu' },
    ],
    quiz: [
      { question: 'Which is most reactive?', options: ['Magnesium', 'Zinc', 'Iron', 'Copper'], correctIndex: 0, explanation: 'Mg is highest in the reactivity series among these metals' },
      { question: 'Why does Cu not react with HCl?', options: ['Cu is below hydrogen in reactivity series', 'Cu is a liquid', 'HCl is weak', 'Temperature is low'], correctIndex: 0, explanation: 'Copper is less reactive than hydrogen' },
      { question: 'What determines reactivity?', options: ['Tendency to lose electrons', 'Atomic mass', 'Color', 'Density'], correctIndex: 0, explanation: 'More reactive metals lose electrons more easily' },
    ],
    category: 'Inorganic Chemistry',
    estimatedTime: 25,
  },
];
