import React from 'react';

const CompanyInfo = () => {
  return (
    <>
      {/* Quote and Company Info */}
      <div className="text-right">
        <p className="italic text-4xl mb-12 font-light text-orange-500">
          "Got a vision?<br />Let's build the AI to match."
        </p>
        <div className="flex items-center space-x-6 justify-end">
          <div className="text-4xl font-black text-orange-500">
            Enable<br />Intelligence
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
