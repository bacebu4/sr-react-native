import { v4 as uuidv4 } from "uuid";
import * as Random from "expo-random";

export function uuidExpo(): string {
  const randomBytes = Random.getRandomBytes(256);
  let poolPtr = 0;
  return uuidv4({ random: randomBytes.slice(poolPtr, (poolPtr += 16)) });
}
