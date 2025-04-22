import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 
import logo from "./assets/logo.png";
import braceImg from "./assets/brace.png";  
import brace1 from "./assets/brace1.png";   
import solution1 from "./assets/solution1.png";
import solution2 from "./assets/solution2.png";
import solution3 from "./assets/solution3.png";
import aiIcon from "./assets/icons/ai-transformation.svg";
import customizedIcon from "./assets/icons/customized-ai-solutions.svg";
import scalableIcon from "./assets/icons/scalable-solutions.svg";
import techArrow from "./assets/icons/technology-arrow.png";
import resourceImg from "./assets/resource.png";  

import "./App.css";

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ["home", "solutions", "technology", "resources", "faqs", "contact"];
      let current = "home";
      for (let id of sections) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollY + 100) {
          current = id;
        }
      }
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        navbar.className = `navbar navbar-${current}`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []); 

  return (
    <div>
      <nav className="navbar navbar-home">
        <div className="navbar-right">
          <a href="#home">Home</a>
          <a href="#solutions">Solutions</a>
          <a href="#technology">Technology</a>
          <a href="#resources">Resources</a>
          <a href="#faqs">FAQs</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="section home-section">
         <div className="home-container">
          <div className="home-left">
            <div className="logo-above-text">
              <img src={logo} alt="Logo" style={{ height: "300px" }} />
            </div>
            <h1>
         
             <span className="highlight">Enable intelligence</span> is a forward-thinking, AI-driven organization born from a vision to reimagine the way industries operate, make decisions, and create value. In an era where data is abundant but intelligence is rare, we exist to bridge that gap by delivering smart, scalable, and ethical AI solutions across a wide spectrum of industries.
            </h1>
            <p>
             At <span className="highlight">Enable intelligence</span> , we don't just develop AI we enable intelligence. By blending data science, machine learning, and industry expertise, we help our client
            </p>
            </div>
          <div className="home-right">
            <div className="brace-text-row">
              <img src={brace1} alt="Opening Brace" className="home-brace-image" />
              <p className="hero-text">
                <strong>Empowering</strong>
                <br />
                <strong>Decisions.</strong>
                <br />
                <strong>Enabling</strong>
                <br />
                <strong>Insight.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="solutions-container" id="solutions">
        <div className="solutions-top">
          <h2 className="solutions-title"><strong>Solutions</strong></h2>
          <div className="solutions-heading">
            <h1 className="solutions-text">
              <strong>Shaping Tomorrow</strong><br />
              with <span className="orange"><strong>Intelligence</strong></span> <strong>Today</strong>
            </h1>
          </div>
        </div>

        <div className="solution-cards-row">
          <div className="solution-card orange-bg">
            <h3>SPOCARE</h3>
            <img src={solution1} alt="SPOCARE" />
          </div>
          <div className="solution-card dark-bg">
            <h3>SPORTIFY IQ</h3>
            <img src={solution2} alt="SPORTIFY IQ" />
          </div>
          <div className="solution-card orange-bg">
            <h3>AESTHETIC AI</h3>
            <img src={solution3} alt="AESTHETIC AI" />
          </div>
        </div>
      </div>

      <section id="technology" className="technology-section">
        <div className="technology-left">
          <h2><strong>Technology</strong></h2>
          <img
            src={techArrow}
            alt="Orange arrow"
            className="technology-arrow"
          />
        </div>

        <div className="technology-right">
          <div className="technology-item">
            <img src={aiIcon} alt="AI Transformation" />
            <p>AI Transformation</p>
          </div>
          <div className="technology-item">
            <img src={customizedIcon} alt="Customized AI Solutions" />
            <p>Customized AI Solutions</p>
          </div>
          <div className="technology-item">
            <img src={scalableIcon} alt="Scalable Solutions" />
            <p>Scalable Solutions</p>
          </div>
        </div>
      </section>

      <section id="resources" className="resources-section">
        <div className="resources-inner">
          <h2 className="resources-heading"><strong>Resources</strong></h2>
          <img src={resourceImg} alt="Resources" className="resources-img" />
          <div className="resource-cards">
            {[1, 2, 3].map((item) => (
              <div key={item} className="resource-card">
                <h3 className="resource-title">World Refugee Day 2030: <br /> Events & Activities</h3>
                <p className="resource-description">
                  This space is for an excerpt or preview of your main article. You can opt to simply add the first paragraph directly, or create a summary or teaser for it.
                </p>
                <hr />
                <a href="#" className="read-more">Read More</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs">
        <div className="faq-content">
          <h2 className="faq-heading"><strong>FAQ’s</strong></h2>
          <div className="faq-list">
            <details className="faq-card">
              <summary>What is SPOCARE?</summary>
              <p>SPOCARE is a comprehensive medical data platform designed to...</p>
            </details>
            <details className="faq-card">
              <summary>Is SPOCARE application integrated with real time hospital data?</summary>
              <p>Yes, SPOCARE syncs in real time with connected hospital systems...</p>
            </details>
            <details className="faq-card">
              <summary>Can I upload my historical medical reports data to SPOCARE?</summary>
              <p>Absolutely! You can upload old medical reports in PDF or image formats...</p>
            </details>
            <details className="faq-card">
              <summary>How secure is the personal data?</summary>
              <p>Your data is protected with industry-standard encryption and compliance protocols...</p>
            </details>
          </div>
        </div>
        <div className="faq-watermark">?</div>
      </section>

      <section id="contact">
        <div className="contact-container">
          <div className="contact-left">
            <h2><strong>Get in touch</strong></h2>
            <p><strong>Email</strong> hello@enableintelligence.com</p>
            <p><strong>Phone</strong> (123) 456-7890</p>
          </div>
          <div className="contact-right">
            <p className="quote">“Got a vision?<br />Let’s build the AI to match”</p>
            <div className="logo-section">
              <p><strong>Enable<br />Intelligence</strong></p>
              <img src={braceImg} alt="Brace" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
