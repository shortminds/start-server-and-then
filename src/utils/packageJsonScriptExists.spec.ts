import packageJsonScriptExists from './packageJsonScriptExists';
import { expect } from 'chai';
import sinon from 'sinon';
import logger from './logger';

describe('Hello function', () => {
  let loggerStub: any;

  beforeEach(function() {
    loggerStub = sinon.stub(logger, 'log');
  });

  afterEach(function() {
    loggerStub.restore();
  });

  it('should console log when no command provided', () => {
    packageJsonScriptExists('');
    expect(loggerStub.calledOnce).to.be.true;
    expect(loggerStub.calledWithExactly('found empty command string')).to.be.true;
  });

  it('should find test script', () => {
    const testCommand = 'test';
    expect(packageJsonScriptExists(testCommand)).to.equal(true);
  });

  it('should not find a script that doesn\'t exist', () => {
    const testCommand = 'notarealscript';
    expect(packageJsonScriptExists(testCommand)).to.equal(false);
  });
});
