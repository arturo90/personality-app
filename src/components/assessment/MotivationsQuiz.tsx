import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Button, LinearProgress, Container, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { AssessmentSection } from '@/lib/scoring/motivationsScoring';
import { PandaAnimation } from '@/components/animations/PandaAnimation';
import { scrambleQuestions } from '@/utils/questionScrambler';

interface QuizOption {
  label: string;
  value: string;
}

export interface Question {
  id: number;
  text: string;
  section: AssessmentSection;
  options: QuizOption[];
}

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
  },
}));

const OptionButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  borderRadius: '16px',
  textAlign: 'left',
  lineHeight: 1.5,
  background: 'rgba(255, 255, 255, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.9)',
    transform: 'scale(1.02)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  '&.selected': {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const ProgressIndicator = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  '.MuiLinearProgress-bar': {
    borderRadius: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  marginBottom: theme.spacing(1),
  opacity: 0.8,
}));

interface MotivationsQuizProps {
  questions: Question[];
  onComplete: (answers: { questionId: number; selectedOption: string }[]) => void;
}

export const MotivationsQuiz: React.FC<MotivationsQuizProps> = ({ questions: initialQuestions, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const theme = useTheme();

  useEffect(() => {
    // Scramble questions when the component mounts
    setQuestions(scrambleQuestions(initialQuestions));
  }, [initialQuestions]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (option: string) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: option,
    };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      const formattedAnswers = Object.entries(newAnswers).map(([questionId, selectedOption]) => ({
        questionId: parseInt(questionId),
        selectedOption,
      }));
      onComplete(formattedAnswers);
    }
  };

  const getEncouragingMessage = () => {
    if (progress <= 25) return "You're off to a great start!";
    if (progress <= 50) return "You're doing great, keep going!";
    if (progress <= 75) return "Almost there, you're making excellent progress!";
    return "Final questions, you're almost done!";
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <LinearProgress variant="determinate" value={progress} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {Math.round(progress)}%
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          color="primary" 
          sx={{ 
            mt: 2, 
            textAlign: 'center',
            fontWeight: 500,
            opacity: 0.9
          }}
        >
          {getEncouragingMessage()}
        </Typography>
      </Box>

      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StyledCard>
              <SectionTitle variant="subtitle1">
                {currentQuestion.section === 'GOOD_TIMES' ? 'During Good Times' : 'During Conflict'}
              </SectionTitle>
              <Typography variant="h5" component="h2" sx={{ mb: 4, fontWeight: 500 }}>
                {currentQuestion.text}
              </Typography>

              <Box>
                {currentQuestion.options.map((option) => (
                  <OptionButton
                    key={option.value}
                    className={answers[currentQuestion.id] === option.value ? 'selected' : ''}
                    onClick={() => handleOptionSelect(option.value)}
                    sx={{
                      '&:active': {
                        transform: 'scale(0.98)',
                      },
                    }}
                  >
                    <Typography variant="body1">{option.label}</Typography>
                  </OptionButton>
                ))}
              </Box>
            </StyledCard>
          </motion.div>
        )}
      </AnimatePresence>

      <PandaAnimation progress={progress} />
    </Container>
  );
}; 