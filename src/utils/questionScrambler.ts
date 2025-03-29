import { Question } from '@/components/assessment/MotivationsQuiz';

export const scrambleQuestions = (questions: Question[]): Question[] => {
  // Separate questions by section
  const goodTimesQuestions = questions.filter(q => q.section === 'GOOD_TIMES');
  const conflictQuestions = questions.filter(q => q.section === 'CONFLICT');

  // Fisher-Yates shuffle algorithm for each section
  const shuffle = (array: Question[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      
      // Also shuffle the options for each question
      array[i].options = shuffleOptions(array[i].options);
    }
    return array;
  };

  const shuffleOptions = (options: { label: string; value: string }[]) => {
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle each section separately and combine
  const shuffledGoodTimes = shuffle([...goodTimesQuestions]);
  const shuffledConflict = shuffle([...conflictQuestions]);

  // Return combined array with good times first, then conflict
  return [...shuffledGoodTimes, ...shuffledConflict];
}; 