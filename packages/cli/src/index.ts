import { Command } from "commander";
import { sendTelegramMessage } from "@cwa-dev/mailkit-core";

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

    try {
      const result = await sendTelegramMessage({
        botToken: token,
        chatId,
        message,
      });

      console.log("Telegram sent message to chat", result.chatId);
      console.log("Message ID:", result.messageId);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      console.error(`Telegram error: ${detail}`);
      process.exit(1);
    }
  });

program.parseAsync(process.argv);
