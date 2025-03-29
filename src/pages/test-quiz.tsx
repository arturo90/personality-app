import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { MotivationsQuiz, Question } from '@/components/assessment/MotivationsQuiz';

// Sample questions for testing
const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "When working on a team project, I typically:",
    section: 'GOOD_TIMES',
    options: [
      { label: "Focus on maintaining harmony and ensuring everyone feels included", value: "A" },
      { label: "Take charge and drive the project forward to meet goals", value: "B" },
      { label: "Analyze all aspects carefully before making decisions", value: "C" }
    ]
  },
  {
    id: 2,
    text: "In social situations, I usually:",
    section: 'GOOD_TIMES',
    options: [
      { label: "Try to make sure everyone feels comfortable and connected", value: "A" },
      { label: "Lead conversations and activities", value: "B" },
      { label: "Observe and understand the dynamics before engaging", value: "C" }
    ]
  },
  {
    id: 3,
    text: "During a disagreement, I tend to:",
    section: 'CONFLICT',
    options: [
      { label: "Seek compromise and restore peace", value: "A" },
      { label: "Address issues directly and find quick solutions", value: "B" },
      { label: "Step back and evaluate all perspectives", value: "C" }
    ]
  },
  {
    id: 4,
    text: "When tension arises in a group, I typically:",
    section: 'CONFLICT',
    options: [
      { label: "Try to mediate and keep everyone calm", value: "A" },
      { label: "Take control to resolve the situation quickly", value: "B" },
      { label: "Gather information before taking any action", value: "C" }
    ]
  }
];

const TestQuizPage = () => {
  const handleQuizComplete = (answers: { questionId: number; selectedOption: string }[]) => {
    console.log('Quiz completed!');
    console.log('Answers:', answers);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Test: Motivations Quiz
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a test page for the Motivations Quiz component. Try out the questions below!
        </Typography>
      </Box>

      <MotivationsQuiz 
        questions={sampleQuestions} 
        onComplete={handleQuizComplete} 
      />
    </Container>
  );
};

export default TestQuizPage; 