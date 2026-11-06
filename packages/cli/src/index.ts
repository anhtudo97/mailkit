import { Command } from "commander";

type TelegramResponse = {
  ok: boolean;
  result?: {
    message_id?: number;
  };
  description?: string;
};

const program = new Command();

program
  .name("sendkit")
  .description("SendKit tutorial CLI")
  .command("telegram")
  .description("Send a Telegram message")
  .argument("<chatId>", "Telegram chat ID")
  .argument("<message>", "Message text to send")
  .action(async (chatId: string, message: string) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      console.error("Missing TELEGRAM_BOT_TOKEN");
      process.exit(1);
    }

    if (!chatId) {
      console.error("Missing chatId");
      process.exit(1);
    }

    if (!message) {
      console.error("Missing message");
      process.exit(1);
    }

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });
    const data: TelegramResponse = await response.json();
    if (!response.ok || !data.ok) {
      const detail = data.description ?? response.statusText;
      console.error(`Error: ${detail}`);
      process.exit(1);
    }

    const messageId = data.result?.message_id;

    console.log(`Message sent with ID: ${messageId}`);

    if (messageId) console.log("Telegram sent", messageId);
  });

program.parseAsync(process.argv);
