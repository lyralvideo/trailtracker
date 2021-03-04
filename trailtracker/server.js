require('dotenv').config({ silent: true});
const express = require("express");
const app = express();
//const expressBrowserify = require('express-browserify');
const { IamTokenManager, IamAuthenticator } = require('ibm-watson/auth');
const DiscoveryV1 = require('ibm-watson/discovery/v1');


if (!process.env.DISCOVERY_APIKEY) {
    console.log('This example requires the DISCOVERY_APIKEY environment variable');
    //process.exit(1);
}

const discoveryAuthenticator = new IamTokenManager({
    apikey: process.env.DISCOVERY_APIKEY,
  });
  
  //const isDev = app.get('env') === 'development';
  //app.get(
  //  '/bundle.js',
  //  expressBrowserify('public/client.js', {
  //    watch: isDev,
  //    debug: isDev,
  //  })
  //);

  const discovery = new DiscoveryV1({
      authenticator: new IamAuthenticator({ apikey: process.env.DISCOVERY_APIKEY}),
      serviceUrl: process.env.DISCOVERY_URL,
      version: '2019-04-30',
  });

  const params = {
      environmentId: '35ef0ced-f8c5-4f16-a57c-098c66505472',
  };
  
  app.use(express.static('app/'));

  app.get('/disc_test', function(req, res) {
    return discovery
      .listCollections(params)
      .then(({ result }) => {
          res.send(result)
          //(response => {
          //console.log(JSON.stringify(response.result, null, 2));
        })
      .catch(console.error);
  });
  
  app.get('/api/token', function (req, res) {
    return discoveryAuthenticator
      .requestToken()
      .then(({ result }) => {
        res.json({ accessToken: result.access_token, url: process.env.DISCOVERY_URL, url: process.env.DISCOVERY_URL });
      })
      .catch(console.error);
  });
  
  const port = 3000;
  app.listen(port, function () {
    console.log('Watson browserify example server running at http://localhost:%s/', port);
  });