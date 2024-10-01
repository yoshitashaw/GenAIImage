import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai'; // Import the new OpenAI package

dotenv.config();
//console.log('HELLO from Yoshita!');
const router = express.Router();

// Initialize OpenAI with the API key from the environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to check if the DALL-E endpoint is working
router.route('/').get((req, res) => {
  res.send('Hello from DALL-E!');
});

// POST route for generating an image using DALL-E
router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Generate the image from the prompt
    const aiResponse = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: '512x512',
    });

    // Log the entire response from OpenAI
    console.log('AI Response:', aiResponse);

    // Extract the base64 image from the response
    const imageUrl = aiResponse.data[0].url;

    // Log the base64 image to check if it's correctly extracted
    console.log('Generated Image:', imageUrl);

    // Send the base64 image back to the client
    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    // Log the error for debugging
    console.error('Error generating image:', error);

    // Respond with a 500 error status code and error message
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;







// import express from 'express';
// import * as dotenv from 'dotenv';
// import OpenAI from 'openai'; // Import the new OpenAI package

// dotenv.config();

// const router = express.Router();

// // Initialize OpenAI with the API key from the environment
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Route to check if the DALL-E endpoint is working
// router.route('/').get((req, res) => {
//   res.send('Hello from DALL-E!');
// });

// // POST route for generating an image using DALL-E
// router.post('/', async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     // Use the 'images.generate' method directly from the 'openai' instance
//     const aiResponse = await openai.images.generate({
//       prompt: prompt,
//       n: 1,
//       size: '1024x1024',
//     });

//     // Extract the base64 image from the response
//     const image = aiResponse.data[0].image;
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error('Error generating image:', error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// export default router;




// import express from 'express';
// import * as dotenv from 'dotenv';
// import OpenAI from 'openai';
// //import { Configuration, OpenAIApi } from 'openai';

// dotenv.config();

// const router = express.Router();

// // const configuration = new ({
// //     apiKey: process.env.OPENAI_API_KEY, 
// // })

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// router.route('/').get((req,res) =>{
//     res.send('Hello from DALL-E!');
// });

// router.post('/', async (req, res) => {
//     try {
//       const { prompt } = req.body;
  
//       const openai = new OpenAIApi(new Configuration({
//         apiKey: process.env.OPENAI_API_KEY,
//       }));
  
//       const aiResponse = await openai.createImage({
//         prompt: prompt,
//         n: 1,
//         size: '1024x1024',
//         response_format: 'b64_json',
//       });
  
//       const image = aiResponse.data.data[0].b64_json;
//       res.status(200).json({ photo: image });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
  
//   export default router;