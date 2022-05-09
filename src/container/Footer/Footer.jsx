import React, { useState} from 'react'

import { images } from "../../constants";
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from "../../client";

import "./Footer.scss";

const Footer = () => {

  const [formData, setFormData] = useState({name: '', email: '', message: ''});
  const [isFormSubmitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  const {name, email, message} = formData;


  function handleChangeInput (event){
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value});
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setSubmitted(true);
      })
  }


  return (
    <>
      <h2 className='head-text'>Breathe & Reach out to me</h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href='mailto:designsugo@gmail.com' className='p-text'>designsugo@gmail.com</a>
        </div>

        <div className='app__footer-card'>
          <img src={images.mobile} alt="email" />
          <a href='tel: +7 (930) 962-94-18 ' className='p-text'>+7 (930) 962-94-18</a>
        </div>
        {!isFormSubmitted ?
          <div className='app__footer-form app__flex'>
            <div className='app__flex'>
              <input className='p-text' type='text' name='name' placeholder='Your Name' value={name} onChange={handleChangeInput}></input>
            </div>
            <div className='app__flex'>
              <input className='p-text' type='email' name='email' placeholder='Your email' value={email} onChange={handleChangeInput}></input>
            </div>
            <div>
              <textarea
                className='p-text'
                placeholder='Your Message'
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <button
              className='p-text'
              type='button'
              onClick={handleSubmit}
            > 
              {loading? 'Sending': 'Send Message'}
            </button>
            
          </div>
          :
            <div>
              <h3 className='head-text'>Thank you for getting in touch</h3>
            </div>  
          }
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
)