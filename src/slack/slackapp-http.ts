import {SlackApp,type ExecutionContext } from 'slack-edge';
import listeners from './listeners.ts';

export default async (request:Request,context?:ExecutionContext) => {
    const app = new SlackApp({
        env: {
            SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET!,
            SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
            //SLACK_APP_TOKEN: process.env.SLACK_APP_TOKEN,
            SLACK_LOGGING_LEVEL: "DEBUG",
        }
    });
  
  // add listeners
  listeners.listeners(app);

  return app.run(request,context);

}