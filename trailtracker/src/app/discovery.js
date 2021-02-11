//const DiscoveryV2 = require('ibm-watson/discovery/v2');
//const { IamAuthenticator } = require('ibm-watson/auth');

//import { IamAuthenticator } from 'ibm-cloud-sdk-core'
//import DiscoveryV2 from 'ibm-watson/discovery/v2'
//const discovery = new DiscoveryV2({version: '2019-11-22'});

const DiscoveryV1 = require('ibm-watson/discovery/v1');

var discovery;
const version_date = '2020-12-01';

discovery = new DiscoveryV1({
  version: version_date
});

discovery.environmentId = 'system';
discovery.collectionId = 'news-en';

module.exports = discovery;