import express from 'express';
import type { Express } from 'express';
import cors from 'cors';

class App {
  server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }
}

export default new App().server;
