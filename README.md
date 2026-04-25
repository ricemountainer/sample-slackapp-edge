A sample (and very simple) Slack App, built by [slack-edge](https://github.com/slack-edge/slack-edge) and Typescript. 

# Before running
Configure following env values:
- `SLACK_SIGNING_SECRET`
- `SLACK_BOT_TOKEN`
- `SLACK_APP_TOKEN` (it's unnecessary if you use [Socket Mode](https://docs.slack.dev/apis/events-api/using-socket-mode))
  
You can obtain these values on your own Slack App config pages. Please refer [the guide](https://docs.slack.dev/tools/bolt-js/ja-jp/getting-started/) to create a Slack App

# Run locally

## Socket Mode

Run the command:
```
node src/run-socket-mode.ts
```

## HTTP Mode

Run the command:
```
node src/start-hono-server.ts
```

To test HTTP Mode on local, publish your web app (you can use [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/), [Ngrok](https://ngrok.com/), etc) and configure Slack App to use the URL.

### Slack App Configuration on HTTP Mode

On Slack App page (visit https://api.slack.com/apps and select app), you need to configure the followings:
1. Event Subscriptions - Request URL 
2. Slach Command - click the penceil icon that is located on each Slach Commands and you can see "Request URL" field
3. Interactive &amp; Shortcuts - Interactivity - Request URL
4. Interactive &amp; Shortcuts - Select Menus - Options Load URL

# Run on Cloudflare Workers

HTTP Mode only.

1. Fork the repo
2. Mainte `name` and `compatibility_date` fields on [wrangler.jsonc](./wrangler.jsonc) 
3. Create Cloudflare Worker app
4. Connect your repo

# Run on Heroku

Socket Mode and HTTP Mode are available.

1. Fork the repo
2. Create a Heroku app
3. Connect your repo and deploy

## Run Socket Mode on Heroku

Please run following commands:
```
heroku ps:scale socket=1 -a [your heroku app name]
```
