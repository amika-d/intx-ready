import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/trainer-selection'); // Replace with your TrainerSelection route
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Payment Cancelled</h1>
        <p style={styles.paragraph}>Your payment was cancelled or failed.</p>
        <p style={styles.paragraph}>Please try again or contact support.</p>
        <button onClick={handleGoBack} style={styles.button}>
          Go Back
        </button>
        <div style={styles.footer}>
          <p style={styles.footerText}>Need assistance? Contact us at info.intxapp@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

// CSS Styles (Inline)
const styles = {
  container: {
    width: '102%',
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    fontFamily: 'Sora, sans-serif',
    marginTop: '-10px',
    position: 'fixed',
    marginLeft: '-10px',
  },
  card: {
    marginTop: '-100px',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '80%',
    maxWidth: '600px',
    transition: 'transform 0.3s ease-in-out',
  },
  heading: {
    marginTop:'10px',
    color: '#dc3545', // Red color for cancellation
    marginBottom: '20px',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  paragraph: {
    color: '#555',
    fontSize: '1.1rem',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  button: {
    border: '2px solid #EAC42D',
    display: 'inline-block',
    padding: '15px 25px',
    marginTop: '20px',
    backgroundColor: 'rgb(255, 255, 255)',
    color: '#000',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    borderRadius: '40px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#c9a32a',
  },
  footer: {
    marginTop: '30px',
    borderTop: '1px solid #ddd',
    paddingTop: '20px',
  },
  footerText: {
    color: '#777',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
};

export default Cancel;