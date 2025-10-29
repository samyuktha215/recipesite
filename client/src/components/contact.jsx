import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './contact.css';
import BackButton from './BackButton';
import "../styles/global.css";

const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 500;

const sanitizeInput = (value) => {
  // Enkel HTML-sanerare – tar bort potentiell kod
  return value
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/script/gi, "")
    .trim();
};

const Contact = () => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const [user, setUser] = useState({
    Name: '',
    email: '',
    Subject: '',
    Message: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Begränsa längd beroende på fält
    let maxLength = MAX_MESSAGE_LENGTH;
    if (name === "Name") maxLength = MAX_NAME_LENGTH;
    if (name === "Subject") maxLength = MAX_SUBJECT_LENGTH;

    // Sanera & begränsa
    const safeValue = sanitizeInput(value.slice(0, maxLength));

    setUser(prev => ({ ...prev, [name]: safeValue }));
  };

  const preventShortcuts = (e) => {
    // Förhindra inklistring av kod via snabbkommandon
    if ((e.ctrlKey || e.metaKey) && ["v", "x", "a"].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      return loginWithRedirect();
    }

    const { Name, email, Subject, Message } = user;

    if (!Name.trim() || !email.trim() || !Subject.trim() || !Message.trim()) {
      setError("Alla fält måste fyllas i.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ Name, email, Subject, Message })
      });


      if (!response.ok) {
        throw new Error("Kunde inte skicka meddelandet");
      }

      setSuccess(true);
      setUser({ Name: '', email: '', Subject: '', Message: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Något gick fel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='contact'>
      <BackButton />
      <div className='container'>
        <div className='form'>
          <h2>Kontakta oss</h2>

          {!isAuthenticated && <p>Logga in för att skicka meddelanden</p>}
          {success && <p className="success">Meddelandet skickades!</p>}
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className='box'>
              <div className='label'><h3>Namn</h3></div>
              <div className='input'>
                <input
                  type='text'
                  placeholder='Namn'
                  name='Name'
                  value={user.Name}
                  onChange={handleChange}
                  onKeyDown={preventShortcuts}
                  maxLength={MAX_NAME_LENGTH}
                />
              </div>
            </div>

            <div className='box'>
              <div className='label'><h3>E-post</h3></div>
              <div className='input'>
                <input
                  type='email'
                  placeholder='E-post'
                  name='email'
                  value={user.email}
                  onChange={handleChange}
                  onKeyDown={preventShortcuts}
                />
              </div>
            </div>

            <div className='box'>
              <div className='label'><h3>Ämne</h3></div>
              <div className='input'>
                <input
                  type='text'
                  placeholder='Ämne'
                  name='Subject'
                  value={user.Subject}
                  onChange={handleChange}
                  onKeyDown={preventShortcuts}
                  maxLength={MAX_SUBJECT_LENGTH}
                />
              </div>
            </div>

            <div className='box'>
              <div className='label'><h3>Meddelande</h3></div>
              <textarea
                placeholder='Meddelande'
                name='Message'
                value={user.Message}
                onChange={handleChange}
                onKeyDown={preventShortcuts}
                maxLength={MAX_MESSAGE_LENGTH}
              />
            </div>

            <button type='submit' disabled={loading}>
              {loading ? "Skickar..." : "Skicka"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
