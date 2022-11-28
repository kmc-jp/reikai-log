import "dotenv/config";

import { App } from "@slack/bolt";

// ソケットモードを使う
// ポートは33555を使うが、環境変数PORTで変更可能
const app = new App({
  token: process.env["SLACK_BOT_TOKEN"]!,
  appToken: process.env["SLACK_APP_TOKEN"]!,
  signingSecret: process.env["SLACK_SIGNING_SECRET"]!,
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
    });
  } catch (e) {
    logger.error(e);
  }
});

(async () => {
  await app.start();
})();
