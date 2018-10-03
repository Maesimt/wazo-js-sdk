// @flow

type Response = {
  destination: string,
  enabled: boolean
};

export const FORWARD_KEYS = {
  BUSY: 'busy',
  NO_ANSWER: 'noanswer',
  UNCONDITIONAL: 'unconditional'
};

type ForwardOptionArguments = {
  destination: string,
  enabled: boolean,
  key: string
};

export default class ForwardOption {
  destination: string;
  enabled: boolean;
  key: string;

  static parse(plain: Response, key: string): ForwardOption {
    return new ForwardOption({
      destination: plain.destination || '',
      enabled: plain.enabled,
      key
    });
  }

  constructor({ destination, enabled, key }: ForwardOptionArguments = {}) {
    this.destination = destination;
    this.enabled = enabled;
    this.key = key;
  }

  setDestination(number: string): ForwardOption {
    this.destination = number;

    return this;
  }

  is(other: ForwardOption) {
    return this.key === other.key;
  }
}