require('dotenv').config({ silent: true});
const express = require("express");
const cors = require('cors');
const app = express();
//const expressBrowserify = require('express-browserify');
const { IamTokenManager, IamAuthenticator } = require('ibm-watson/auth');
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');


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

  //Setup discovery variable
  const discovery = new DiscoveryV1({
      authenticator: new IamAuthenticator({ apikey: process.env.DISCOVERY_APIKEY}),
      serviceUrl: process.env.DISCOVERY_URL,
      version: '2019-04-30',
  });

  //Setup parameters for dicovery query
  const disc_params = {
    environmentId: '35ef0ced-f8c5-4f16-a57c-098c66505472',
    collectionId: 'c7bf0198-9e14-40db-9e96-2b4d348585c1',
    
};

  //setup NLU variable
  const nlu = new NaturalLanguageUnderstandingV1 ({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({ apikey: process.env.NATURAL_LANGUAGE_UNDERSTANDING_APIKEY}),
    serviceUrl: process.env.NATURAL_LANGUAGE_UNDERSTANDING_URL,
  });

  //needed for obtaining string from query
  const querystring = require('querystring');
  
  app.use(express.static('app/'));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  const port = 3000;
  app.listen(port, function () {
    console.log('Watson browserify example server running at http://localhost:%s/', port);
  });

  //NLU Parse Module - Obtaining Location - Output location 
  //implementation to come
  //var getLocation = function (input) {
  //  console.log("Getting Location");
  //  
  //}

  function getLocation(input) {
    //var jsonOut = JSON.parse(input);
    console.log(JSON.stringify(input, null, 2));
  }
  
  //Test method to perform static query on IBM watson discovery service
  app.get('/disc_test', cors(), function(req, res) {
    //print search param to console to show functionality
    console.log(req.query.search);
    return discovery
      .query({
        environmentId: '35ef0ced-f8c5-4f16-a57c-098c66505472',
        collectionId: 'c7bf0198-9e14-40db-9e96-2b4d348585c1',
        naturalLanguageQuery: '' + req.query.search,
      })
      .then(({ result }) => {
        res.send(result)
        //(response => {
        //console.log(JSON.stringify(response.result, null, 2));
      })
      .catch(err => {
        console.log(err)
      });
  });

  //Test method to perform query on IBM watson NLU service
  app.get('/nlu_test', function(req, res) {
    //print search param to console to show functionality
    console.log(req.query.search);
    //form request from nlu useing search param in url query
    return nlu
      .analyze({
        'language': 'en',
        'text': '' + req.query.search,
        'features': {
          'entities': {
            'sentiment': true,
          },
          'keywords': {
            'sentiment': true,
          }
        }
      })
      .then(({ result }) => {
        res.send(result)
      })
      .catch(err => {
        console.log(err)
      });
  });
  
  app.get('/search', cors(), function(req, res) {
    //print search param to console to show functionality
    console.log(req.query.search);
    //form request from nlu useing search param in url query
    nlu
      .analyze({
        'language': 'en',
        'text': '' + req.query.search,
        'features': {
          'entities': {
            'sentiment': true,
          },
          'keywords': {
            'sentiment': true,
          }
        }
      })
      .then(({ result }) => {
        getLocation(result)
        res.send(result)
      })
      .catch(err => {
        console.log(err)
      });
  });
  
  app.get('/api/token', function (req, res) {
    return discoveryAuthenticator
      .requestToken()
      .then(({ result }) => {
        res.json({ accessToken: result.access_token, url: process.env.DISCOVERY_URL, url: process.env.DISCOVERY_URL });
      })
      .catch(console.error);
  });