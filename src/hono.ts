import {Hono, type Context} from 'hono';
import { getRuntimeKey } from 'hono/adapter';

import slackAppHttp from './slack/slackapp-http.ts';

const app = new Hono();
app.get('/', (c) => c.text('Hello Node.js!'));
const runSlackApp = async (c:Context) => {
    const runtimeKey = getRuntimeKey();
    if (runtimeKey == 'workerd') {
        return slackAppHttp(c.req.raw, c.executionCtx)
    } else {
        return slackAppHttp(c.req.raw);
    }
}
app.post('/slack', async (c)=>{
    const cloneReq = c.req.raw.clone(); 
    const body = await cloneReq.json();
    const challenge = body['challenge'];
    if (challenge)  return c.text(challenge, 200); // for initial setup
    return await runSlackApp(c);
});
app.post('/slack/others', async (c)=>{
    // for Slash Command, Interactive Components, Shortcuts...
    return await runSlackApp(c);
});
export default app;

