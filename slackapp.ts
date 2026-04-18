import {SlackApp , fromSocketModeToRequest, fromResponseToSocketModePayload} from 'slack-edge';
import { SocketModeClient } from 'slack-edge';

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

  app.message('hello',
    async (_req) => {
      console.log(`debug: ${JSON.stringify(_req.context)}`);
      const msg = `Hey there <@${_req.context.userId || ''}>! from slackapp-egde`;
      await _req.context.say({text:msg});
    },
  );

  app.command('/hey-button', 
    async (req) =>{
      await req.context.respond({
        response_type: 'ephemeral',
        text: 'click the button!',
        blocks: [
          {
            type: 'section',
            block_id: 'button',
            text: {type: 'mrkdwn' , text: 'click the button!'},
            accessory: {
              type: 'button',
              action_id: 'button-action',
              text: { type: 'plain_text' , text: 'button'},
              value: 'hidden value'
            }
          }
        ]
      })
    }
  );

  app.action('button-action' , 
    async (req) => {},
    async (req) => {
      if(req.context.respond) {
        await req.context.respond({text: 'ack you clicked the button!'});
      } else {
        await req.context.client.views.open({
          trigger_id: req.payload.trigger_id,
          view: {
            type: 'modal',
            callback_id: 'test-modal',
            title: {type: 'plain_text' , text: 'clicked button'},
            close: {type: 'plain_text' , text: 'close'},
            blocks: [
              {
                type: 'section',
                text: {type:'plain_text' , text: "you've clicked the button!"}
              }
            ]
          }
        })        
      }
    }
  );

  // Start a Socket Mode client
  const socketModeClient = new SocketModeClient(app);
  await socketModeClient.connect();
  console.log('connected!');
}
