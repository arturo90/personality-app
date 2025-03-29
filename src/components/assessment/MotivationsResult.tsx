import React from 'react';
import { Box, Card, Typography, Container, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { PersonalityType } from '@/lib/scoring/motivationsScoring';

export interface ScoreResult {
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

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
}));

const ScoreBar = styled(motion.div)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  transformOrigin: 'left',
}));

const TypeBadge = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  padding: theme.spacing(0.5, 2),
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.9)',
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  fontWeight: 500,
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  marginBottom: theme.spacing(3),
}));

interface ScoreDisplayProps {
  label: string;
  score: number;
  maxScore: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ label, score, maxScore }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2">{label}</Typography>
      <Typography variant="body2" fontWeight="500">
        {score}/{maxScore}
      </Typography>
    </Box>
    <Box sx={{ background: 'rgba(0, 0, 0, 0.04)', borderRadius: 3, overflow: 'hidden' }}>
      <ScoreBar
        initial={{ scaleX: 0 }}
        animate={{ scaleX: score / maxScore }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
      />
    </Box>
  </Box>
);

interface MotivationsResultProps {
  result: ScoreResult;
}

export const MotivationsResult: React.FC<MotivationsResultProps> = ({ result }) => {
  const { goodTimes, conflict, primary, secondary, conflictStyle, motivationalShift } = result;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'grid', gap: 4 }}>
          <Box>
            <StyledCard>
              <SectionTitle variant="h5">Your Personality Profile</SectionTitle>
              <Box sx={{ mb: 3 }}>
                <TypeBadge>Primary: {primary}</TypeBadge>
                <TypeBadge>Secondary: {secondary}</TypeBadge>
              </Box>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Your primary motivation style reflects how you naturally approach situations and relationships.
                This combination of {primary} with {secondary} influences creates your unique interaction style.
              </Typography>
            </StyledCard>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
            <Box>
              <StyledCard>
                <SectionTitle variant="h6">During Good Times</SectionTitle>
                <ScoreDisplay label="Harmonizer" score={goodTimes.harmonizer} maxScore={100} />
                <ScoreDisplay label="Driver" score={goodTimes.driver} maxScore={100} />
                <ScoreDisplay label="Analyzer" score={goodTimes.analyzer} maxScore={100} />
              </StyledCard>
            </Box>

            <Box>
              <StyledCard>
                <SectionTitle variant="h6">During Conflict</SectionTitle>
                <ScoreDisplay label="Harmonizer" score={conflict.harmonizer} maxScore={100} />
                <ScoreDisplay label="Driver" score={conflict.driver} maxScore={100} />
                <ScoreDisplay label="Analyzer" score={conflict.analyzer} maxScore={100} />
              </StyledCard>
            </Box>
          </Box>

          <Box>
            <StyledCard>
              <SectionTitle variant="h6">Your Response to Conflict</SectionTitle>
              <Typography variant="body1" sx={{ mb: 3 }}>
                During challenging situations, you tend to shift towards a {conflictStyle} style.
                The intensity of this shift is {motivationalShift.intensity}.
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Box>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                  Shift Magnitude
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                  <Box>
                    <ScoreDisplay
                      label="Harmonizer Shift"
                      score={motivationalShift.harmonizer}
                      maxScore={100}
                    />
                  </Box>
                  <Box>
                    <ScoreDisplay
                      label="Driver Shift"
                      score={motivationalShift.driver}
                      maxScore={100}
                    />
                  </Box>
                  <Box>
                    <ScoreDisplay
                      label="Analyzer Shift"
                      score={motivationalShift.analyzer}
                      maxScore={100}
                    />
                  </Box>
                </Box>
              </Box>
            </StyledCard>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}; 