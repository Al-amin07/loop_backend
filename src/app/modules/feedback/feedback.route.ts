import { Router } from 'express';
import { feedbackControlles } from './feedback.controller';

const route = Router();

route.post('/', feedbackControlles.createFeedback);
route.get('/', feedbackControlles.getAllFeedback);

export const feedbackRoute = route;
