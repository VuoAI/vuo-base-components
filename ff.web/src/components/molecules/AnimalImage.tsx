import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Animal } from '@vuo/components/organisms/CutGuessr';

interface AnimalImageProps {
  animal: Animal;
  onGuess: (x: number, y: number) => void;
  developerMode: boolean;
  userGuess: { x: number; y: number } | null;
  actualLocation: { x: number; y: number };
  resetLine: boolean;
}

const AnimalImage: React.FC<AnimalImageProps> = observer(({ animal, onGuess, developerMode, userGuess, actualLocation, resetLine }) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (imageRef.current && developerMode) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCoordinates({ x: Math.round(x), y: Math.round(y) });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      onGuess(Math.round(x), Math.round(y));
    }
  };

  const drawLine = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;

    if (!canvas || !img || !ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    if (!userGuess) return;

    // Get the computed styles for the root element
    const rootStyles = getComputedStyle(document.documentElement);

    // Extract the hex values for the brand colors
    const brandRed = rootStyles.getPropertyValue('--surface-brand-red').trim();
    const brandBlue = rootStyles.getPropertyValue('--surface-brand-blue').trim();
    const brandGreen = rootStyles.getPropertyValue('--surface-brand-green').trim();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(userGuess.x * canvas.width / 100, userGuess.y * canvas.height / 100);
    ctx.lineTo(actualLocation.x * canvas.width / 100, actualLocation.y * canvas.height / 100);
    ctx.strokeStyle = brandRed;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw blue circle for user guess
    ctx.beginPath();  
    ctx.arc(userGuess.x * canvas.width / 100, userGuess.y * canvas.height / 100, 5, 0, 2 * Math.PI);
    ctx.fillStyle = brandBlue;
    ctx.fill();

    // Draw green circle for actual location
    ctx.beginPath();
    ctx.arc(actualLocation.x * canvas.width / 100, actualLocation.y * canvas.height / 100, 5, 0, 2 * Math.PI);
    ctx.fillStyle = brandGreen;
    ctx.fill();
  };

  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };


  useEffect(() => {
    if (userGuess && actualLocation) {
      drawLine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userGuess, actualLocation]);

  useEffect(() => {
    if (resetLine) {
      clearCanvas();
    }
  }, [resetLine]);
  return (
    <div style={{ position: 'relative' }}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <img
        ref={imageRef}
        src={animal.image}
        alt={animal.name}
        style={{ width: '100%', height: 'auto' }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
      {developerMode && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(var(--surface-secondary) / 0.5)',
          color: 'var(--text-primary)',
          padding: 'var(--space-4)'
        }}>
          X: {coordinates.x}, Y: {coordinates.y}
        </div>
      )}
    </div>
  );
});

export default AnimalImage;
