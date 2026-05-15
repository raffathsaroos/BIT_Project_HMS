import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/route.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

console.log("check URI", process.env.MONGO_URI);

app.use('/api/users', userRoute);

app.get('/', (req, res) => {
                                                res.send("Server is running");
});


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("Db connected !"))
   .catch((err) => console.log("DB connection error: ", err));

app.listen(PORT, () => {
                                           console.log(`server ss ${PORT}`);
});
