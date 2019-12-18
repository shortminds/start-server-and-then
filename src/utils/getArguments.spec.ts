import { getArguments } from './getArguments';
import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import logger from './logger';
import * as packageJson from './packageJson';

describe('getArguments test', () => {
  let sandbox: SinonSandbox;
  let processStub;
  let loggerLogStub;
  let loggerErrorStub;

  beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    // processStub.restore();
    sandbox.restore();
  });

  it('should log and exit if arguments have errors', () => {
    sandbox.stub(packageJson, 'scriptExists').returns(false);
    processStub = sandbox.stub(process, 'exit');
    loggerLogStub = sandbox.stub(logger, 'log');
    loggerErrorStub = sandbox.stub(logger, 'error');

    getArguments([]);

    expect(loggerLogStub.calledWithExactly('expected array of at least 3 arguments')).to.be.true;
    expect(loggerLogStub.calledWithExactly('start script not found in package.json')).to.be.true;
    expect(loggerLogStub.calledWithExactly('not all and then scripts exists in package.json')).to.be.true;
    expect(loggerErrorStub.calledOnce).to.be.true;
    expect(processStub.callCount).to.equal(4);
  });

  it('should return properly formatted arguments', () => {
    sandbox.stub(packageJson, 'scriptExists').returns(true);

    const startScript = 'start';
    const urlToWaitFor = 'http://localhost:3000/';
    const andThenScript = 'andThen';

    const {
      andThen,
      start,
      url
    } = getArguments([startScript, urlToWaitFor, andThenScript]);

    expect(start).to.equal(`npm run ${startScript}`);
    expect(url).to.equal(urlToWaitFor);
    expect(andThen[0]).to.equal(`npm run ${andThenScript}`);
  });
});
