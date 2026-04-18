A sample (and very simple) Slack App, built by [slack-edge](https://github.com/slack-edge/slack-edge) and Typescript. The app can be run on a typical server runtime e.g. AWS EC2, Heroku... The Slack app communicates with Slack through WebSocket (Interective Mode).

# Before running:
Configure following env values:
- `SLACK_SIGNING_SECRET`
- `SLACK_BOT_TOKEN`
- `SLACK_APP_TOKEN`
  
You can obtain these values on your own Slack App config pages. Please refer [the guide](https://docs.slack.dev/tools/bolt-js/ja-jp/getting-started/) to create a Slack App

# Run on Heroku:
Please run following commands:
- `heroku ps:scale web=0 -a [your heroku app name]`
- `heroku ps:scale worker=1 -a [your heroku app name]`
 
The app doesn't need web process because the Interective Mode doesn't need the client app to publish the endpoint. Simply run worker process is adequate to communicate Slack!
