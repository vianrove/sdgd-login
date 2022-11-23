import express from 'express';
import { read } from '../db/mysql.js'
import { viewAll, createClient, updateClient, deleteUser, login } from '../db/methods.js'

const routes = express.Router();

routes.get('/view',viewAll);

routes.post('/login',login);

routes.post('/signUp',createClient);

routes.delete('/:id',deleteUser);

routes.put('/:id',updateClient);

export default routes;
