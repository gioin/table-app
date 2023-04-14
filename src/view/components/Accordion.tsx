import React, { useState } from 'react';

interface AccordionProps {
  id: string;
  title: any;
  content: any;
  isActive?: boolean;
  width?: string
}

const Accordion = ({ id, title, content, isActive = false, width = "400px" }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(isActive);

  return (
    <div className="mb-4 border rounded-md" style={{width: width}}>
      <h2 className="border-b">
        <div
          className="w-full px-4 py-3 text-left focus:outline-none"
          aria-expanded={isExpanded}
          aria-controls={`${id}-body`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between w-full">
            <div className='w-full'>{title}</div>
            <svg
              className={`w-6 h-6 ${isExpanded ? 'transform rotate-180' : ''}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 13a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4A1 1 0 0110 13z" />
            </svg>
          </div>
        </div>
      </h2>
      <div
        id={`${id}-body`}
        className={`p-4 ${isExpanded ? 'block' : 'hidden'}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;