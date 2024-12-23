import React, { useState } from 'react';
import Button from './Button';

const ReplaceableContent = ({ title, content, form, buttonLabel }) => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleShowForm = () => setShowForm(true);
  const handleShowContent = () => {
    setShowForm(false);
    setShowSuccessMessage(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const submissionData = { ...formData, category: buttonLabel };

      if (buttonLabel === 'Contact Us') {
        submissionData.company = formData.companyName; // Adjusted name to match the form field
        submissionData.message = formData.message;
      }

      await fetch(
        'https://script.google.com/macros/s/AKfycbxJ1QeSTIrHzvtVHCIeCYo7pHyZ4mesfOTRtOaUEv2KgOdVsUcr12y7ckMI3xuoUtEw/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData),
        }
      );

      setShowForm(false);
      setShowSuccessMessage(true);

      // Only revert back after 3 seconds if this is NOT the Corporations or Professors section
      if (title !== 'Corporations' && title !== 'UMD Professors') {
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  let displayedContent;
  if (showSuccessMessage) {
    // If we're showing success for Corporations or Professors, show a "Schedule a Call" button
    if (title === 'Corporations' || title === 'UMD Professors') {
      displayedContent = (
        <div>
          <p>Success! Your submission has been received. To learn more...</p>
          <Button
            label="Schedule a Call"
            onClick={() => window.open('https://calendly.com/evrenyk')}
            style={{ width: '90%' }}
          />
        </div>
      );
    } else {
      // For other sections, just show the success message, revert after 3 seconds automatically
      displayedContent = <p>Success! Your submission has been received.</p>;
    }
  } else if (showForm) {
    const clonedForm = React.cloneElement(form, {
      onSubmit: async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target).entries());
        await handleFormSubmit(formData);
      },
    });
    displayedContent = (
      <div>
        {clonedForm}
        <Button label="Back" onClick={handleShowContent} style={{ width: '90%' }} />
      </div>
    );
  } else {
    displayedContent = (
      <div>
        {content}
        <Button label={buttonLabel} onClick={handleShowForm} />
      </div>
    );
  }

  return (
    <div
      style={{
        background: showForm || showSuccessMessage ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.05)',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        marginBottom: '1rem',
      }}
    >
      <h3
        style={{
          fontSize: '1.2rem',
          color: '#ffffff',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>
      {displayedContent}
    </div>
  );
};

export default ReplaceableContent;
