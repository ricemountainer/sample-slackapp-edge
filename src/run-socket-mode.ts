import dotenv from 'dotenv';
dotenv.config();
import slackapp from './slackapp.ts';
(async()=>{
    await slackapp();
})();