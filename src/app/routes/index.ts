import { Router } from 'express';

const route = Router();
route.get('/', (req, res) => {
  res.send({ message: true });
});
export default route;
