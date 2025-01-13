import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './config';
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(config.port, () => {
      console.log('Server running at port :', config.port);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', () => {
  process.exit(1);
});
