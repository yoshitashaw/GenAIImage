import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();   //pulls the environment varialble from .env file

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // the frontend origin
    credentials: true,
  }));    //middleware

app.use(express.json({ limit: '50mb'}));

//adding the middleware
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async(req, res) =>{
    res.send('Hello From DALL-E!');
})

const startServer = async() =>{
    try{
       connectDB(process.env.MONGODB_URL); 
       app.listen(8080, ()=> console.log('Server has started on port http://localhost:8080'))
    }catch(error){
        console.log(error);
    }
}

startServer();