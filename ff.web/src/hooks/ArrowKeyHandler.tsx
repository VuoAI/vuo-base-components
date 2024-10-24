import { useEffect } from 'react';

type ArrowKeyHandler = (direction: 'left' | 'right') => void;

const useArrowKeyHandler = (onArrowPress: ArrowKeyHandler) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        onArrowPress('left');
      } else if (event.key === 'ArrowRight') {
        onArrowPress('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onArrowPress]);
};

export default useArrowKeyHandler;