let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-09-11T02:22:16.019Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Shares><Share><Name>share156809130479201509</Name><Properties><Last-Modified>Tue, 10 Sep 2019 04:54:59 GMT</Last-Modified><Etag>\"0x8D735AB084E7AE0\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156809130519502514</Name><Properties><Last-Modified>Tue, 10 Sep 2019 04:54:59 GMT</Last-Modified><Etag>\"0x8D735AB088A2265\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156809131360508470156809131470302679</Name><Properties><Last-Modified>Tue, 10 Sep 2019 04:55:09 GMT</Last-Modified><Etag>\"0x8D735AB0E391536\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156809149355908605156809149434504000</Name><Properties><Last-Modified>Tue, 10 Sep 2019 04:58:08 GMT</Last-Modified><Etag>\"0x8D735AB7952CB33\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156809624838000823</Name><Properties><Last-Modified>Tue, 10 Sep 2019 06:17:28 GMT</Last-Modified><Etag>\"0x8D735B68E84BED5\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156809624917403082</Name><Properties><Last-Modified>Tue, 10 Sep 2019 06:17:29 GMT</Last-Modified><Etag>\"0x8D735B68EF893DA\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156809625891401039156809625965507463</Name><Properties><Last-Modified>Tue, 10 Sep 2019 06:17:39 GMT</Last-Modified><Etag>\"0x8D735B69535AE02\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156809642302108393156809642348402321</Name><Properties><Last-Modified>Tue, 10 Sep 2019 06:20:23 GMT</Last-Modified><Etag>\"0x8D735B6F6DD22AB\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156809718161506113</Name><Properties><Last-Modified>Tue, 10 Sep 2019 06:33:01 GMT</Last-Modified><Etag>\"0x8D735B8BAC0433E\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156814280709909730</Name><Properties><Last-Modified>Tue, 10 Sep 2019 19:13:27 GMT</Last-Modified><Etag>\"0x8D73622F58C0398\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156814280732600915</Name><Properties><Last-Modified>Tue, 10 Sep 2019 19:13:27 GMT</Last-Modified><Etag>\"0x8D73622F5B1F59B\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156814281088000113156814281133409166</Name><Properties><Last-Modified>Tue, 10 Sep 2019 19:13:31 GMT</Last-Modified><Etag>\"0x8D73622F8124848\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156814292717607273156814292738207794</Name><Properties><Last-Modified>Tue, 10 Sep 2019 19:15:27 GMT</Last-Modified><Etag>\"0x8D736233D3C60B8\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156814313225206665</Name><Properties><Last-Modified>Tue, 10 Sep 2019 19:18:52 GMT</Last-Modified><Etag>\"0x8D73623B75C947A\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156814313251209117</Name><Properties><Last-Modified>Tue, 10 Sep 2019 19:18:52 GMT</Last-Modified><Etag>\"0x8D73623B7A4CC11\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156814313637104377156814313681106521</Name><Properties><Last-Modified>Tue, 10 Sep 2019 19:18:56 GMT</Last-Modified><Etag>\"0x8D73623BA115A44\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156814322744909418156814322766007667</Name><Properties><Last-Modified>Tue, 10 Sep 2019 19:20:27 GMT</Last-Modified><Etag>\"0x8D73623F0371A61\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156815781541404039</Name><Properties><Last-Modified>Tue, 10 Sep 2019 23:23:35 GMT</Last-Modified><Etag>\"0x8D73645E753EB01\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156815781592405922</Name><Properties><Last-Modified>Tue, 10 Sep 2019 23:23:36 GMT</Last-Modified><Etag>\"0x8D73645E79F9B1D\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156815800254109424156815800295400520</Name><Properties><Last-Modified>Tue, 10 Sep 2019 23:26:43 GMT</Last-Modified><Etag>\"0x8D7364657190A69\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156815834231304754</Name><Properties><Last-Modified>Tue, 10 Sep 2019 23:32:22 GMT</Last-Modified><Etag>\"0x8D73647214CCF70\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156815834263100126</Name><Properties><Last-Modified>Tue, 10 Sep 2019 23:32:22 GMT</Last-Modified><Etag>\"0x8D7364721706924\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156815843582303528156815843603304433</Name><Properties><Last-Modified>Tue, 10 Sep 2019 23:33:56 GMT</Last-Modified><Etag>\"0x8D73647591AD820\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156816667467006404</Name><Properties><Last-Modified>Wed, 11 Sep 2019 01:51:15 GMT</Last-Modified><Etag>\"0x8D7365A87D78FDE\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156816667510507670</Name><Properties><Last-Modified>Wed, 11 Sep 2019 01:51:15 GMT</Last-Modified><Etag>\"0x8D7365A881804CD\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156816685653106155156816685694106253</Name><Properties><Last-Modified>Wed, 11 Sep 2019 01:54:17 GMT</Last-Modified><Etag>\"0x8D7365AF479B936\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156816698234006898</Name><Properties><Last-Modified>Wed, 11 Sep 2019 01:56:22 GMT</Last-Modified><Etag>\"0x8D7365B3F1AD49C\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156816707253005853156816707274006563</Name><Properties><Last-Modified>Wed, 11 Sep 2019 01:57:52 GMT</Last-Modified><Etag>\"0x8D7365B74FB1F47\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156816827645504230</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:17:56 GMT</Last-Modified><Etag>\"0x8D7365E4293FC3E\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156816827693507700</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:17:57 GMT</Last-Modified><Etag>\"0x8D7365E42DD1E42\"</Etag><Quota>5120</Quota></Properties></Share><Share><Name>share156816845755406737156816845797401917</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:58 GMT</Last-Modified><Etag>\"0x8D7365EAEC5C234\"</Etag><Quota>5120</Quota></Properties></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf4c42ee-701a-005b-3147-686180000000',
  'x-ms-client-request-id',
  '8bdaf3aa-8e40-4f5f-8d93-89316c003c16',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:22:15 GMT' ]);

