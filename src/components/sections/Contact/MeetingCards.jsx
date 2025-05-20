import React from 'react';

const MeetingCards = () => {
  return (
    <>
      {/* Meeting Cards Row */}
      <div className="flex flex-col gap-4 mb-8 items-stretch w-full max-w-xl bg-orange-50/50 rounded-2xl p-2">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h4 className="text-xl font-bold mb-2">Product Demo</h4>
          <p className="text-gray-600 mb-4">Experience our cutting-edge AI solutions in action:</p>
          <ul className="text-gray-600 mb-4 space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              SPOCARE: AI-powered healthcare diagnostics platform
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              SPORTIFY IQ: Athletic performance optimization system
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              AESTHETIC AI: Visual enhancement and design platform
            </li>
          </ul>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center"
            onClick={() => window.open('https://tidycal.com/enableintelligence/15-minute-meeting', '_blank')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Schedule Demo
          </button>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h4 className="text-xl font-bold mb-2">Detailed Discussion</h4>
          <p className="text-gray-600 mb-4">Deep dive into your specific needs with our experts:</p>
          <ul className="text-gray-600 mb-4 space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Custom AI solution development
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Integration and deployment strategies
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Data security and compliance
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ROI and implementation timeline
            </li>
          </ul>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center"
            onClick={() => window.open('https://tidycal.com/enableintelligence/30-minute-meeting', '_blank')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule Discussion
          </button>
        </div>
      </div>
    </>
  );
};

export default MeetingCards;
