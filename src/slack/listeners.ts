import type {SlackApp, } from 'slack-edge';

const listeners = (app: SlackApp<any>) => {
  app.message('hello',
    async (req) => {
      const msg = `Hey there <@${req.context.userId || ''}>! from slackapp-egde`;
      const r = await req.context.say({text:msg});
    },
  );

  app.command('/hey' , 
    async (req) => {
        await req.context.respond({
            response_type: 'ephemeral',
            text: "what's up?"
        });
    }
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
};

export default {listeners};
