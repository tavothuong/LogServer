var express = require('express');
var router = express.Router();
const axios = require('axios');


function createIndex(name) {

}

function createVisualization(name) {

}

function createSearch(name) {

}

function createDashboard(name) {

}

router.get('/:type/:id', function (req, res, next) {
   var type = req.params.type
   var id = req.params.id
   const options = {
      hostname: 'localhost',
      port: 5601,
      path: '/api/saved_objects/' + type + '/' + id,
      method: 'GET',
      headers: {
         'kbn-xsrf': true
      }
   }


   axios.get('http://localhost:5601/api/saved_objects/dashboard/7adfa750-4c81-11e8-b3d7-01146121b73d', { headers: {"kbn-xsrf": true}})
      .then(response => {
         console.log(response);
      })
      .catch(error => {
         console.log(error);
      });
   res.json({
      success: false,
   });
});

router.post('/createIndex/:name', function (req, res, next) {
   var name = req.params.name
   createIndex(name);
   res.json({
      success: true,
   });
});

router.post('/createVisualization/:name', function (req, res, next) {
   var name = req.params.name
   createVisualization(name);
   res.json({
      success: true,
   });
});

router.post('/createSearch/:name', function (req, res, next) {
   var name = req.params.name
   createSearch(name);
   res.json({
      success: true,
   });
});

router.post('/createDashboard/:name', function (req, res, next) {
   var name = req.params.name
   createDashboard(name);
   res.json({
      success: true,
   });
});


router.post('/createAny/:name', function (req, res, next) {
   var name = req.params.name
   createDashboard(name);
   res.json({
      success: true,
   });
});

module.exports = router;
