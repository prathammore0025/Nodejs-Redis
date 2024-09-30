const express = require('express');

module.exports = (client) => {
  const router = express.Router();

  // Route to set a key-value in Redis
  router.post('/store', async (req, res) => {
    const { key, value } = req.body;
    try {
      await client.set(key, value);
      res.status(200).send(`Key "${key}" set with value "${value}"`);
    } catch (err) {
      res.status(500).send('Error storing data in Redis');
    }
  });

  // Route to get a value by key from Redis
  router.get('/get/:key', async (req, res) => {
    const { key } = req.params;
    try {
      const value = await client.get(key);
      if (value) {
        res.status(200).send(`Value for key "${key}" is "${value}"`);
      } else {
        res.status(404).send('Key not found');
      }
    } catch (err) {
      res.status(500).send('Error retrieving data from Redis');
    }
  });

  return router;
};

