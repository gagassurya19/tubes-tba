import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { sentence, structure } = req.body;

      // Make the request to the Flask API
      const flaskResponse = await fetch('https://unhappy-kaitlyn-suryalab-7e694481.koyeb.app/generate-fa', {
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

      // Convert the buffer to a Base64 string
      const base64Image = buffer.toString('base64');
      const mimeType = flaskResponse.headers.get('content-type');

      // Return the Base64 encoded image
      res.status(200).json({ image: `data:${mimeType};base64,${base64Image}` });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
