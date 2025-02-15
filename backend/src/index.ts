import express, { Request, Response } from 'express';
import connectDB from './config/db.config';
import userRouter from './routes/userRoutes';
import codeRouter from './routes/codeRouter';
import cors from 'cors';
const app = express();
const port = 3000;

connectDB(); // Connect to MongoDB
app.use(express.json()); 
app.use(cors());
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.use('/api/code', codeRouter);

app.use('/api/user', userRouter);
app.listen(port, () => {
    console.log(`Server is started and is listening on port ${port}`);
});
