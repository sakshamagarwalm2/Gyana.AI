import Groq from 'groq-sdk';

export const configureGroq = () => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY_SECRET,
  });
  return groq;
};