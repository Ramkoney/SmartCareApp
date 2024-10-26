import React, { useState } from 'react';
import validateSAID from './validateSAID';

const SAIDValidator = () => {
  const [idNumber, setIdNumber] = useState('');
  const [validationResult, setValidationResult] = useState({ valid: null, message: '' });

  const handleInputChange = (e) => {
    setIdNumber(e.target.value);
  };

  const handleValidate = () => {
    const result = validateSAID(idNumber);
    setValidationResult(result);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>SA ID Validator</h2>
      <input
        type="text"
        value={idNumber}
        onChange={handleInputChange}
        placeholder="Enter 13-digit SA ID"
        style={{ padding: '10px', fontSize: '16px', width: '100%', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <button onClick={handleValidate} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Validate
      </button>
      {validationResult.valid !== null && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3 style={{ color: validationResult.valid ? 'green' : 'red' }}>{validationResult.message}</h3>
          {validationResult.valid && (
            <div style={{ backgroundColor: '#e7f3fe', border: '1px solid #bee3f8', borderRadius: '4px', padding: '10px' }}>
              <ul>
                <li><strong>Gender:</strong> {validationResult.details.gender}</li>
                <li><strong>Age:</strong> {validationResult.details.age}</li>
                <li><strong>Citizenship:</strong> {validationResult.details.citizenship}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SAIDValidator;
