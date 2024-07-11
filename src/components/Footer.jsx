import React, { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    // Ensure the Google Translate script is loaded and initialized
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
  }, []);

  return (
    <div className="footer">
      <div className="footer-left">
        <h2>Mann Ko Bhawana</h2>
        <p>
          If you or someone else is in a mental health crisis or danger, do not
          use this site. Please seek immediate medical help for any
          life-threatening situation or thoughts of self-harm.
        </p>
        <div id="google_translate_element"></div>
        <div className="socials">
          <a href="#" className="social-icon">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="footer-right">
        <h2>Message Us</h2>
        <form className="contact-form">
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
      <style jsx>{`
        /* src/components/Footer.css */

        .footer {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          background-color: #cfe9fc;
          border-radius: 15px;
          color: #333;
        }

        .footer-left,
        .footer-right {
          flex: 1;
          padding: 20px;
        }

        .footer-left {
          border-right: 1px solid #aaa;
        }

        .footer-left h2,
        .footer-right h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .footer-left p {
          margin-bottom: 10px;
          line-height: 1.5;
        }

        #google_translate_element {
          margin-top: 10px;
        }

        .socials {
          margin-top: 10px;
        }

        .social-icon {
          margin-right: 10px;
          font-size: 24px;
          color: #333;
          text-decoration: none;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #aaa;
          border-radius: 5px;
        }

        .contact-form button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .contact-form button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Footer;
