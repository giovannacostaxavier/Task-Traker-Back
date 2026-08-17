import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasks.routes.js';

class App {
  server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.router();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  router() {
    this.server.use('/tasks', tasksRoutes);
  }
}

export default new App().server;
