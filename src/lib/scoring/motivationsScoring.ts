export type PersonalityType = 'HARMONIZER' | 'DRIVER' | 'ANALYZER';
export type AssessmentSection = 'GOOD_TIMES' | 'CONFLICT';

interface Answer {
  questionId: number;
  selectedOption: string;
}

interface ScoreResult {
  goodTimes: {
    harmonizer: number;
    driver: number;
    analyzer: number;
  };
  conflict: {
    harmonizer: number;
    driver: number;
    analyzer: number;
  };
  primary: PersonalityType;
  secondary: PersonalityType;
  conflictStyle: PersonalityType;
  motivationalShift: {
    harmonizer: number;
    driver: number;
    analyzer: number;
    intensity: 'small' | 'medium' | 'large';
  };
}

const calculateSectionScores = (answers: Answer[], section: AssessmentSection) => {
  const sectionScores = {
    harmonizer: 0,
    driver: 0,
    analyzer: 0
  };

  answers.forEach(answer => {
    const questionId = answer.questionId;
    const option = answer.selectedOption;

    // Each answer contributes to its respective type score
    switch (option) {
      case 'A':
        sectionScores.harmonizer += 10; // Each question worth 10 points
        break;
      case 'B':
        sectionScores.driver += 10;
        break;
      case 'C':
        sectionScores.analyzer += 10;
        break;
    }
  });

  return sectionScores;
};

const determinePersonalityType = (scores: { harmonizer: number; driver: number; analyzer: number }): PersonalityType => {
  if (scores.harmonizer >= scores.driver && scores.harmonizer >= scores.analyzer) {
    return 'HARMONIZER';
  } else if (scores.driver >= scores.harmonizer && scores.driver >= scores.analyzer) {
    return 'DRIVER';
  } else {
    return 'ANALYZER';
  }
};

const determineSecondaryType = (
  scores: { harmonizer: number; driver: number; analyzer: number },
  primaryType: PersonalityType
): PersonalityType => {
  const types: PersonalityType[] = ['HARMONIZER', 'DRIVER', 'ANALYZER'];
  const scoresMap = {
    HARMONIZER: scores.harmonizer,
    DRIVER: scores.driver,
    ANALYZER: scores.analyzer
  };

  // Filter out the primary type and sort remaining by score
  const secondaryTypes = types
    .filter(type => type !== primaryType)
    .sort((a, b) => scoresMap[b] - scoresMap[a]);

  return secondaryTypes[0];
};

const calculateMotivationalShift = (
  goodTimesScores: { harmonizer: number; driver: number; analyzer: number },
  conflictScores: { harmonizer: number; driver: number; analyzer: number }
) => {
  const shifts = {
    harmonizer: Math.abs(goodTimesScores.harmonizer - conflictScores.harmonizer),
    driver: Math.abs(goodTimesScores.driver - conflictScores.driver),
    analyzer: Math.abs(goodTimesScores.analyzer - conflictScores.analyzer)
  };

  // Determine shift intensity based on the largest shift
  const maxShift = Math.max(...Object.values(shifts));
  let intensity: 'small' | 'medium' | 'large';

  if (maxShift <= 10) {
    intensity = 'small';
  } else if (maxShift <= 30) {
    intensity = 'medium';
  } else {
    intensity = 'large';
  }

  return {
    ...shifts,
    intensity
  };
};

export const scoreAssessment = (answers: Answer[]): ScoreResult => {
  // Separate answers by section
  const goodTimesAnswers = answers.filter(a => a.questionId <= 10);
  const conflictAnswers = answers.filter(a => a.questionId > 10);

  // Calculate scores for each section
  const goodTimesScores = calculateSectionScores(goodTimesAnswers, 'GOOD_TIMES');
  const conflictScores = calculateSectionScores(conflictAnswers, 'CONFLICT');

  // Determine primary and secondary types based on good times scores
  const primaryType = determinePersonalityType(goodTimesScores);
  const secondaryType = determineSecondaryType(goodTimesScores, primaryType);

  // Determine conflict style based on conflict scores
  const conflictStyle = determinePersonalityType(conflictScores);

  // Calculate motivational shift
  const motivationalShift = calculateMotivationalShift(goodTimesScores, conflictScores);

  return {
    goodTimes: goodTimesScores,
    conflict: conflictScores,
    primary: primaryType,
    secondary: secondaryType,
    conflictStyle,
    motivationalShift
  };
};

export const getPersonalityDescription = (type: PersonalityType, context: 'normal' | 'conflict' = 'normal'): string => {
  const descriptions = {
    HARMONIZER: {
      normal: "Motivated by nurturing others and maintaining positive relationships. You find meaning in helping others grow and develop, and you value relationships highly. You tend to be supportive, empathetic, and focused on group harmony.",
      conflict: "During conflict, you tend to accommodate and focus on preserving relationships. You're particularly concerned about emotional damage and work hard to maintain connections even under stress."
    },
    DRIVER: {
      normal: "Motivated by achieving results and overcoming challenges. You find meaning in accomplishment and progress. You tend to be action-oriented, direct, and focused on efficiency.",
      conflict: "During conflict, you become more assertive and results-focused. You push harder to resolve issues quickly and efficiently, prioritizing solutions over extended discussions."
    },
    ANALYZER: {
      normal: "Motivated by ensuring fairness, clarity, and logical order. You find meaning in making principled decisions and creating systems that work. You tend to be thoughtful, analytical, and focused on doing things correctly.",
      conflict: "During conflict, you become more analytical and principle-focused. You may withdraw to analyze situations thoroughly, seeking the most logical and fair resolution."
    }
  };

  return descriptions[type][context];
};

export const getMotivationalShiftDescription = (
  shift: { intensity: 'small' | 'medium' | 'large' },
  normalType: PersonalityType,
  conflictType: PersonalityType
): string => {
  const intensityDescriptions = {
    small: "Your approach remains quite consistent between normal times and conflict situations. This consistency can help others know what to expect from you, though you might benefit from developing more flexibility in challenging situations.",
    medium: "You show a moderate shift in your approach during conflict. While you maintain some of your core tendencies, you adapt your style to handle challenging situations differently.",
    large: "You demonstrate a significant shift in your approach during conflict. This flexibility can be adaptive, but it might also surprise others who are used to your typical style."
  };

  let typeShiftDescription = "";
  if (normalType !== conflictType) {
    typeShiftDescription = `\n\nSpecifically, you tend to shift from a ${normalType.toLowerCase()} approach in normal situations to a ${conflictType.toLowerCase()} approach during conflict. This means ${getPersonalityDescription(conflictType, 'conflict')}`;
  }

  return intensityDescriptions[shift.intensity] + typeShiftDescription;
}; 