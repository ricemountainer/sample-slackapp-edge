import {SlackApp, SocketModeClient} from 'slack-edge';
import listeners from './listeners.ts';

export default async () => {
  const app = new SlackApp({
    env: {
      SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET!,
      SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
      SLACK_APP_TOKEN: process.env.SLACK_APP_TOKEN,
      SLACK_LOGGING_LEVEL: "DEBUG",
    },
    socketMode: true,
  });

  // add listeners
  listeners.listeners(app);

  // Start a Socket Mode client
  const socketModeClient = new SocketModeClient(app);
  await socketModeClient.connect();
  console.log('connected! - socket mode');
};
