import express from 'express';
import fileUpload from 'express-fileupload';
import ProductRoute from './routes/product.route';
import errorMiddleware from './middlewares/error.middleware';
import path from "path";
import cors from 'cors';

const app = express();
app.use(cors({
    origin: '*',
}));

app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use(express.json());
app.use('/api/products', ProductRoute);
app.use(errorMiddleware);

export default app;
