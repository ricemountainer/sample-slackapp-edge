import {Hono} from 'hono';

import slackAppHttp from './slack/slackapp-http.ts';

const app = new Hono();
app.get('/', (c) => c.text('Hello Node.js!'));
app.post('/slack', async (c)=>{
    const cloneReq = c.req.raw.clone(); 
    const body = await cloneReq.json();
    const challenge = body['challenge'];
    //if (challenge)  return c.text(challenge, 200);
    //if(c.executionCtx.waitUntil) c.executionCtx.waitUntil(slackAppHttp(c.req.raw));
    //return c.text('ok',200);
    return await c.text(challenge, 200);
});
app.post('/slack/commands', async (c)=>{
    // for Slash Command
    const r = await slackAppHttp(c.req.raw);
    return r;
});
app.post('/slack/interactive' , async (c)=>{
    // for Interactive Component & Shortcuts
    const r = await slackAppHttp(c.req.raw);
    return r;
});
export default app;

