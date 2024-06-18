import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { sentence, structure } = req.body;

      // Make the request to the Flask API
      const flaskResponse = await axios.post('http://blind-stephine-suryalab-6fb5178e.koyeb.app/generate-fa', {
        sentence,
        structure
      }, {
        responseType: 'arraybuffer' // Ensure we get the binary data
      });

      // Save the image to a temporary location
      const imagePath = path.join(process.cwd(), 'public', 'finite_automaton.png');
      fs.writeFileSync(imagePath, flaskResponse.data);

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
