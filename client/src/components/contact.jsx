import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './contact.css';
import BackButton from './BackButton';
import "../styles/global.css";

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
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            return loginWithRedirect();
        }

        const { Name, email, Subject, Message } = user;

        // Enkel validering
        if (!Name.trim() || !email.trim() || !Subject.trim() || !Message.trim()) {
            setError("Alla fält måste fyllas i.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = await getAccessTokenSilently();

            const response = await fetch("http://localhost:3000/contact", {
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
                    {!isAuthenticated && (
                        <p>Logga in för att skicka meddelanden</p>
                    )}
                    {success && <p className="success">Meddelandet skickades!</p>}
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className='box'>
                            <div className='label'><h3>Name</h3></div>
                            <div className='input'>
                                <input type='text' placeholder='Namn' name='Name' value={user.Name} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='box'>
                            <div className='label'><h3>E-mail</h3></div>
                            <div className='input'>
                                <input type='email' placeholder='E-post' name='email' value={user.email} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='box'>
                            <div className='label'><h3>Subject</h3></div>
                            <div className='input'>
                                <input type='text' placeholder='Ämne' name='Subject' value={user.Subject} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='box'>
                            <div className='label'><h3>Meddelande</h3></div>
                            <textarea placeholder='Meddelande' name='Message' value={user.Message} onChange={handleChange}></textarea>
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
