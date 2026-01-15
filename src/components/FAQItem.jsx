import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-primary-700 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg text-neutral-800 pr-8">
          {question}
        </span>
        <svg
          className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-6 text-neutral-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
