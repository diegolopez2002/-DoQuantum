import React, { useState } from 'react';
import Button from './Button';

const ComplexForm = ({ onSubmit, showSuccessMessage = false, successTimeout = 3000 }) => {
  const [isSuccess, setIsSuccess] = useState(showSuccessMessage);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataObj = Object.fromEntries(new FormData(event.target).entries());

    try {
      await onSubmit(formDataObj);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), successTimeout);
    } catch (error) {
      console.error('Error submitting complex form:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
      }}
    >
      <label
        style={{
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '80%',
          margin: '0 auto',
          textAlign: 'left',
        }}
      >
        *Name:
        <input
          type="text"
          name="name"
          placeholder="e.g. Jane Doe"
          required
          style={{
            fontSize: '1rem',
            width: 'calc(100% - 1rem - 2px)',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </label>

      <label
        style={{
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '80%',
          margin: '0 auto',
          textAlign: 'left',
        }}
      >
        *Email:
        <input
          type="email"
          name="email"
          placeholder="e.g. joeshmo@gmail.com"
          required
          style={{
            fontSize: '1rem',
            width: 'calc(100% - 1rem - 2px)',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </label>

      <label
        style={{
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '80%',
          margin: '0 auto',
          textAlign: 'left',
        }}
      >
        *Company Name:
        <input
          type="text"
          name="companyName"
          placeholder="e.g. Acme Corp"
          required
          style={{
            fontSize: '1rem',
            width: 'calc(100% - 1rem - 2px)',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </label>

      <label
        style={{
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '80%',
          margin: '0 auto',
          textAlign: 'left',
        }}
      >
        Message:
        <textarea
          name="message"
          placeholder="Write your message here..."
          style={{
            fontSize: '1rem',
            width: 'calc(100% - 1rem - 2px)',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'none',
            height: '100px',
          }}
        />
      </label>

      <Button label="Submit" style={{ width: '90%' }} type="submit" />
      {isSuccess && (
        <p style={{ color: '#4caf50', marginTop: '1rem' }}>
          Complex Form submitted successfully!
        </p>
      )}
    </form>
  );
};

export default ComplexForm;
