import dotenv from 'dotenv';
dotenv.config();
import slackapp from './slack/slackapp-socket.ts';
(async()=>{
    await slackapp();
})();