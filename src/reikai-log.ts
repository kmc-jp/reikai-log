import "dotenv/config";

import { App } from "@slack/bolt";

// ソケットモードを使う
// ポートは33555を使うが、環境変数PORTで変更可能

const slackAppToken = process.env["SLACK_APP_TOKEN"];
if (slackAppToken === undefined) {
  throw new Error("SLACK_APP_TOKEN is not set");
}

const slackBotToken = process.env["SLACK_BOT_TOKEN"];
if (slackBotToken === undefined) {
  throw new Error("SLACK_BOT_TOKEN is not set");
}

const slackSigningSecret = process.env["SLACK_SIGNING_SECRET"];
if (slackSigningSecret === undefined) {
  throw new Error("SLACK_SIGNING_SECRET is not set");
}

const app = new App({
  token: slackBotToken,
  appToken: slackAppToken,
  signingSecret: slackSigningSecret,
  socketMode: true,
  port: Number.parseInt(process.env["PORT"] ?? "") || 33555,
});

app.message(async ({ message, client, logger }) => {
  // `text`プロパティがないものはスルー
  if (!Object.hasOwn(message, "text")) {
    return;
  }

  // #log以外のメッセージはスルー
  if (message.channel !== "C1E0D7887") {
    return;
  }

  const messageText = (message as any).text;

  try {
    await client.chat.postMessage({
      channel: "C0321SKJM", // #active
      text: messageText,
      username: "例会ログ",
    });
  } catch (e) {
    logger.error(e);
  }
});

(async () => {
  await app.start();
})();
