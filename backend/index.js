
import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import { PORT, mongoDBURL} from './config.js';
import { Book } from './models/bookModel.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

//testing bookmodel

// app.get("/booklist", async(req, res)=>{
//   const newBook = new Book({
//     title: "The Abundance Habits",
//     author: "TA Hamm",
//     publishYear: 2024
//   });

//   const sampleList= await newBook.save();
//   console.log(`sample was saved : ${sampleList}`);
//         res.send("successful testing!");

// });

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send(' MERN Stack Project');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Pinged Suuccessfully. Mongodb is activated');
    app.listen(PORT, () => {
      console.log(`listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });