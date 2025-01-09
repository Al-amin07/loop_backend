import { Router } from 'express';
import { textControllers } from './text.controller';

const route = Router();

route.post('/', textControllers.createText);
route.get('/', textControllers.getAllText);
route.patch('/:id', textControllers.updateText);

export const textRoute = route;
