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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      category: buttonLabel,
    }
    
    if (buttonLabel === "Contact Us") {
      formData.company = event.target.companyName.value; // Adjusted name to match "companyName" field
      formData.message = event.target.message.value;
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbxJ1QeSTIrHzvtVHCIeCYo7pHyZ4mesfOTRtOaUEv2KgOdVsUcr12y7ckMI3xuoUtEw/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setShowForm(false);
      setShowSuccessMessage(true);

      // Only revert back after 3 seconds if this is NOT the Corporations section
      if (title !== "Corporations" && title !== "UMD Professors") {
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  let displayedContent;
  if (showSuccessMessage) {
    // If we're showing success in the Corporations area, show a "Schedule a Call" button
    if (title === "Corporations" || title === "UMD Professors") {
      displayedContent = (
        <div>
          <p>Success! Your submission has been received. To learn more...</p>
          <Button label={"Schedule a Call"} onClick={() => window.open("https://calendly.com/evrenyk")} style={{width: '90%',}} />
        </div>
      );
    } 
    else {
      // For non-corporation/professor sections, just show the success message, revert after 3 seconds automatically
      displayedContent = <p>Success! Your submission has been received.</p>;
    }
  } else if (showForm) {
    const clonedForm = React.cloneElement(form, { onSubmit: handleFormSubmit });
    displayedContent = (
      <div>
        {clonedForm}
        <Button label="Back" onClick={handleShowContent} style={{width: '90%',}} />
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
    <div style={{
      background: showForm || showSuccessMessage ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.05)',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      marginBottom: '1rem',
    }}>
      <h3 style={{
        fontSize: '1.2rem',
        color: '#ffffff',
        marginBottom: '0.5rem',
      }}>{title}</h3>
      {displayedContent}
    </div>
  );
};

export default ReplaceableContent;