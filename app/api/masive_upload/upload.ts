import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Song {
  title: string;
  autor: string;
  url: string;
  // Añade otros campos según sea necesario
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { songs } = req.body;

    if (!Array.isArray(songs)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    try {
      const { data, error } = await supabase.from('songs').insert(songs);

      if (error) {
        throw error;
      }

      res.status(200).json({ message: 'Songs uploaded successfully', data });
    } catch (error) {
      console.error('Error uploading songs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
