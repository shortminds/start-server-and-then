import { psTreeCallback, stopServer } from './stopServer';
import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import logger from './logger';

class PSError extends Error {
  public code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

describe('stopServer test', () => {
  let sandbox: SinonSandbox;
  // let psTreeStub: any;
  let processStub;
  let loggerLogStub;

  const server = {
    pid: 123,
    kill: sinon.spy()
  };

  beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should kill the server', () => {
    // @ts-ignore
    stopServer(server).then(() => {
      expect(server.kill.callCount).to.equal(1);
    });
  });

  it('should not kill child processes that don\'t exist', () => {
    processStub = sandbox.stub(process, 'kill');

    psTreeCallback(new Error(), []);

    expect(processStub.called).to.be.false;
  });

  it('should kill child processes', () => {
    const PID = 123;
    processStub = sandbox.stub(process, 'kill');

    psTreeCallback(new Error(), [{ PID: `${PID}`, COMMAND: '', PPID: '', STAT: '' }]);

    expect(processStub.calledWith(PID, 'SIGINT')).to.be.true;
  });

  it('should handle ESRCH kill errors', () => {
    const PID = 123;
    processStub = sandbox.stub(process, 'kill').throws(new PSError('error', 'ESRCH'));
    loggerLogStub = sandbox.stub(logger, 'log');

    psTreeCallback(new Error(), [{ PID: `${PID}`, COMMAND: '', PPID: '', STAT: '' }]);

    expect(processStub.calledOnce).to.be.true;
    expect(loggerLogStub.calledOnce).to.be.true;
  });

  it('should handle other kill errors', () => {
    processStub = sandbox.stub(process, 'kill').throws(new PSError('error', 'FAIL'));
    loggerLogStub = sandbox.stub(logger, 'error');

    expect(psTreeCallback(new Error(), [{ PID: '123', COMMAND: '', PPID: '', STAT: '' }])).to.throw;

    expect(loggerLogStub.calledOnce).to.be.true;
  });
});
