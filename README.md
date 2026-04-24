A sample (and very simple) Slack App, built by [slack-edge](https://github.com/slack-edge/slack-edge) and Typescript. 

# Before running
Configure following env values:
- `SLACK_SIGNING_SECRET`
- `SLACK_BOT_TOKEN`
- `SLACK_APP_TOKEN` (it's unnecessary if you use [Socket Mode](https://docs.slack.dev/apis/events-api/using-socket-mode))
  
You can obtain these values on your own Slack App config pages. Please refer [the guide](https://docs.slack.dev/tools/bolt-js/ja-jp/getting-started/) to create a Slack App

# Run app

## Socket Mode

Run the command:
```
node src/run-socket-mode.ts
```

## HTTP Mode

On a usual runtime, run the command - it starts a [Hono](https://hono.dev/) Node server:
```
node src/start-hono-server.ts
```

# Run on Cloudflare Workers

1. Fork the repo
2. Mainte `name` and `compatibility_date` fields on [wrangler.jsonc](./wrangler.jsonc) 
3. Create Cloudflare Worker app
4. Connect your repo

# Deploy to Heroku

1. Fork the repo
2. Create a Heroku app
3. Connect your repo and deploy

## Run Socket Mode on Heroku
Please run following commands:
- `heroku ps:scale web=0 -a [your heroku app name]`
- `heroku ps:scale socket=1 -a [your heroku app name]`
 
The Socket Mode needs Slack App to connect with Websocket when the app starts, so it doesn't need to expose web application port. On Heroku, a background process is adequate to run.

