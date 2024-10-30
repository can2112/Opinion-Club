import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

interface SwipeButtonProps {
  onSwipe: () => void;
  currentState: string;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({ onSwipe, currentState }) => {
  const [swipePosition, setSwipePosition] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [actionTriggered, setActionTriggered] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleSwipeStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (actionTriggered) return;
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleSwipeMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX || !isSwiping || actionTriggered) return;

    const currentX = e.touches[0].clientX;
    const moveDistance = Math.max(0, currentX - startX);
    const buttonWidth = buttonRef.current?.offsetWidth || 0;
    const maxPosition = buttonWidth - 50;

    if (moveDistance <= maxPosition) {
      setSwipePosition(moveDistance);
    }
  };

  const handleSwipeEnd = () => {
    if (!buttonRef.current || actionTriggered) return;
    const buttonWidth = buttonRef.current.offsetWidth;
    if (swipePosition >= buttonWidth - 60) {
      setSwipePosition(buttonWidth - 50);
      setActionTriggered(true);
      onSwipe();
    } else {
      setSwipePosition(0);
    }
    setIsSwiping(false);
    setStartX(null);
  };

  useEffect(() => {
    setActionTriggered(false);
    setSwipePosition(0);
  }, [currentState]);

  return (
    <div
      ref={buttonRef}
      className={`relative w-full h-12 ${
        currentState === "Buy" ? "bg-green-600" : "bg-red-600"
      } rounded-full overflow-hidden flex items-center`}
      onTouchStart={handleSwipeStart}
      onTouchMove={handleSwipeMove}
      onTouchEnd={handleSwipeEnd}
    >
      <div className="absolute h-full w-full flex items-center justify-center text-white font-semibold">
        {swipePosition > 0 ? "" : `Swipe to ${currentState}`}
      </div>
      <div
        className="absolute left-1 top-1 h-10 w-10 bg-white rounded-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${swipePosition}px)` }}
      >
        <FaArrowRight
          color={`${currentState === "Buy" ? "#16a34a" : "#dc2626"}`}
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default SwipeButton;
