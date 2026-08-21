import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasks.routes.js';
import usersRoutes from './routes/users.routes.js';
import loginRoutes from './routes/login.routes.js';
import { tratarErro } from './middlewares/error.middleware.js';
class App {
  server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.router();
    this.tratamentoDeErro();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  router() {
    this.server.use('/tasks', tasksRoutes);
    this.server.use('/users', usersRoutes);
    this.server.use('/login', loginRoutes);
  }
  tratamentoDeErro() {
    this.server.use(tratarErro);
  }
}

export default new App().server;
