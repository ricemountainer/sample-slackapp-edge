import { serve } from '@hono/node-server';
import {Hono} from 'hono';

import dotenv from 'dotenv';
dotenv.config();
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
app.post('/slack/commands', async (c)=>{
    console.log('debug: /slack/commands was requested');
    const r = await slackAppHttp(c.req.raw);
    return r;
});
app.post('/slack/interactive' , async (c)=>{
    console.log('debug: /slack/interactive was requested');
    const r = await slackAppHttp(c.req.raw);
    return r;
});
serve({
    fetch: app.fetch,
    port: port,
});
