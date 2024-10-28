import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const twitterApiKey = process.env.TWITTER_API_KEY;
const twitterApiSecret = process.env.TWITTER_API_SECRET;

// Endpoint to generate OAuth 2.0 Bearer Token
router.post('/twitter/token', async (req, res) => {
  const credentials = Buffer.from(`${twitterApiKey}:${twitterApiSecret}`).toString('base64');

  try {
    const response = await axios.post(
      'https://api.twitter.com/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }
    );

    res.status(200).json({ token: response.data.access_token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get token' });
  }
});

// Example endpoint to post a tweet using the token
router.post('/twitter/tweet', async (req, res) => {
  const { token, tweetContent } = req.body;

  try {
    const response = await axios.post(
      'https://api.twitter.com/2/tweets',
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
    res.status(500).json({ error: 'Failed to post tweet' });
  }
});

export default router;
