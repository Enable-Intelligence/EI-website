// src/components/sections/FAQs/index.jsx
import React from 'react';
import FAQCard from './FAQCard';
import { faqLeft, faqRight } from '../../../utils/constants';
export default function FAQs({ isDarkMode }) {

  return (
    <section
      id="faqs"
      className={`${isDarkMode ? 'bg-orange-500/90' : 'bg-orange-500'} py-24 px-4 md:px-16 relative text-white overflow-hidden backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full mb-6">
            <h2 className="text-5xl font-black">Frequently Asked Questions</h2>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Find answers to common questions about our services and technology
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6" data-aos="fade-right">
            {faqLeft.map((f, i) => (
              <FAQCard key={i} {...f} delay={i * 0.1} />
            ))}
          </div>
          <div className="space-y-6" data-aos="fade-left">
            {faqRight.map((f, i) => (
              <FAQCard key={i} {...f} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16" data-aos="fade-up">
          <p className="text-xl mb-6">Still have questions?</p>
          <button
            className="bg-white text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:-translate-y-1"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
}
