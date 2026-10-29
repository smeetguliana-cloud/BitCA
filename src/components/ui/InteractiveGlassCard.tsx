import React, { useRef, useCallback } from 'react';

interface InteractiveGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableSpotlight?: boolean;
}

export const InteractiveGlassCard: React.FC<InteractiveGlassCardProps> = ({
  children,
  className = '',
  enableTilt = true,
  enableSpotlight = true,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Only run on fine-pointer desktop devices
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (enableSpotlight) {
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }

      if (enableTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxTilt = 7; // subtle Apple-grade degrees
        const rotateX = -((y - centerY) / centerY) * maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
      }
    },
    [enableTilt, enableSpotlight]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card-v5 ${enableSpotlight ? 'spotlight-card' : ''} ${
        enableTilt ? 'tilt-card' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
