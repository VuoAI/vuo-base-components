import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newPosition = position;

      if (position === 'top' && triggerRect.top < tooltipRect.height) {
        newPosition = 'bottom';
      } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height > viewportHeight) {
        newPosition = 'top';
      } else if (position === 'left' && triggerRect.left < tooltipRect.width) {
        newPosition = 'right';
      } else if (position === 'right' && triggerRect.right + tooltipRect.width > viewportWidth) {
        newPosition = 'left';
      }

      setAdjustedPosition(newPosition);
    }
  }, [isVisible, position]);

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '14px',
    zIndex: 1000,
    width: '200px',
    ...(adjustedPosition === 'top' && { bottom: '100%', left: '50%', transform: 'translateX(-50%)' }),
    ...(adjustedPosition === 'bottom' && { top: '100%', left: '50%', transform: 'translateX(-50%)' }),
    ...(adjustedPosition === 'left' && { right: '100%', top: '50%', transform: 'translateY(-50%)' }),
    ...(adjustedPosition === 'right' && { left: '100%', top: '50%', transform: 'translateY(-50%)' }),
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div ref={tooltipRef} style={tooltipStyle}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
