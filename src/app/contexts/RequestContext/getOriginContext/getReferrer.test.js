import {
  setWindowValue,
  resetWindowValue,
} from '../../../helpers/tests/setWindowValue';

import getReferrer from './getReferrer';

const setOnClient = onClient => {
  if (onClient) {
    setWindowValue('location', {
      origin: null,
    });
  }
};

const tests = [
  {
    input: 'https://www.bbc.com',
    onClient: true,
    expected: 'https://www.bbc.com',
    assertion: 'should return document.referrer when availible',
  },
  {
    input: null,
    onClient: true,
    expected: null,
    assertion: 'should return null when document.referrer is null on client',
  },
  {
    input: null,
    onClient: false,
    expected: null,
    assertion: 'should return null when not on client',
  },
];

const windowDocument = window.document;
const windowLocation = window.location;

describe('getReferrer', () => {
  afterEach(() => {
    resetWindowValue('document', windowDocument);
    resetWindowValue('location', windowLocation);
  });

  tests.forEach(({ input, onClient, expected, assertion }) => {
    it(assertion, () => {
      Object.defineProperty(window.document, 'referrer', {
        configurable: true,
        value: input,
      });

      setOnClient(onClient);

      expect(getReferrer()).toEqual(expected);
    });
  });
});