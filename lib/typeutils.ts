import { Decoder } from "@mojotech/json-type-validation";

/**
 * Infer the decoded type from decoder.
 */
export type Decoded<DecoderType> = DecoderType extends Decoder<infer T>
  ? T
  : never;
