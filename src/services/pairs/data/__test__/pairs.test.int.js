const { BigNumber } = require('@turtlenetwork/data-entities');

// const { Nothing } = require('folktale/maybe');
const pair = require('./mocks/pair');

const { always, identity } = require('ramda');

const createData = require('../index');

// runtime dependencies
const loadConfig = require('../../../../loadConfig');
const { createPgDriver, createRedisDriver } = require('../../../../db');
const options = loadConfig();
const pg = createPgDriver(options);
const redis = createRedisDriver(options);

const isPair = mx => {
  if (typeof mx !== 'object') return false;

  const isBigNumber = x => x instanceof BigNumber;
  return (
    isBigNumber(mx.first_price) &&
    isBigNumber(mx.last_price) &&
    isBigNumber(mx.volume) &&
    isBigNumber(mx.volume_waves)
  );
};

const data = createData({
  drivers: { pg, redis },
  emitEvent: always(identity),
});

describe('Pair data request ', () => {
  it('returns one pair correctly', done => {
    data
      .get(pair('TN', 'BTC'))
      .run()
      .listen({
        onResolved: maybeX => {
          const x = maybeX.getOrElse();
          expect(isPair(x)).toBe(true);
          done();
        },
      });
  });

  it('returns array of results on all possible TN positions', done => {
    const pairs = [
      pair('TN', 'BTC'),
      pair('ETH', 'TN'),
      pair('ETH', 'BTC'),
      { amountAsset: 'qwe', priceAsset: 'asd' },
    ];

    data
      .mget(pairs)
      .run()
      .listen({
        onResolved: msP => {
          const ps = msP.map(mp => mp.getOrElse(-1));

          expect(isPair(ps[0])).toBe(true);
          expect(isPair(ps[1])).toBe(true);
          expect(isPair(ps[2])).toBe(true);
          expect(ps[3]).toBe(-1);
          done();
        },
      });
  });
});
