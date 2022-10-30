import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/rutas.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5080;
app.get('/', (req, res) => res.send('HELLO WORLD'));

app.use(routes);

app.use((req,res)=>{
    res.status(404).send({"status":"Error 404"}) 
})

app.listen(PORT,()=>console.log(`API corriendo en el puerto ... ${PORT}`));

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Mongo'))
    .catch((error) => console.error(error));