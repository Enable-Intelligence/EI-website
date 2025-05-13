/* eslint-disable jsx-a11y/anchor-is-valid */
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
              <span className="highlight">Enable intelligence </span> is a forward-thinking, AI-driven organization born from a vision to reimagine the way industries operate, make decisions, and create value. In an era where data is abundant but intelligence is rare, we exist to bridge that gap by delivering smart, scalable, and ethical AI solutions across a wide spectrum of industries.
            </h1>
            <p>
              At <span className="highlight">Enable intelligence</span>, we don't just develop AI we enable intelligence. By blending data science, machine learning, and industry expertise, we help our clients.
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
          <img src={techArrow} alt="Orange arrow" className="technology-arrow" />
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
              <summary>What is Spocare?</summary>
              <p>Spocare is a healthcare application that enables hospitals and patients to seamlessly manage medical records, appointments, and communication—all in one place.</p>
            </details>
            <details className="faq-card">
              <summary>How do I book or reschedule an appointment in Spocare?</summary>
              <p>To book an appointment, go to Appointments, select a provider, choose a time slot, and tap Confirm. To reschedule, just tap on the appointment card and select Reschedule.</p>
            </details>
            <details className="faq-card">
              <summary>Can I download my full medical record from Spocare?</summary>
              <p>Yes, you can. Just go to Health Records › Export to download your record as a PDF. If the file is large, we’ll email you a secure download link.</p>
            </details>
            <details className="faq-card">
              <summary>Will Spocare remind me to take my medications?</summary>
              <p>Absolutely. Spocare automatically sets medication reminders based on your prescription details, so you’ll get timely notifications without needing to set anything manually.</p>
            </details>
            <details className="faq-card">
              <summary>How do you keep my health data safe?</summary>
              <p>Your privacy is our top priority. We use end-to-end encryption to protect your data, strictly follow HIPAA standards, and we never sell or share your personal health information with third parties.</p>
            </details>
            <details className="faq-card">
              <summary>How can AI benefit our company or industry?</summary>
              <p>AI features—such as predictive analytics, smart automation, and personalized insights—can help streamline operations, enhance decision-making, and improve both patient and customer experiences. By integrating AI, companies can increase efficiency, reduce errors, and stay competitive in a rapidly evolving market.</p>
            </details>
          </div>
        </div>
        <div className="faq-watermark">?</div>
      </section>

      <section id="contact">
        <div className="contact-container">
          <div className="contact-form-container">
            <h2>Get in Touch</h2>
            <form
  onSubmit={async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        alert('Email sent successfully!');
        form.reset();
      } else {
        alert('Failed to send email. Try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error sending email.');
    }
  }}
>
  <input type="text" name="name" placeholder="Name" required />
  <input type="email" name="email" placeholder="Email address" required />
  <textarea name="message" placeholder="Message" rows="4" required></textarea>
  <button type="submit">Submit</button>
</form>
          </div>
          <div className="contact-brace-container">
            <div className="quote">Got a vision..?<br />Let’s build the AI to match.</div>
            <div className="brace-align-row">
              <div className="brand-text">Enable<br />Intelligence</div>
              <img src={braceImg} alt="Brace" className="brace-image" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
