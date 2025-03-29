import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const PandaContainer = styled(motion.div)({
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  width: '200px',
  height: '200px',
  zIndex: 10,
  pointerEvents: 'none',
});

const Panda = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
}));

const PandaHead = styled(motion.div)(({ theme }) => ({
  width: '100px',
  height: '80px',
  background: '#FFFFFF',
  borderRadius: '50%',
  position: 'absolute',
  top: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
}));

const PandaEar = styled(motion.div)(({ theme }) => ({
  width: '40px',
  height: '40px',
  background: '#000000',
  borderRadius: '50%',
  position: 'absolute',
  top: '-10px',
}));

const PandaEye = styled(motion.div)(({ theme }) => ({
  width: '25px',
  height: '30px',
  background: '#000000',
  borderRadius: '50%',
  position: 'absolute',
  top: '30px',
}));

const PandaNose = styled(motion.div)(({ theme }) => ({
  width: '16px',
  height: '12px',
  background: '#000000',
  borderRadius: '50%',
  position: 'absolute',
  top: '50px',
  left: '50%',
  transform: 'translateX(-50%)',
}));

const PandaBody = styled(motion.div)(({ theme }) => ({
  width: '120px',
  height: '100px',
  background: '#FFFFFF',
  borderRadius: '50%',
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
}));

const PandaArm = styled(motion.div)(({ theme }) => ({
  width: '35px',
  height: '60px',
  background: '#000000',
  borderRadius: '20px',
  position: 'absolute',
  top: '20px',
}));

interface PandaAnimationProps {
  progress: number; // 0 to 100
}

export const PandaAnimation: React.FC<PandaAnimationProps> = ({ progress }) => {
  const bounceTransition = {
    y: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeOut"
    },
    rotate: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeOut"
    }
  };

  const blinkTransition = {
    scaleY: {
      duration: 0.1,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeOut",
      repeatDelay: 2.5
    }
  };

  const waveTransition = {
    rotate: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <PandaContainer
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Panda>
        <PandaBody
          animate={{ y: [-5, 5] }}
          transition={bounceTransition}
        >
          <PandaArm
            style={{ left: '-20px', transformOrigin: 'top center' }}
            animate={{ rotate: progress > 95 ? [-20, 20] : 0 }}
            transition={waveTransition}
          />
          <PandaArm
            style={{ right: '-20px', transformOrigin: 'top center' }}
            animate={{ rotate: progress > 95 ? [20, -20] : 0 }}
            transition={waveTransition}
          />
        </PandaBody>
        <PandaHead
          animate={{ y: [-3, 3], rotate: [-2, 2] }}
          transition={bounceTransition}
        >
          <PandaEar style={{ left: '-5px' }} />
          <PandaEar style={{ right: '-5px' }} />
          <PandaEye 
            style={{ left: '20px' }}
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={blinkTransition}
          />
          <PandaEye 
            style={{ right: '20px' }}
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={blinkTransition}
          />
          <PandaNose />
        </PandaHead>
      </Panda>
    </PandaContainer>
  );
}; 