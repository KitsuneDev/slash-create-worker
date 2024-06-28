import { SlashCommand, CommandOptionType, type SlashCreator, type CommandContext } from 'slash-create/web';


const getCircularReplacer = () => {
  const seen = new WeakSet();
  // biome-ignore lint/suspicious/noExplicitAny: This is just a test prototype
  return (key:any, value:any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export default class BotCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'hello',
      description: 'Says hello to you.',
      options: []
    });
  }

  async run(ctx: CommandContext) {
    return `Hello! This are the keys provided by the context: \`\`\`
    ${JSON.stringify(ctx.serverContext, getCircularReplacer())}
    \`\`\``;
  }
}
