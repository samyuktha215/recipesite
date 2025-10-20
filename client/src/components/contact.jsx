import React, { useState } from 'react'
import './contact.css'
import BackButton from './BackButton'

const Contact = () => {
    const [user, setUser] = useState(
        {
            Name: '', email: '', Subject: '', Message: ''
        }
    )
    let values, names
    const data = (e) => {
        values = e.target.value
        names = e.target.name
        setUser({ ...user, [names]: values })
    }
    const send = async (e) => {
        const { Name, email, Subject, Message } = user
        e.preventDefault()
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name, email, Subject, Message
            })

        }
        const send = await fetch('https://recipesite-ab146-default-rtdb.firebaseio.com/Message.json', option)
        if (send) {
            alert("Meddelande skickat")
        }
        else {
            alert("Fel inträffade vid sändning av meddelandet")
        }
    }
    return (
        <>
            <div className='contact'>
                <BackButton />
                <div className='container'>
                    <div className='form'>
                        <h2>Kontakta oss</h2>
                        <form method='POST'>
                            <div className='box'>
                                <div className='label'>
                                    <h4>Name</h4>
                                </div>
                                <div className='input'>
                                    <input type='text' placeholder='Namn' value={user.Name} name='Name' onChange={data}></input>
                                </div>
                            </div>
                            <div className='box'>
                                <div className='label'>
                                    <h4>E-mail</h4>
                                </div>
                                <div className='input'>
                                    <input type='email' placeholder='E-post' value={user.email} name='email' onChange={data}></input>
                                </div>
                            </div>
                            <div className='box'>
                                <div className='label'>
                                    <h4>Subject</h4>
                                </div>
                                <div className='input'>
                                    <input type='text' placeholder='Ämne' value={user.Subject} name='Subject' onChange={data}></input>
                                </div>
                            </div>
                            <div className='box'>
                                <div className='label'>
                                    <h4>Meddelande</h4>
                                </div>
                                <div className='input'>
                                </div>
                            </div>
                            <textarea placeholder='Meddelande' value={user.Message} name='Message' onChange={data}></textarea>

                            <button type='submit' onClick={send}>Skicka</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
