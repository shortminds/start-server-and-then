import { DEFAULT_WAIT_TIMEOUT, isDebug, isSecure, waitOnTimeout } from './settings';
import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';

describe('settings test', () => {
  let sandbox: SinonSandbox;

  beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should get default timeout', () => {
    expect(waitOnTimeout()).to.equal(DEFAULT_WAIT_TIMEOUT);
  });

  it('should default debug to false', () => {
    expect(isDebug()).to.equal(false);
  });

  it('should default secure to false', () => {
    expect(isSecure()).to.equal(false);
  });
});
