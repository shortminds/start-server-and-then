import { scriptExists } from './packageJson';
import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import logger from './logger';

describe('packageJsonScriptExists test', () => {
  let sandbox: SinonSandbox;
  let loggerStub;

  beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should console log when no command provided', () => {
    loggerStub = sinon.stub(logger, 'log');

    scriptExists('');

    expect(loggerStub.calledOnce).to.be.true;
    expect(loggerStub.calledWithExactly('found empty command string')).to.be.true;
  });

  it('should find test script', () => {
    const testCommand = 'test';
    expect(scriptExists(testCommand)).to.equal(true);
  });

  it('should not find a script that doesn\'t exist', () => {
    const testCommand = 'notarealscript';
    expect(scriptExists(testCommand)).to.equal(false);
  });
});
