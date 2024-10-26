import React, { useState } from 'react';
import axios from 'axios';
import { Button, MenuItem, Select, Typography } from '@mui/material';

const VoiceTranslator = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('es');
  const [speechRecognition, setSpeechRecognition] = useState(null);

  const startListening = () => {
    if (!speechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = async (event) => {
        const inputText = event.results[0][0].transcript;
        await translateText(inputText);
      };

      recognition.onend = () => {
        console.log('Speech recognition service has stopped.');
      };

      setSpeechRecognition(recognition);
    }

    speechRecognition.start();
  };

  const translateText = async (inputText) => {
    try {
      const response = await axios.post(
        'https://api.gemini.com/translate', 
        {
          text: inputText,
          target: targetLang,
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`, 
            'Content-Type': 'application/json',
          },
        }
      );
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error translating text.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Voice Translator</Typography>

      <Select
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        style={{ marginBottom: '20px' }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Spanish</MenuItem>
        <MenuItem value="fr">French</MenuItem>
        
      </Select>

      <Button variant="contained" color="primary" onClick={startListening}>
        Start Voice Input
      </Button>

      <Typography variant="h6" style={{ marginTop: '20px' }}>Translation:</Typography>
      <Typography variant="body1" style={{ marginTop: '10px', color: 'green' }}>{translatedText}</Typography>
    </div>
  );
};

export default VoiceTranslator;

