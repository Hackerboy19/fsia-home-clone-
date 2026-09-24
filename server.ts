import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Server-side Gemini client initialization
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint to generate authentic winner testimonials with Gemini
app.post('/api/generate-testimonial', async (req, res) => {
  try {
    const { name, title, category, location, season } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        quote: `Winning ${title || 'the crown'} at Forever Star India was a defining milestone. Representing ${location || 'my city'} on the national stage transformed my confidence, voice, and leadership vision.`,
        story: `From local auditions to the grand Zee Studio coronation in Jaipur, FSIA offered unmatched grooming, stage presence coaching, and verifiable national recognition under Government of India Class 41 registered trademark.`,
        advice: "Believe in your authenticity and let your purpose guide every step on the national runway.",
        source: 'curated-editorial'
      });
    }

    const prompt = `You are the official editorial biographer for the Forever Star India Awards & Pageants (FSIA), India's premier Class 41 registered national pageantry organization.
Write an authentic, inspiring first-person winner's testimonial and short transformation story for:
- Winner Name: ${name || 'Contestant'}
- Title: ${title || 'National Winner'}
- Category: ${category || 'Forever Miss/Mrs India'}
- State/City: ${location || 'India'}
- Season: ${season || '2025'}

Tone: Dignified, eloquent, inspiring, celebrating women empowerment, stage confidence, and the journey from city auditions to the grand coronation at Zee Studio Jaipur.

Return JSON in this exact structure:
{
  "quote": "A 1-2 sentence impactful winning quotation in quotation marks",
  "story": "A 2-3 sentence transformation story describing the audition, grooming, and stage triumph",
  "advice": "A 1 sentence advice for aspiring delegates"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '';
    const parsed = JSON.parse(text);
    return res.json({
      quote: parsed.quote || `Representing ${location || 'my region'} with FSIA opened doors to national media and stage prestige.`,
      story: parsed.story || `The journey from audition to the Zee Studio finale was transformative.`,
      advice: parsed.advice || "Take the stage with pride and let your courage define you.",
      source: 'gemini-3.8-flash'
    });
  } catch (error: any) {
    console.error('Error generating testimonial with Gemini:', error);
    const { title, location } = req.body;
    return res.json({
      quote: `FSIA empowered me to take ownership of my journey and stand proudly as ${title || 'a national titleholder'}. The platform gave ${location ? location + ' and ' : ''}me a voice on India's biggest stage.`,
      story: `The rigorous mentoring and world-class Zee Studio stage set the standard for what true empowerment means.`,
      advice: "Never doubt your capacity to shine on the national stage.",
      source: 'curated-editorial'
    });
  }
});

// Setup Vite middleware in dev or static files in production
const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
