import { serve } from '@hono/node-server';
import {Hono} from 'hono';

import dotenv from 'dotenv';
dotenv.config();
//import slackAppUrl from './slack/slackapp-url.ts';

import slackAppHttp from './slack/slackapp-http.ts';

const port = Number(process.env.PORT!||3000);

const app = new Hono();
app.get('/', (c) => c.text('Hello Node.js!'));
app.post('/slack', async (c)=>{
    const cloneReq = c.req.raw.clone(); 
    const body = await cloneReq.json();
    const challenge = body['challenge'];
    await slackAppHttp(c.req.raw);
    return c.text(challenge, 200);
});
app.post('/slack/commands/hey-button' ,async (c)=>{
    const r = await slackAppHttp(c.req.raw);
    return r;
});

serve({
    fetch: app.fetch,
    port: port,
});
