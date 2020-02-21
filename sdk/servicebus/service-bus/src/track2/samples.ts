import {
  SessionConnections,
  Message,
  ContextWithSettlement as ContextWithSettlementMethods,
  UselessEmptyContextThatMaybeShouldBeRemoved
} from "./models";
import { ReceiverClient } from "./receiverClient";
import { env } from "process";
import * as dotenv from "dotenv";

dotenv.config({
  path: "..\\..\\..\\..\\..\\..\\..\\..\\dev\\temp\\.env"
});

/**
 * @ignore
 * @internal
 */
export async function receiveMessagesUsingPeekLock() {
  const log = (...args: any[]) => console.log(`receiveMessagesUsingPeekLock:`, ...args);
  log(`Listening, peeklock for queue`);
  const receiverClient = new ReceiverClient(
    env[`queue.withoutSessions.connectionString`]!,
    "PeekLock"
  );

  receiverClient.streamMessages({
    async processMessage(message: Message, context: ContextWithSettlementMethods): Promise<void> {
      log(`Message body: ${message.body}`);
      await context.complete(message);
    },
    async processError(err: Error): Promise<void> {
      log(`Error thrown: ${err}`);
    }
  });
}

export async function receiveMessagesUsingReceiveAndDeleteAndSessions() {
  const log = (...args: any[]) =>
    console.log(`receiveMessagesUsingReceiveAndDeleteAndSessions:`, ...args);
  log(`Listening, receiveAndDelete for queue with session ID \`helloworld\``);
  const sessionConnections = new SessionConnections();

  const receiverClient = new ReceiverClient(
    env[`queue.withSessions.connectionString`]!,
    {
      id: "helloworld",
      // the thinking is that users will (unlike queues or topics) open up
      // lots of individual sessions, so keeping track of and sharing connections
      // is a way to prevent a possible port/connection explosion.
      connections: sessionConnections
    },
    "ReceiveAndDelete"
  );

  // note that this method is now available - only shows up in auto-complete
  // if you construct this object with a session.
  await receiverClient.renewSessionLock();

  receiverClient.streamMessages({
    async processMessage(
      message: Message,
      context: UselessEmptyContextThatMaybeShouldBeRemoved
    ): Promise<void> {
      // process message here - it's basically a ServiceBusMessage minus any settlement related methods
      log(message.body);
    },
    async processError(err: Error): Promise<void> {
      log(`Error thrown: ${err}`);
    }
  });
}

async function runAll() {
  const promises = [
    receiveMessagesUsingPeekLock(),
    receiveMessagesUsingReceiveAndDeleteAndSessions()
  ];

  await Promise.all(promises);
}

runAll();
