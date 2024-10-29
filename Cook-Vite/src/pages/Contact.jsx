import React, { useState } from 'react';
import { TextInput, Textarea, Button } from '@mantine/core';
import axios from 'axios';

const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formValues);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting contact form', error);
    }
  };

  if (submitted) {
    return <p>Thank you for reaching out! We'll get back to you soon.</p>;
  }

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          placeholder="Your name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Email"
          placeholder="Your email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Message"
          placeholder="Your message"
          name="message"
          value={formValues.message}
          onChange={handleChange}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
      <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran">For Further Information Click Here</a>
    </div>
  );
};

export default Contact;

