import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { sentence, structure } = req.body;

      // Make the request to the Flask API
      const flaskResponse = await fetch('http://blind-stephine-suryalab-6fb5178e.koyeb.app/generate-fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentence, structure })
      });

      if (!flaskResponse.ok) {
        throw new Error(`Flask API error: ${flaskResponse.statusText}`);
      }

      // Ensure we get the binary data
      const buffer = await flaskResponse.buffer();

      // Save the image to a temporary location
      const imagePath = path.join(process.cwd(), 'public', 'finite_automaton.png');
      fs.writeFileSync(imagePath, buffer);

      // Return the path to the image
      res.status(200).json({ imagePath: '/finite_automaton.png' });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
