import { Algorithm } from '../constants';

export const hash = async (
  message: string,
  algorithm = Algorithm.sha1
): Promise<string> => {
  // encode as (utf-8) Uint8Array
  const msgUint8 = new TextEncoder().encode(message);
  try {
    // hash the message
    const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
    // convert buffer to byte array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  } catch (err) {
    throw new Error(err);
  }
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    throw new Error(err);
  }
};
