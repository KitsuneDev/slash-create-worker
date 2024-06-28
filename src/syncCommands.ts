import { makeCreator } from ".";

const creator = makeCreator(process.env);
await creator.syncCommands()

