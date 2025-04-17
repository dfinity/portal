import { Actor, HttpAgent } from "@dfinity/agent";
import type { _SERVICE } from "../../../../search/src/declarations/search/search.did";
import { idlFactory } from "./idlFactory.js";

export const createActor = (canisterId: string) => {
  const agent = new HttpAgent({
    host: `https://${canisterId}.ic0.app`,
  });

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor<_SERVICE>(idlFactory, {
    agent,
    canisterId,
  });
};
