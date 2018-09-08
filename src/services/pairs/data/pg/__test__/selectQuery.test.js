const selectQuery = require('../adapter/selectQuery');
const sql = require('../sql');

describe('Pair db adapter `selectQuery` function', () => {
  it('covers case when TN — amount asset', () => {
    const pair = {
      amountAsset: 'TN',
      priceAsset: 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck',
    };
    expect(selectQuery(sql, pair)).toEqual(sql.query(pair));
  });

  it('covers case when TN — price asset', () => {
    const pair = {
      amountAsset: '474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu',
      priceAsset: 'TN',
    };
    expect(selectQuery(sql, pair)).toEqual(sql.query(pair));
  });

  it('covers case when TN is neither price nor amount asset', () => {
    const pair = {
      amountAsset: '474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu',
      priceAsset: 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck',
    };
    expect(selectQuery(sql, pair)).toEqual(sql.queryWithWaves(pair));
  });
});
