const cors = require('@koa/cors');
const compose = require('koa-compose');

const setHeaders = async (ctx, next) => {
  ctx.set('Content-Type', 'application/json; charset=utf-8');
  ctx.set('X-REQUEST-ID', ctx.state.id);

  await next();
};

module.exports = compose([setHeaders, cors()]);
