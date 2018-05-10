var heapdump = require('heapdump');

setInterval(
  () => heapdump.writeSnapshot('/tmp/' + Date.now() + '.heapsnapshot'),
  30000
);
