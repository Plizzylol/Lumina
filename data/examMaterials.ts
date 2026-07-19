export interface Material {
  id: string;
  name: string;
  content: string;
  type: 'notes' | 'questions' | 'past_paper';
}

export interface Topic {
  id: string;
  name: string;
  materials: Material[];
}

export interface Subject {
  id: string;
  name: string;
  topics: Topic[];
}

export interface ExamBoardData {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface Curriculum {
  id: string;
  name: string;
  examBoards: ExamBoardData[];
}

const specificContent: Record<string, string> = {
  '1. Cell Biology': `# 1. Cell Biology\n\n## Eukaryotes and Prokaryotes\n- **Eukaryotic cells** (plant and animal cells) have a cell membrane, cytoplasm, and genetic material enclosed in a nucleus.\n- **Prokaryotic cells** (bacteria) are much smaller. They have cytoplasm and a cell membrane surrounded by a cell wall. The genetic material is not enclosed in a nucleus; it is a single DNA loop and there may be one or more small rings of DNA called plasmids.\n\n## Animal and Plant Cells\n**Animal Cells** contain:\n- **Nucleus**: Controls cell activities and contains DNA.\n- **Cytoplasm**: Gel-like substance where most chemical reactions happen.\n- **Cell membrane**: Holds the cell together and controls what goes in and out.\n- **Mitochondria**: Where most of the reactions for aerobic respiration take place.\n- **Ribosomes**: Where proteins are made in the cell.\n\n**Plant Cells** usually have all the bits animal cells have, plus:\n- **Cell wall**: Made of cellulose. Supports the cell and strengthens it.\n- **Permanent vacuole**: Contains cell sap, a weak solution of sugar and salts.\n- **Chloroplasts**: Where photosynthesis occurs, which makes food for the plant. They contain a green substance called chlorophyll.\n\n## Cell Specialisation\nCells differentiate to form different types of cells.\n- **Sperm cells**: Specialised for reproduction. Long tail, streamlined head, lots of mitochondria.\n- **Nerve cells**: Specialised for rapid signalling. Long, with branched connections.\n- **Muscle cells**: Specialised for contraction. Long, contain lots of mitochondria.\n- **Root hair cells**: Specialised for absorbing water and minerals. Large surface area.\n- **Phloem and Xylem**: Specialised for transporting substances.`,
  
  '1. Atomic Structure and the Periodic Table': `# 1. Atomic Structure and the Periodic Table\n\n## Atoms, Elements and Compounds\n- All substances are made of **atoms**. An atom is the smallest part of an element that can exist.\n- **Elements** contain only one type of atom.\n- **Compounds** are formed from elements by chemical reactions. They contain two or more elements chemically combined in fixed proportions.\n\n## The Structure of the Atom\nAtoms consist of a central **nucleus** containing **protons** and **neutrons**, surrounded by **electrons** in shells.\n\n| Particle | Relative Mass | Relative Charge |\n|---|---|---|\n| Proton | 1 | +1 |\n| Neutron | 1 | 0 |\n| Electron | Very small | -1 |\n\n- The number of electrons is equal to the number of protons in the nucleus. Atoms have no overall electrical charge.\n- The **atomic number** is the number of protons.\n- The **mass number** is the sum of the protons and neutrons.\n\n## The Periodic Table\n- Elements are arranged in order of atomic (proton) number.\n- Elements with similar properties are in columns, known as **groups**.\n- Elements in the same group have the same number of electrons in their outer shell (highest energy level).\n- **Group 0**: Noble gases. Unreactive because they have a stable arrangement of electrons.\n- **Group 1**: Alkali metals. Reactive, soft metals. Reactivity increases going down the group.\n- **Group 7**: Halogens. Non-metals. Reactivity decreases going down the group.`,
  
  '1. Energy': `# 1. Energy\n\n## Energy Stores and Systems\nA system is an object or group of objects. When a system changes, energy is transferred.\n\n**Energy Stores:**\n- **Kinetic**: Moving objects.\n- **Thermal**: Heat energy.\n- **Chemical**: Food, fuel, batteries.\n- **Gravitational Potential**: Objects raised above the ground.\n- **Elastic Potential**: Stretched, squashed, or twisted objects.\n- **Electrostatic**: Interacting charges.\n- **Magnetic**: Interacting magnets.\n- **Nuclear**: Inside atoms.\n\n## Conservation of Energy\n> **The Law of Conservation of Energy**: Energy can be transferred usefully, stored or dissipated, but cannot be created or destroyed.\n\n## Equations\n- **Kinetic Energy**: $E_k = \\frac{1}{2} m v^2$\n- **Gravitational Potential Energy**: $E_p = m g h$\n- **Elastic Potential Energy**: $E_e = \\frac{1}{2} k e^2$\n\n## Power\nPower is the rate at which energy is transferred or the rate at which work is done.\n- $P = \\frac{E}{t}$ (Power = Energy / time)\n- $P = \\frac{W}{t}$ (Power = Work done / time)\nUnit of power is the Watt (W). 1 Watt = 1 Joule per second.`,
  
  '1. Number': `# 1. Number\n\n## Types of Number\n- **Integers**: Whole numbers (e.g., -3, 0, 5).\n- **Rational Numbers**: Can be written as a fraction $a/b$ (e.g., 1/2, 0.75, -4).\n- **Irrational Numbers**: Cannot be written as a fraction. Decimals go on forever without repeating (e.g., $\\pi$, $\\sqrt{2}$).\n- **Real Numbers**: All rational and irrational numbers.\n\n## Prime Numbers, Factors and Multiples\n- **Prime Number**: A number with exactly two factors: 1 and itself (e.g., 2, 3, 5, 7, 11).\n- **Factor**: A number that divides exactly into another number (e.g., factors of 12 are 1, 2, 3, 4, 6, 12).\n- **Multiple**: A number in another number's times table (e.g., multiples of 5 are 5, 10, 15, 20).\n\n## Fractions, Decimals and Percentages\nTo convert between them:\n- **Fraction to Decimal**: Divide the numerator by the denominator.\n- **Decimal to Percentage**: Multiply by 100.\n- **Percentage to Decimal**: Divide by 100.\n- **Percentage to Fraction**: Write over 100 and simplify.\n\n## Standard Form\nStandard form is a way of writing very large or very small numbers easily.\nFormat: $A \\times 10^n$, where $1 \\le A < 10$ and $n$ is an integer.\n- Example: $3,400,000 = 3.4 \\times 10^6$\n- Example: $0.00056 = 5.6 \\times 10^{-4}$`
};

const generatePlaceholderMaterials = (topicName: string): Material[] => {
  const content = specificContent[topicName] || `# ${topicName} Revision Guide\n\n## Overview\nThis section covers the fundamental principles and key concepts of **${topicName}**. Understanding these core ideas is essential for mastering the subject and performing well in your exams.\n\n## Key Concepts\n* **Core Principle 1**: The foundational theory that underpins this topic. Ensure you understand how this principle applies in different contexts.\n* **Core Principle 2**: The secondary mechanism. This often interacts with Principle 1 to produce complex phenomena.\n* **Core Principle 3**: The mathematical or analytical framework used to quantify or describe the topic.\n\n## Important Terminology\n* **Terminology A**: A specific term used to describe a key process.\n* **Terminology B**: A condition or state relevant to the topic.\n* **Terminology C**: An observable effect or outcome.\n\n## Common Exam Pitfalls\n1. **Misinterpreting the question**: Always read the command words carefully (e.g., *describe* vs. *explain*).\n2. **Forgetting units**: If a calculation is involved, always state the correct units.\n3. **Lack of detail**: In extended response questions, ensure you link your points logically (e.g., using "therefore" or "which leads to").\n\n## Practice Strategy\nTo effectively revise this topic, start by memorizing the key definitions. Then, move on to applying the concepts to past paper questions. Focus on understanding *why* a process happens, rather than just *what* happens.`;

  return [
    {
      id: `${topicName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-notes`,
      name: `${topicName} Revision Notes`,
      type: 'notes',
      content: content
    },
    {
      id: `${topicName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-questions`,
      name: `${topicName} Topic Questions`,
      type: 'questions',
      content: `# ${topicName} - Topic Questions\n\n1. Explain the main principles of ${topicName}. [4 marks]\n2. Define the key terms associated with ${topicName}. [2 marks]\n3. Evaluate the impact of ${topicName} in a real-world scenario. [6 marks]`
    }
  ];
};

export const examMaterialsData: Curriculum[] = [
  {
    id: 'gcse',
    name: 'GCSE (9-1)',
    examBoards: [
      {
        id: 'aqa',
        name: 'AQA',
        subjects: [
          {
            id: 'biology',
            name: 'Biology',
            topics: [
              { id: 'cell-biology', name: '1. Cell Biology', materials: generatePlaceholderMaterials('1. Cell Biology') },
              { id: 'organisation', name: '2. Organisation', materials: generatePlaceholderMaterials('2. Organisation') },
              { id: 'infection-response', name: '3. Infection and Response', materials: generatePlaceholderMaterials('3. Infection and Response') },
              { id: 'bioenergetics', name: '4. Bioenergetics', materials: generatePlaceholderMaterials('4. Bioenergetics') },
              { id: 'homeostasis', name: '5. Homeostasis and Response', materials: generatePlaceholderMaterials('5. Homeostasis and Response') },
              { id: 'inheritance', name: '6. Inheritance, Variation and Evolution', materials: generatePlaceholderMaterials('6. Inheritance, Variation and Evolution') },
              { id: 'ecology', name: '7. Ecology', materials: generatePlaceholderMaterials('7. Ecology') }
            ]
          },
          {
            id: 'chemistry',
            name: 'Chemistry',
            topics: [
              { id: 'atomic-structure', name: '1. Atomic Structure and the Periodic Table', materials: generatePlaceholderMaterials('1. Atomic Structure and the Periodic Table') },
              { id: 'bonding', name: '2. Bonding, Structure, and the Properties of Matter', materials: generatePlaceholderMaterials('2. Bonding, Structure, and the Properties of Matter') },
              { id: 'quantitative', name: '3. Quantitative Chemistry', materials: generatePlaceholderMaterials('3. Quantitative Chemistry') },
              { id: 'chemical-changes', name: '4. Chemical Changes', materials: generatePlaceholderMaterials('4. Chemical Changes') },
              { id: 'energy-changes', name: '5. Energy Changes', materials: generatePlaceholderMaterials('5. Energy Changes') },
              { id: 'rate-extent', name: '6. The Rate and Extent of Chemical Change', materials: generatePlaceholderMaterials('6. The Rate and Extent of Chemical Change') },
              { id: 'organic', name: '7. Organic Chemistry', materials: generatePlaceholderMaterials('7. Organic Chemistry') },
              { id: 'chemical-analysis', name: '8. Chemical Analysis', materials: generatePlaceholderMaterials('8. Chemical Analysis') },
              { id: 'atmosphere', name: '9. Chemistry of the Atmosphere', materials: generatePlaceholderMaterials('9. Chemistry of the Atmosphere') },
              { id: 'using-resources', name: '10. Using Resources', materials: generatePlaceholderMaterials('10. Using Resources') }
            ]
          },
          {
            id: 'physics',
            name: 'Physics',
            topics: [
              { id: 'energy', name: '1. Energy', materials: generatePlaceholderMaterials('1. Energy') },
              { id: 'electricity', name: '2. Electricity', materials: generatePlaceholderMaterials('2. Electricity') },
              { id: 'particle-model', name: '3. Particle Model of Matter', materials: generatePlaceholderMaterials('3. Particle Model of Matter') },
              { id: 'atomic-structure-phys', name: '4. Atomic Structure', materials: generatePlaceholderMaterials('4. Atomic Structure') },
              { id: 'forces', name: '5. Forces', materials: generatePlaceholderMaterials('5. Forces') },
              { id: 'waves', name: '6. Waves', materials: generatePlaceholderMaterials('6. Waves') },
              { id: 'magnetism', name: '7. Magnetism and Electromagnetism', materials: generatePlaceholderMaterials('7. Magnetism and Electromagnetism') },
              { id: 'space', name: '8. Space Physics', materials: generatePlaceholderMaterials('8. Space Physics') }
            ]
          },
          {
            id: 'maths',
            name: 'Mathematics',
            topics: [
              { id: 'number', name: '1. Number', materials: generatePlaceholderMaterials('1. Number') },
              { id: 'algebra', name: '2. Algebra', materials: generatePlaceholderMaterials('2. Algebra') },
              { id: 'ratio', name: '3. Ratio, Proportion and Rates of Change', materials: generatePlaceholderMaterials('3. Ratio, Proportion and Rates of Change') },
              { id: 'geometry', name: '4. Geometry and Measures', materials: generatePlaceholderMaterials('4. Geometry and Measures') },
              { id: 'probability', name: '5. Probability', materials: generatePlaceholderMaterials('5. Probability') },
              { id: 'statistics', name: '6. Statistics', materials: generatePlaceholderMaterials('6. Statistics') }
            ]
          },
          {
            id: 'english-lit',
            name: 'English Literature',
            topics: [
              { id: 'shakespeare', name: '1. Shakespeare', materials: generatePlaceholderMaterials('1. Shakespeare') },
              { id: '19th-century', name: '2. The 19th-century Novel', materials: generatePlaceholderMaterials('2. The 19th-century Novel') },
              { id: 'modern-texts', name: '3. Modern Texts', materials: generatePlaceholderMaterials('3. Modern Texts') },
              { id: 'poetry', name: '4. Poetry', materials: generatePlaceholderMaterials('4. Poetry') }
            ]
          },
          {
            id: 'history',
            name: 'History',
            topics: [
              { id: 'period-study', name: '1. Period Study', materials: generatePlaceholderMaterials('1. Period Study') },
              { id: 'thematic-study', name: '2. Thematic Study', materials: generatePlaceholderMaterials('2. Thematic Study') },
              { id: 'wider-world', name: '3. Wider World Depth Study', materials: generatePlaceholderMaterials('3. Wider World Depth Study') },
              { id: 'british-depth', name: '4. British Depth Study', materials: generatePlaceholderMaterials('4. British Depth Study') }
            ]
          },
          {
            id: 'geography',
            name: 'Geography',
            topics: [
              { id: 'physical', name: '1. Living with the Physical Environment', materials: generatePlaceholderMaterials('1. Living with the Physical Environment') },
              { id: 'human', name: '2. Challenges in the Human Environment', materials: generatePlaceholderMaterials('2. Challenges in the Human Environment') },
              { id: 'applications', name: '3. Geographical Applications', materials: generatePlaceholderMaterials('3. Geographical Applications') }
            ]
          },
          {
            id: 'computer-science',
            name: 'Computer Science',
            topics: [
              { id: 'algorithms', name: '1. Fundamentals of algorithms', materials: generatePlaceholderMaterials('1. Fundamentals of algorithms') },
              { id: 'programming', name: '2. Programming', materials: generatePlaceholderMaterials('2. Programming') },
              { id: 'data-rep', name: '3. Fundamentals of data representation', materials: generatePlaceholderMaterials('3. Fundamentals of data representation') },
              { id: 'computer-systems', name: '4. Computer systems', materials: generatePlaceholderMaterials('4. Computer systems') },
              { id: 'networks', name: '5. Fundamentals of computer networks', materials: generatePlaceholderMaterials('5. Fundamentals of computer networks') },
              { id: 'cyber-security', name: '6. Cyber security', materials: generatePlaceholderMaterials('6. Cyber security') },
              { id: 'sql', name: '7. Relational databases and SQL', materials: generatePlaceholderMaterials('7. Relational databases and SQL') },
              { id: 'impacts', name: '8. Ethical, legal and environmental impacts', materials: generatePlaceholderMaterials('8. Ethical, legal and environmental impacts') }
            ]
          },
          {
            id: 'french',
            name: 'French',
            topics: [
              { id: 'theme-1', name: 'Theme 1: Identity and culture', materials: generatePlaceholderMaterials('Theme 1: Identity and culture') },
              { id: 'theme-2', name: 'Theme 2: Local, national, international and global areas of interest', materials: generatePlaceholderMaterials('Theme 2: Local, national, international and global areas of interest') },
              { id: 'theme-3', name: 'Theme 3: Current and future study and employment', materials: generatePlaceholderMaterials('Theme 3: Current and future study and employment') }
            ]
          }
        ]
      },
      {
        id: 'edexcel',
        name: 'Edexcel',
        subjects: [
          {
            id: 'maths',
            name: 'Mathematics',
            topics: [
              { id: 'number', name: '1. Number', materials: generatePlaceholderMaterials('1. Number') },
              { id: 'algebra', name: '2. Algebra', materials: generatePlaceholderMaterials('2. Algebra') },
              { id: 'ratio', name: '3. Ratio, Proportion and Rates of Change', materials: generatePlaceholderMaterials('3. Ratio, Proportion and Rates of Change') },
              { id: 'geometry', name: '4. Geometry and Measures', materials: generatePlaceholderMaterials('4. Geometry and Measures') },
              { id: 'probability', name: '5. Probability', materials: generatePlaceholderMaterials('5. Probability') },
              { id: 'statistics', name: '6. Statistics', materials: generatePlaceholderMaterials('6. Statistics') }
            ]
          },
          {
            id: 'biology',
            name: 'Biology',
            topics: [
              { id: 'key-concepts', name: '1. Key Concepts in Biology', materials: generatePlaceholderMaterials('1. Key Concepts in Biology') },
              { id: 'cells-control', name: '2. Cells and Control', materials: generatePlaceholderMaterials('2. Cells and Control') },
              { id: 'genetics', name: '3. Genetics', materials: generatePlaceholderMaterials('3. Genetics') },
              { id: 'natural-selection', name: '4. Natural Selection and Genetic Modification', materials: generatePlaceholderMaterials('4. Natural Selection and Genetic Modification') },
              { id: 'health', name: '5. Health, Disease and the Development of Medicines', materials: generatePlaceholderMaterials('5. Health, Disease and the Development of Medicines') },
              { id: 'plant-structures', name: '6. Plant Structures and their Functions', materials: generatePlaceholderMaterials('6. Plant Structures and their Functions') },
              { id: 'animal-coordination', name: '7. Animal Coordination, Control and Homeostasis', materials: generatePlaceholderMaterials('7. Animal Coordination, Control and Homeostasis') },
              { id: 'exchange', name: '8. Exchange and Transport in Animals', materials: generatePlaceholderMaterials('8. Exchange and Transport in Animals') },
              { id: 'ecosystems', name: '9. Ecosystems and Material Cycles', materials: generatePlaceholderMaterials('9. Ecosystems and Material Cycles') }
            ]
          },
          {
            id: 'chemistry',
            name: 'Chemistry',
            topics: [
              { id: 'key-concepts', name: '1. Key Concepts in Chemistry', materials: generatePlaceholderMaterials('1. Key Concepts in Chemistry') },
              { id: 'states-of-matter', name: '2. States of Matter and Mixtures', materials: generatePlaceholderMaterials('2. States of Matter and Mixtures') },
              { id: 'chemical-changes', name: '3. Chemical Changes', materials: generatePlaceholderMaterials('3. Chemical Changes') },
              { id: 'extracting-metals', name: '4. Extracting Metals and Equilibria', materials: generatePlaceholderMaterials('4. Extracting Metals and Equilibria') },
              { id: 'separate-chemistry-1', name: '5. Separate Chemistry 1', materials: generatePlaceholderMaterials('5. Separate Chemistry 1') },
              { id: 'groups', name: '6. Groups in the Periodic Table', materials: generatePlaceholderMaterials('6. Groups in the Periodic Table') },
              { id: 'rates', name: '7. Rates of Reaction and Energy Changes', materials: generatePlaceholderMaterials('7. Rates of Reaction and Energy Changes') },
              { id: 'fuels', name: '8. Fuels and Earth Science', materials: generatePlaceholderMaterials('8. Fuels and Earth Science') },
              { id: 'separate-chemistry-2', name: '9. Separate Chemistry 2', materials: generatePlaceholderMaterials('9. Separate Chemistry 2') }
            ]
          },
          {
            id: 'physics',
            name: 'Physics',
            topics: [
              { id: 'key-concepts', name: '1. Key Concepts of Physics', materials: generatePlaceholderMaterials('1. Key Concepts of Physics') },
              { id: 'motion-forces', name: '2. Motion and Forces', materials: generatePlaceholderMaterials('2. Motion and Forces') },
              { id: 'conservation-energy', name: '3. Conservation of Energy', materials: generatePlaceholderMaterials('3. Conservation of Energy') },
              { id: 'waves', name: '4. Waves', materials: generatePlaceholderMaterials('4. Waves') },
              { id: 'light-em', name: '5. Light and the Electromagnetic Spectrum', materials: generatePlaceholderMaterials('5. Light and the Electromagnetic Spectrum') },
              { id: 'radioactivity', name: '6. Radioactivity', materials: generatePlaceholderMaterials('6. Radioactivity') },
              { id: 'astronomy', name: '7. Astronomy', materials: generatePlaceholderMaterials('7. Astronomy') },
              { id: 'energy-forces', name: '8. Energy - Forces Doing Work', materials: generatePlaceholderMaterials('8. Energy - Forces Doing Work') },
              { id: 'forces-effects', name: '9. Forces and their Effects', materials: generatePlaceholderMaterials('9. Forces and their Effects') },
              { id: 'electricity', name: '10. Electricity and Circuits', materials: generatePlaceholderMaterials('10. Electricity and Circuits') },
              { id: 'static-electricity', name: '11. Static Electricity', materials: generatePlaceholderMaterials('11. Static Electricity') },
              { id: 'magnetism', name: '12. Magnetism and the Motor Effect', materials: generatePlaceholderMaterials('12. Magnetism and the Motor Effect') },
              { id: 'electromagnetic-induction', name: '13. Electromagnetic Induction', materials: generatePlaceholderMaterials('13. Electromagnetic Induction') },
              { id: 'particle-model', name: '14. Particle Model', materials: generatePlaceholderMaterials('14. Particle Model') },
              { id: 'forces-matter', name: '15. Forces and Matter', materials: generatePlaceholderMaterials('15. Forces and Matter') }
            ]
          },
          {
            id: 'business',
            name: 'Business',
            topics: [
              { id: 'theme-1', name: 'Theme 1: Investigating small business', materials: generatePlaceholderMaterials('Theme 1: Investigating small business') },
              { id: 'theme-2', name: 'Theme 2: Building a business', materials: generatePlaceholderMaterials('Theme 2: Building a business') }
            ]
          },
          {
            id: 'history',
            name: 'History',
            topics: [
              { id: 'thematic', name: '1. Thematic study and historic environment', materials: generatePlaceholderMaterials('1. Thematic study and historic environment') },
              { id: 'period', name: '2. Period study and British depth study', materials: generatePlaceholderMaterials('2. Period study and British depth study') },
              { id: 'modern', name: '3. Modern depth study', materials: generatePlaceholderMaterials('3. Modern depth study') }
            ]
          }
        ]
      },
      {
        id: 'ocr',
        name: 'OCR',
        subjects: [
          {
            id: 'biology',
            name: 'Biology',
            topics: [
              { id: 'cell-level', name: '1. Cell Level Systems', materials: generatePlaceholderMaterials('1. Cell Level Systems') },
              { id: 'scaling-up', name: '2. Scaling Up', materials: generatePlaceholderMaterials('2. Scaling Up') },
              { id: 'organism-level', name: '3. Organism Level Systems', materials: generatePlaceholderMaterials('3. Organism Level Systems') },
              { id: 'community-level', name: '4. Community Level Systems', materials: generatePlaceholderMaterials('4. Community Level Systems') },
              { id: 'genes-inheritance', name: '5. Genes, Inheritance and Selection', materials: generatePlaceholderMaterials('5. Genes, Inheritance and Selection') },
              { id: 'global-challenges', name: '6. Global Challenges', materials: generatePlaceholderMaterials('6. Global Challenges') }
            ]
          },
          {
            id: 'chemistry',
            name: 'Chemistry',
            topics: [
              { id: 'particles', name: '1. Particles', materials: generatePlaceholderMaterials('1. Particles') },
              { id: 'elements', name: '2. Elements, Compounds and Mixtures', materials: generatePlaceholderMaterials('2. Elements, Compounds and Mixtures') },
              { id: 'chemical-reactions', name: '3. Chemical Reactions', materials: generatePlaceholderMaterials('3. Chemical Reactions') },
              { id: 'predicting-reactions', name: '4. Predicting and Identifying Reactions and Products', materials: generatePlaceholderMaterials('4. Predicting and Identifying Reactions and Products') },
              { id: 'monitoring-controlling', name: '5. Monitoring and Controlling Chemical Reactions', materials: generatePlaceholderMaterials('5. Monitoring and Controlling Chemical Reactions') },
              { id: 'global-challenges', name: '6. Global Challenges', materials: generatePlaceholderMaterials('6. Global Challenges') }
            ]
          },
          {
            id: 'physics',
            name: 'Physics',
            topics: [
              { id: 'matter', name: '1. Matter', materials: generatePlaceholderMaterials('1. Matter') },
              { id: 'forces', name: '2. Forces', materials: generatePlaceholderMaterials('2. Forces') },
              { id: 'electricity', name: '3. Electricity', materials: generatePlaceholderMaterials('3. Electricity') },
              { id: 'magnetism', name: '4. Magnetism and Magnetic Fields', materials: generatePlaceholderMaterials('4. Magnetism and Magnetic Fields') },
              { id: 'waves', name: '5. Waves in Matter', materials: generatePlaceholderMaterials('5. Waves in Matter') },
              { id: 'radioactivity', name: '6. Radioactivity', materials: generatePlaceholderMaterials('6. Radioactivity') },
              { id: 'energy', name: '7. Energy', materials: generatePlaceholderMaterials('7. Energy') },
              { id: 'global-challenges', name: '8. Global Challenges', materials: generatePlaceholderMaterials('8. Global Challenges') }
            ]
          },
          {
            id: 'maths',
            name: 'Mathematics',
            topics: [
              { id: 'number', name: '1. Number', materials: generatePlaceholderMaterials('1. Number') },
              { id: 'algebra', name: '2. Algebra', materials: generatePlaceholderMaterials('2. Algebra') },
              { id: 'ratio', name: '3. Ratio, Proportion and Rates of Change', materials: generatePlaceholderMaterials('3. Ratio, Proportion and Rates of Change') },
              { id: 'geometry', name: '4. Geometry and Measures', materials: generatePlaceholderMaterials('4. Geometry and Measures') },
              { id: 'probability', name: '5. Probability', materials: generatePlaceholderMaterials('5. Probability') },
              { id: 'statistics', name: '6. Statistics', materials: generatePlaceholderMaterials('6. Statistics') }
            ]
          },
          {
            id: 'computer-science',
            name: 'Computer Science',
            topics: [
              { id: 'computer-systems', name: '1. Computer systems', materials: generatePlaceholderMaterials('1. Computer systems') },
              { id: 'computational-thinking', name: '2. Computational thinking, algorithms and programming', materials: generatePlaceholderMaterials('2. Computational thinking, algorithms and programming') }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'a-level',
    name: 'A Level',
    examBoards: [
      {
        id: 'aqa',
        name: 'AQA',
        subjects: [
          {
            id: 'biology',
            name: 'Biology',
            topics: [
              { id: 'biological-molecules', name: '1. Biological Molecules', materials: generatePlaceholderMaterials('1. Biological Molecules') },
              { id: 'cells', name: '2. Cells', materials: generatePlaceholderMaterials('2. Cells') },
              { id: 'exchange', name: '3. Organisms Exchange Substances with their Environment', materials: generatePlaceholderMaterials('3. Organisms Exchange Substances with their Environment') },
              { id: 'genetic-info', name: '4. Genetic Information, Variation and Relationships', materials: generatePlaceholderMaterials('4. Genetic Information, Variation and Relationships') },
              { id: 'energy-transfers', name: '5. Energy Transfers in and between Organisms', materials: generatePlaceholderMaterials('5. Energy Transfers in and between Organisms') },
              { id: 'response', name: '6. Organisms Respond to Changes in their Internal and External Environments', materials: generatePlaceholderMaterials('6. Organisms Respond to Changes in their Internal and External Environments') },
              { id: 'genetics-populations', name: '7. Genetics, Populations, Evolution and Ecosystems', materials: generatePlaceholderMaterials('7. Genetics, Populations, Evolution and Ecosystems') },
              { id: 'gene-expression', name: '8. The Control of Gene Expression', materials: generatePlaceholderMaterials('8. The Control of Gene Expression') }
            ]
          },
          {
            id: 'chemistry',
            name: 'Chemistry',
            topics: [
              { id: 'physical', name: '1. Physical Chemistry', materials: generatePlaceholderMaterials('1. Physical Chemistry') },
              { id: 'inorganic', name: '2. Inorganic Chemistry', materials: generatePlaceholderMaterials('2. Inorganic Chemistry') },
              { id: 'organic', name: '3. Organic Chemistry', materials: generatePlaceholderMaterials('3. Organic Chemistry') }
            ]
          },
          {
            id: 'physics',
            name: 'Physics',
            topics: [
              { id: 'measurements', name: '1. Measurements and their Errors', materials: generatePlaceholderMaterials('1. Measurements and their Errors') },
              { id: 'particles', name: '2. Particles and Radiation', materials: generatePlaceholderMaterials('2. Particles and Radiation') },
              { id: 'waves', name: '3. Waves', materials: generatePlaceholderMaterials('3. Waves') },
              { id: 'mechanics', name: '4. Mechanics and Materials', materials: generatePlaceholderMaterials('4. Mechanics and Materials') },
              { id: 'electricity', name: '5. Electricity', materials: generatePlaceholderMaterials('5. Electricity') },
              { id: 'further-mechanics', name: '6. Further Mechanics and Thermal Physics', materials: generatePlaceholderMaterials('6. Further Mechanics and Thermal Physics') },
              { id: 'fields', name: '7. Fields and their Consequences', materials: generatePlaceholderMaterials('7. Fields and their Consequences') },
              { id: 'nuclear', name: '8. Nuclear Physics', materials: generatePlaceholderMaterials('8. Nuclear Physics') }
            ]
          }
        ]
      },
      {
        id: 'edexcel',
        name: 'Edexcel',
        subjects: [
          {
            id: 'maths',
            name: 'Mathematics',
            topics: [
              { id: 'pure-1', name: '1. Pure Mathematics 1', materials: generatePlaceholderMaterials('1. Pure Mathematics 1') },
              { id: 'pure-2', name: '2. Pure Mathematics 2', materials: generatePlaceholderMaterials('2. Pure Mathematics 2') },
              { id: 'statistics', name: '3. Statistics', materials: generatePlaceholderMaterials('3. Statistics') },
              { id: 'mechanics', name: '4. Mechanics', materials: generatePlaceholderMaterials('4. Mechanics') }
            ]
          }
        ]
      },
      {
        id: 'ocr',
        name: 'OCR',
        subjects: [
          {
            id: 'physics',
            name: 'Physics',
            topics: [
              { id: 'development', name: '1. Development of Practical Skills', materials: generatePlaceholderMaterials('1. Development of Practical Skills') },
              { id: 'foundations', name: '2. Foundations of Physics', materials: generatePlaceholderMaterials('2. Foundations of Physics') },
              { id: 'forces', name: '3. Forces and Motion', materials: generatePlaceholderMaterials('3. Forces and Motion') },
              { id: 'electrons', name: '4. Electrons, Waves and Photons', materials: generatePlaceholderMaterials('4. Electrons, Waves and Photons') },
              { id: 'newtonian', name: '5. Newtonian World and Astrophysics', materials: generatePlaceholderMaterials('5. Newtonian World and Astrophysics') },
              { id: 'particles', name: '6. Particles and Medical Physics', materials: generatePlaceholderMaterials('6. Particles and Medical Physics') }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'extracurricular',
    name: 'Extracurricular',
    examBoards: [
      {
        id: 'tech-coding',
        name: 'Tech & Coding',
        subjects: [
          {
            id: 'computer-science-extra',
            name: 'Computer Science',
            topics: [
              { id: 'extra-coding', name: 'Coding Competitions & Hackathons', materials: generatePlaceholderMaterials('Coding Competitions & Hackathons') },
              { id: 'extra-robotics', name: 'Robotics Club', materials: generatePlaceholderMaterials('Robotics Club') },
              { id: 'extra-game-dev', name: 'Game Development', materials: generatePlaceholderMaterials('Game Development') },
              { id: 'extra-cyber', name: 'Cybersecurity & CTFs', materials: generatePlaceholderMaterials('Cybersecurity & CTFs') }
            ]
          }
        ]
      },
      {
        id: 'humanities-languages',
        name: 'Humanities & Languages',
        subjects: [
          {
            id: 'french-extra',
            name: 'French',
            topics: [
              { id: 'extra-cinema', name: 'French Cinema & Literature', materials: generatePlaceholderMaterials('French Cinema & Literature') },
              { id: 'extra-exchange', name: 'Language Exchange & Trips', materials: generatePlaceholderMaterials('Language Exchange & Trips') }
            ]
          },
          {
            id: 'history-extra',
            name: 'History',
            topics: [
              { id: 'extra-mun', name: 'Model United Nations (MUN)', materials: generatePlaceholderMaterials('Model United Nations (MUN)') },
              { id: 'extra-society', name: 'Historical Debate Society', materials: generatePlaceholderMaterials('Historical Debate Society') }
            ]
          }
        ]
      },
      {
        id: 'business-enterprise',
        name: 'Business & Enterprise',
        subjects: [
          {
            id: 'business-extra',
            name: 'Business',
            topics: [
              { id: 'extra-young-enterprise', name: 'Young Enterprise', materials: generatePlaceholderMaterials('Young Enterprise') },
              { id: 'extra-investment', name: 'Student Investment Club', materials: generatePlaceholderMaterials('Student Investment Club') }
            ]
          }
        ]
      }
    ]
  }
];
