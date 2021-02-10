/**
 * CORS Proxy Server
 */
const cors_proxy = require( './lib/cors-anywhere' );
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;
const blacklist = String( process.env.CORSANYWHERE_BLACKLIST || '' ).trim().split( /'[\,\s]+/g );

// start proxy
cors_proxy.createServer({
  requireHeader: ['origin', 'x-requested-with'],
  redirectSameOrigin: true,
  originBlacklist: blacklist,
  httpProxyOptions: { xfwd: false },
  httpsOptions: null,
  removeHeaders: [
    'cookie',
    'cookie2',
    'x-heroku-queue-wait-time',
    'x-heroku-queue-depth',
    'x-heroku-dynos-in-use',
    'x-request-start',
    'strict-transport-security',
  ],
}).listen( port, host, () => {
  console.log( `Running CORS-Anywhere on  ${host}:${port} ...` );
});
