import { setWindowValue, resetWindowValue } from './tests/setWindowValue';
import onClient from './onClient';

const windowLocation = window.location;

describe('onClient', () => {
  beforeEach(() => {
    resetWindowValue('location', windowLocation);
  });

  it('returns true when window location is available', () => {
    setWindowValue('location', true);

    expect(onClient()).toEqual(true);
  });

  it('returns false when window location is not', () => {
    setWindowValue('location', false);

    expect(onClient()).toEqual(false);
  });
});