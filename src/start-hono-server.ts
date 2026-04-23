import { serve } from '@hono/node-server';
import app from './hono.ts';
import dotenv from 'dotenv';
dotenv.config();
const port = Number(process.env.PORT!||3000);

serve({
    fetch: app.fetch,
    port: port,
});
