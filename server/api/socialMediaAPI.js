import express from 'express';
import axios from 'axios';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

router.use(limiter);

const TWITTER_API_URL = 'https://api.twitter.com';

const getTwitterCredentials = () => {
  const credentials = Buffer.from(
    `${process.env.TWITTER_API_KEY}:${process.env.TWITTER_API_SECRET}`
  ).toString('base64');
  return credentials;
};

router.post('/twitter/token', async (req, res) => {
  try {
    const response = await axios.post(
      `${TWITTER_API_URL}/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${getTwitterCredentials()}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }
    );
    res.status(200).json({ token: response.data.access_token });
  } catch (error) {
    res.status(500).json({ error: 'Token generation failed', details: error.message });
  }
});

router.post('/twitter/tweet', async (req, res) => {
  const { token, tweetContent } = req.body;

  if (!token || !tweetContent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await axios.post(
      `${TWITTER_API_URL}/2/tweets`,
      { text: tweetContent },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Tweet posting failed', details: error.message });
  }
});

export default router;

