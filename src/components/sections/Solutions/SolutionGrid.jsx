/* src/components/sections/Solutions/SolutionGrid.jsx */
import React from 'react';
import SolutionCard from './SolutionCard';

export default function SolutionGrid({
  data,
  isMobile,
  activeCard,
  setActiveCard,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
      {data.map((item, idx) => (
        <SolutionCard
          key={idx}
          {...item}
          index={idx}
          isMobile={isMobile}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />
      ))}
    </div>
  );
}
