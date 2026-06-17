import { v2 as cloudinary } from 'cloudinary';

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { data, mediaType, folder } = req.body || {};
  if (!data) return res.status(400).json({ error: 'data is verplicht.' });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Cloudinary credentials niet ingesteld.' });
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

  try {
    const result = await cloudinary.uploader.upload(
      `data:${mediaType || 'image/jpeg'};base64,${data}`,
      {
        folder: folder || 'lockout-bingo',
        public_id: `foto-${Date.now()}`,
        overwrite: true,
        resource_type: 'image',
      }
    );

    return res.status(200).json({
      url:      result.secure_url,
      publicId: result.public_id,
    });

  } catch (err) {
    console.error('Cloudinary upload fout:', err);
    return res.status(500).json({ error: 'Upload mislukt: ' + err.message });
  }
}
