const Task = require('folktale/concurrency/task');
const pgpLib = require('pg-promise');

const adapter = new pgpLib.PromiseAdapter({
  create: cb => Task.task(resolver => cb(resolver.resolve, resolver.reject)),
  resolve: Task.of,
  reject: Task.rejected,
  all: Task.waitAll,
});

const initOptions = {
  promiseLib: adapter,
};

const pgp = pgpLib(initOptions);
