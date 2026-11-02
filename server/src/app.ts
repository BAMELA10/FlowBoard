import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
import { resolve } from "path";
import { errorHandler, notFoundHandler } from "./middleware";
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import authRoutes from './router/auth.routes';
import boardRoutes from './router/board.routes';
import columnRoutes from './router/column.routes';
import cardRoutes from './router/card.routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "../../.env") });

const app = express();
export const server = createServer(app);
export const io = new Server(server);
export const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/boards', boardRoutes);
app.use('/columns', columnRoutes);
app.use('/cards', cardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
