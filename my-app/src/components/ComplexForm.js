import React, { useState } from 'react';
import Button from './Button'; // Import your custom Button component

// ComplexForm component takes onSubmit, showSuccessMessage, and successTimeout as props
const ComplexForm = ({ onSubmit, showSuccessMessage = false, successTimeout = 3000 }) => {
  const [isSuccess, setIsSuccess] = useState(showSuccessMessage); // State to track form submission success

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Create a FormData object from the form and convert it to a plain JavaScript object
    // Object.fromEntries converts the key/value pairs of FormData to a regular object
    const formDataObj = Object.fromEntries(new FormData(event.target).entries());

    try {
      // Call the onSubmit function (passed as a prop) with the form data object
      await onSubmit(formDataObj);
      setIsSuccess(true); // Set the success state to true to display the success message
      setTimeout(() => setIsSuccess(false), successTimeout); // Hide the success message after a delay
    } catch (error) {
      console.error('Error submitting complex form:', error); // Log any errors to the console
      // In a real application, you would want to handle errors more gracefully,
      // e.g., display an error message to the user.
    }
  };

  return (
    <form
      onSubmit={handleSubmit} // Attach the handleSubmit function to the form's onSubmit event
      style={{
        display: 'flex',
        flexDirection: 'column', // Arrange form elements vertically
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',   // Center content horizontally
        gap: '1rem',            // Add spacing between form elements
        width: '100%',          // Make the form take up the full width of its parent container
      }}
    >
      {/* Name input field */}
      <label
        style={{
          color: '#ffffff', // White text color
          display: 'flex',
          flexDirection: 'column', // Label on top of input
          alignItems: 'flex-start', // Align label to the left
          width: '80%',          // Set width for label and input
          margin: '0 auto',       // Center label and input horizontally
          textAlign: 'left',      // Align text within the label to the left
        }}
      >
        *Name: {/* Required field indicator */}
        <input
          type="text"
          name="name" // The 'name' attribute is crucial for FormData to work correctly
          placeholder="e.g. Jane Doe"
          required // Make the field required
          style={{
            fontSize: '1rem',
            width: 'calc(100% - 1rem - 2px)', // Adjust width for padding and border
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc', // Light gray border
          }}
        />
      </label>

      {/* Email input field (similar structure to Name input) */}
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

      {/* Company Name input field (similar structure) */}
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

      {/* Message textarea */}
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
            resize: 'none', // Prevent resizing
            height: '100px', // Set a fixed height
          }}
        />
      </label>

      {/* Submit button */}
      <Button label="Submit" style={{ width: '90%' }} type="submit" />

      {/* Success message (displayed conditionally) */}
      {isSuccess && (
        <p style={{ color: '#4caf50', marginTop: '1rem' }}>
          Complex Form submitted successfully!
        </p>
      )}
    </form>
  );
};

export default ComplexForm;