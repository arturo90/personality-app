import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { MotivationsQuiz } from '@/components/assessment/MotivationsQuiz';
import { MotivationsResult, ScoreResult } from '@/components/assessment/MotivationsResult';
import { scoreAssessment } from '@/lib/scoring/motivationsScoring';
import { motivationsQuestions } from '@/data/motivationsQuestions';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4),
  background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
}));

const WelcomeCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  padding: theme.spacing(6),
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
}));

const StartButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5, 6),
  borderRadius: '12px',
  fontSize: '1.1rem',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
  transition: 'all 0.3s ease-in-out',
}));

type AssessmentStage = 'welcome' | 'quiz' | 'results';

const MotivationsAssessment: React.FC = () => {
  const [stage, setStage] = useState<AssessmentStage>('welcome');
  const [result, setResult] = useState<ScoreResult | null>(null);

  const handleStart = () => {
    setStage('quiz');
  };

  const handleQuizComplete = (answers: { questionId: number; selectedOption: string }[]) => {
    const assessmentResult = scoreAssessment(answers);
    setResult(assessmentResult);
    setStage('results');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <StyledContainer maxWidth="xl">
      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <WelcomeCard>
              <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
                Discover Your Motivational Style
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', fontWeight: 400 }}>
                Understand how you naturally approach relationships and handle conflicts
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                This assessment will help you understand:
              </Typography>
              <Box sx={{ mb: 4, textAlign: 'left', maxWidth: '400px', mx: 'auto' }}>
                <Typography component="ul" sx={{ pl: 2 }}>
                  <li>Your primary and secondary motivation styles</li>
                  <li>How you behave during good times vs. conflicts</li>
                  <li>Your unique approach to family dynamics</li>
                  <li>Ways to improve your relationships</li>
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
                The assessment takes about 10-15 minutes to complete
              </Typography>
              <StartButton variant="contained" onClick={handleStart}>
                Begin Assessment
              </StartButton>
            </WelcomeCard>
          </motion.div>
        )}

        {stage === 'quiz' && (
          <motion.div
            key="quiz"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <MotivationsQuiz questions={motivationsQuestions} onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {stage === 'results' && result && (
          <motion.div
            key="results"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <MotivationsResult result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </StyledContainer>
  );
};

export default MotivationsAssessment; 