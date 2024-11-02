const express = require('express'); // Use require
const fetch = require('node-fetch'); // Use require
const cors = require('cors'); // Use require

const app = express();
const PORT = 5000; // Change to your preferred port

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get('/api/lock_or_protect_builds', async (req, res) => {
  const { product_id, checkout_label } = req.query;

  try {
    const response = await fetch(`https://cmtools.csez.zohocorpin.com/api/v1/lock_or_protect_builds?product_id=${product_id}&checkout_label=${checkout_label}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': '4xtpMMBe34CHyPQH64zn', // Your token
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/lock_build', async (req, res) => {
    const { product_id, action, buildlog_id } = req.query; // Extract query parameters
    try {
      const response = await fetch(`https://cmtools.csez.zohocorpin.com/api/v1/lock_or_protect_builds?product_id=${product_id}&action=${action}&buildlog_id=${buildlog_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': '4xtpMMBe34CHyPQH64zn', // Your token
        },
      });
  
      const data = await response.json();
      
      // Check if the response from the external API is ok
      if (!response.ok) {
        return res.status(response.status).json(data); // Forward error response
      }
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.put('/api/unlock_build', async (req, res) => {
    const { product_id, buildlog_id, action,id } = req.body; // Extract parameters from the request body
    try {
      const response = await fetch(`https://cmtools.csez.zohocorpin.com/api/v1/lock_or_protect_builds/${id}?product_id=${product_id}&buildlog_id=${buildlog_id}&action=${action}`, {
        method: 'PUT', // Use PUT method
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': '4xtpMMBe34CHyPQH64zn', // Your token
        },
      });
  
      const data = await response.json();
    //   console.log(response);
      
      // Check if the response from the external API is ok
      if (!response.ok) {
        return res.status(response.status).json(data); // Forward error response
      }
      
      res.json(response);
    // console.log(data)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
