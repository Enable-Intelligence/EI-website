// index.jsx
import React from 'react';
import ContactForm from './ContactForm';
import CompanyInfo from './CompanyInfo';
import MeetingCards from './MeetingCards';

const ContactSection = () => {
  return (
    <section id="contact" className="pt-24 pb-16 px-4 md:px-16 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-black mb-4 text-orange-500">Let's Talk</h2>
          <p className="text-xl text-gray-600">
            We're here to help and answer any questions you might have
          </p>
        </div>

        {/* Main content - typically split into form and company info */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Form */}
          <ContactForm />

          {/* Company Info & Meeting Cards on the right */}
          <div className="flex flex-col gap-10 flex-1">
            <CompanyInfo />
            <MeetingCards />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
