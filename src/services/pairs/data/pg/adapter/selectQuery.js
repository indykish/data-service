const { curry } = require('ramda');

const selectQuery = curry(({ query, queryWithWaves }, pair) => {
  if (pair.priceAsset === 'TN' || pair.amountAsset === 'TN')
    return query(pair);
  else return queryWithWaves(pair);
});

module.exports = selectQuery;
