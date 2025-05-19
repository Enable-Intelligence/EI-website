
import solution1 from "../assets/solution1.png";
import solution2 from "../assets/solution2.png";
import solution3 from "../assets/solution3.png";

export const solutionsData = [
    { 
        title: "SPOCARE", 
        img: solution1,
        description: "Revolutionizing healthcare through AI-powered diagnostics and patient care management. Our platform combines advanced machine learning with medical expertise to deliver accurate, timely, and personalized healthcare solutions.",
    },
    { 
        title: "SPORTIFY IQ", 
        img: solution2,
        description: "Sportify is a comprehensive mobile application designed to support athletes and active individuals in their physical therapy and rehabilitation journeys. Whether you're recovering from an injury or aiming to enhance your performance, Sportify offers a suite of tools to assist you.",
    },
    { 
        title: "AESTHETIC AI", 
        img: solution3,
        description: "Aesthetics AI is an innovative application that leverages artificial intelligence to help users enhance their visual presence—whether it's personal style, interior design, branding, or digital content. By combining cutting-edge AI with principles of aesthetics, the app offers smart, tailored suggestions that elevate the look and feel of whatever you're working on.",
    },
];

export const resources = [
    {
      title: "AI in Healthcare",
      desc: "Exploring the future of medical diagnostics",
      tag: "Healthcare",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Machine Learning Basics",
      desc: "A comprehensive guide for beginners",
      tag: "Education",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Data Privacy",
      desc: "Best practices for secure AI implementation",
      tag: "Security",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ]

export const faqLeft = [
  {
    q: 'What is SPOCARE?',
    a: 'SPOCARE is our advanced hospital AI platform that revolutionizes diagnostics through machine learning and predictive analytics.'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes, we implement end-to-end encryption and maintain HIPAA compliance to ensure your data remains protected at all times.'
  },
  {
    q: 'Can I export reports?',
    a: 'Absolutely! You can export reports in multiple formats including PDF and CSV, with customizable templates available.'
  }
];

export const faqRight = [
  {
    q: 'How does the AI work?',
    a: 'Our AI combines multiple advanced algorithms to analyse data patterns and provide accurate predictions and insights.'
  },
  {
    q: 'What support do you offer?',
    a: 'We provide 24/7 technical support, regular updates, and dedicated account managers for enterprise clients.'
  },
  {
    q: 'Can I customise the platform?',
    a: 'Yes, our platform is highly customisable to meet your specific needs and requirements.'
  }
];

