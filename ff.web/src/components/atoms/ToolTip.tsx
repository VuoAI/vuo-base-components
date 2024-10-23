import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
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
      // Use clientWidth instead of innerWidth
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight;

      let newPosition = position;
      let offsetX = 0;
      let offsetY = 0;

      // Adjust vertical position
      if (position === 'top' && triggerRect.top < tooltipRect.height) {
        newPosition = 'bottom';
      } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height > viewportHeight) {
        newPosition = 'top';
      }

      // Adjust horizontal position
      if (position === 'left' && triggerRect.left < tooltipRect.width) {
        newPosition = 'right';
      } else if (position === 'right' && triggerRect.right + tooltipRect.width > viewportWidth) {
        newPosition = 'left';
      }

      // Calculate offsets to keep tooltip within viewport
      if (newPosition === 'top' || newPosition === 'bottom') {
        const leftOverflow = Math.max(0, tooltipRect.width / 2 - triggerRect.left);
        const rightOverflow = Math.max(0, triggerRect.right + tooltipRect.width / 2 - viewportWidth);
        offsetX = rightOverflow - leftOverflow; // Inverted the calculation
      } else if (newPosition === 'left' || newPosition === 'right') {
        const topOverflow = Math.max(0, tooltipRect.height / 2 - triggerRect.top);
        const bottomOverflow = Math.max(0, triggerRect.bottom + tooltipRect.height / 2 - viewportHeight);
        offsetY = bottomOverflow - topOverflow; // Inverted the calculation
      }

      setAdjustedPosition(newPosition);
      setOffset({ x: offsetX, y: offsetY });
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
    ...(adjustedPosition === 'top' && { 
      bottom: '100%', 
      left: '50%', 
      transform: `translateX(calc(-50% - ${offset.x}px))` // Changed minus to plus
    }),
    ...(adjustedPosition === 'bottom' && { 
      top: '100%', 
      left: '50%', 
      transform: `translateX(calc(-50% - ${offset.x}px))` // Changed minus to plus
    }),
    ...(adjustedPosition === 'left' && { 
      right: '100%', 
      top: '50%', 
      transform: `translateY(calc(-50% - ${offset.y}px))` // Changed minus to plus
    }),
    ...(adjustedPosition === 'right' && { 
      left: '100%', 
      top: '50%', 
      transform: `translateY(calc(-50% - ${offset.y}px))` // Changed minus to plus
    }),
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
