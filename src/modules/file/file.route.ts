import { Router } from 'express';
import { fileControllers } from './file.controller';
import { upload } from './file.utils';
// import auth from '../../middlewares/auth';
// import { upload } from '../../app';

const route = Router();
route.post('/', upload.single('data'), fileControllers.uploadFile);
route.get('/user/:id', fileControllers.getUserAllFile);
route.get('/', fileControllers.getAllFile);
route.put('/:id', fileControllers.updateFile);
export const fileRoute = route;
