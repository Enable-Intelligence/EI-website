import React from 'react';

const ContactForm = ({
  isDarkMode,
  formData,
  handleInputChange,
  handleSubmit,
  formStatus,
  contactFormInputStyles
}) => {
  return (
    <div className={`flex-1 p-8 rounded-3xl shadow-xl ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    }`} data-aos="fade-right">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className={`block font-medium mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Name
            </span>
          </label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name" 
            className={`w-full p-4 border-2 rounded-xl transition-all ${
              isDarkMode 
                ? `${contactFormInputStyles.dark.backgroundColor} ${contactFormInputStyles.dark.borderColor} ${contactFormInputStyles.dark.textColor} ${contactFormInputStyles.dark.placeholderColor}`
                : `${contactFormInputStyles.light.backgroundColor} ${contactFormInputStyles.light.borderColor} ${contactFormInputStyles.light.textColor} ${contactFormInputStyles.light.placeholderColor}`
            }`}
            required 
          />
        </div>
        <div>
          <label className={`block font-medium mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </span>
          </label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email" 
            className={`w-full p-4 border-2 rounded-xl transition-all ${
              isDarkMode 
                ? `${contactFormInputStyles.dark.backgroundColor} ${contactFormInputStyles.dark.borderColor} ${contactFormInputStyles.dark.textColor} ${contactFormInputStyles.dark.placeholderColor}`
                : `${contactFormInputStyles.light.backgroundColor} ${contactFormInputStyles.light.borderColor} ${contactFormInputStyles.light.textColor} ${contactFormInputStyles.light.placeholderColor}`
            }`}
            required 
          />
        </div>
        <div>
          <label className={`block font-medium mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Message
            </span>
          </label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="How can we help?" 
            rows={4} 
            className={`w-full p-4 border-2 rounded-xl transition-all ${
              isDarkMode 
                ? `${contactFormInputStyles.dark.backgroundColor} ${contactFormInputStyles.dark.borderColor} ${contactFormInputStyles.dark.textColor} ${contactFormInputStyles.dark.placeholderColor}`
                : `${contactFormInputStyles.light.backgroundColor} ${contactFormInputStyles.light.borderColor} ${contactFormInputStyles.light.textColor} ${contactFormInputStyles.light.placeholderColor}`
            }`}
            required
          ></textarea>
        </div>

        {formStatus.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{formStatus.error}</span>
          </div>
        )}
        {formStatus.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Message sent successfully! We'll get back to you soon.</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            type="submit" 
            disabled={formStatus.loading}
            className={`flex-1 bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:-translate-y-1 flex items-center justify-center ${
              formStatus.loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-orange-600'
            }`}
          >
            {formStatus.loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Message
              </>
            )}
          </button>
          <button 
            type="button"
            onClick={() => window.open('https://tidycal.com/enableintelligence', '_blank')}
            className="flex-1 bg-white text-orange-500 border-2 border-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all transform hover:-translate-y-1 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book a Meeting
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-gray-900">Other Ways to Reach Us</h4>
              <div className="space-y-3">
                <a href="mailto:hr@enableintelligence.com" className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@enableintelligence.com
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-gray-900">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/enable-intelligence/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://github.com/Enable-Intelligence" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-500 italic">
            <p>We typically respond to inquiries within 24 hours during business days.</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
