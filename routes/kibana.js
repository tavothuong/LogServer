var express = require('express');
var router = express.Router();
const axios = require('axios');
const url_kibana_save_obj = "http://localhost:5601/api/saved_objects/"

function createIndex(name) {
   url = url_kibana_save_obj + "index-pattern";
   body = {
      "attributes": {
         "title": name.toLowerCase() + "*"
      }
   }
   axios.post(url, body, {
      headers: {
         "kbn-xsrf": true
      }
   }).then((response) => {
      console.log(response);
      return true;
   }).catch((error) => {
      console.log(error);
      return false;
   })
}

function createVisualization(name) {
   url = url_kibana_save_obj + "visualization";
   body = {
      "attributes": {
         "title": name.toLowerCase() + "-visualization",
         "kibanaSavedObjectMeta": {
            "searchSourceJSON": {
               "query": {
                  "query": "",
                  "language": "kuery"
               },
               "filter": [
                  {
                     "meta": {
                        "alias": null,
                        "negate": false,
                        "disabled": false,
                        "type": "range",
                        "key": "@timestamp",
                        "params": {
                           "gte": "now-1d",
                           "lt": "now"
                        },
                        "indexRefName": "kibanaSavedObjectMeta.searchSourceJSON.filter[0].meta.index"
                     },
                     "range": {
                        "@timestamp": {
                           "gte": "now-1d",
                           "lt": "now"
                        }
                     },
                     "$state": {
                        "store": "appState"
                     }
                  }
               ],
               "indexRefName": "kibanaSavedObjectMeta.searchSourceJSON.index"
            },
            "visState": {
               "title": name.toLowerCase() + "-visualization",
               "type": "histogram",
               "params": {
                  "type": "histogram",
                  "grid": {
                     "categoryLines": false
                  },
                  "categoryAxes": [
                     {
                        "id": "CategoryAxis-1",
                        "type": "category",
                        "position": "bottom",
                        "show": true,
                        "style": {},
                        "scale": {
                           "type": "linear"
                        },
                        "labels": {
                           "show": true,
                           "filter": true,
                           "truncate": 100
                        },
                        "title": {}
                     }
                  ],
                  "valueAxes": [
                     {
                        "id": "ValueAxis-1",
                        "name": "LeftAxis-1",
                        "type": "value",
                        "position": "left",
                        "show": true,
                        "style": {},
                        "scale": {
                           "type": "linear",
                           "mode": "normal"
                        },
                        "labels": {
                           "show": true,
                           "rotate": 0,
                           "filter": false,
                           "truncate": 100
                        },
                        "title": {
                           "text": "Count"
                        }
                     }
                  ],
                  "seriesParams": [
                     {
                        "show": true,
                        "type": "histogram",
                        "mode": "normal",
                        "data": {
                           "label": "Count",
                           "id": "1"
                        },
                        "valueAxis": "ValueAxis-1",
                        "drawLinesBetweenPoints": true,
                        "lineWidth": 2,
                        "showCircles": true
                     }
                  ],
                  "addTooltip": true, "addLegend": true, "legendPosition": "right", "times": [], "addTimeMarker": false, "labels": { "show": false }, "thresholdLine": { "show": false, "value": 10, "width": 1, "style": "full", "color": "#34130C" }, "dimensions": { "x": { "accessor": 0, "format": { "id": "date", "params": { "pattern": "YYYY-MM-DD HH:mm" } }, "params": { "date": true, "interval": "PT1H", "intervalESValue": 1, "intervalESUnit": "h", "format": "YYYY-MM-DD HH:mm" }, "aggType": "date_histogram" }, "y": [{ "accessor": 2, "format": { "id": "number" }, "params": {}, "aggType": "count" }], "series": [{ "accessor": 1, "format": { "id": "terms", "params": { "id": "string", "otherBucketLabel": "Other", "missingBucketLabel": "Missing" } }, "params": {}, "aggType": "terms" }] }
               }, "aggs": [{ "id": "1", "enabled": true, "type": "count", "schema": "metric", "params": {} }, { "id": "2", "enabled": true, "type": "date_histogram", "schema": "segment", "params": { "field": "@timestamp", "timeRange": { "from": "now-15m", "to": "now" }, "useNormalizedEsInterval": true, "scaleMetricValues": false, "interval": "h", "drop_partials": false, "min_doc_count": 1, "extended_bounds": {} } }, { "id": "3", "enabled": true, "type": "terms", "schema": "group", "params": { "field": "message.keyword", "orderBy": "1", "order": "desc", "size": 20, "otherBucket": false, "otherBucketLabel": "Other", "missingBucket": false, "missingBucketLabel": "Missing" } }]
            }
         }

      },
      "references": [
         {
            "name": "kibanaSavedObjectMeta.searchSourceJSON.index",
            "type": "index-pattern",
            "id": name.toLowerCase() + "*"
         },
         {
            "name": "kibanaSavedObjectMeta.searchSourceJSON.filter[0].meta.index",
            "type": "index-pattern",
            "id": name.toLowerCase() + "*"
         }
      ]
   }
   axios.post(url, body, {
      headers: {
         "kbn-xsrf": true
      }
   }).then((response) => {
      console.log(response);
      return true;
   }).catch((error) => {
      console.log(error);
      return false;
   })
}

function createSearch(name) {
   url = url_kibana_save_obj + "search";
   body = {
      "attributes": {
         "title": name.toLowerCase() + "-search",
         "columns": ["@timestamp", "host", "zappname", "thread", "class", "linenumber", "message"],
         "kibanaSavedObjectMeta": {
            "searchSourceJSON": {
               "highlightAll": true,
               "version": true,
               "query": {
                  "language": "kuery",
                  "query": ""
               },
               "filter": [],
               "indexRefName": "kibanaSavedObjectMeta.searchSourceJSON.index"
            }
         },
         "sort": [
            ["@timestamp", "desc"]
         ]
      },
      "references": [
         {
            "name": "kibanaSavedObjectMeta.searchSourceJSON.index",
            "type": "index-pattern",
            "id": name.toLowerCase() + "*"
         }
      ]
   }
   axios.post(url, body, {
      headers: {
         "kbn-xsrf": true
      }
   }).then((response) => {
      console.log(response);
      return true;
   }).catch((error) => {
      // console.log(error);
      return false;
   })
}

function createDashboard(name) {
   url = url_kibana_save_obj + "index-pattern";
   body = {
      "attributes": {
         "title": name.toLowerCase() + "-dashboard",
         "kibanaSavedObjectMeta": {
            "searchSourceJSON": {
               "query": {
                  "query": "",
                  "language": "kuery"
               },
               "filter": []
            }
         },
         "optionsJSON": {
            "useMargins": true,
            "hidePanelTitles": false
         },
         "panelsJSON": [
            { "version": "7.5.2", "gridData": { "x": 0, "y": 0, "w": 24, "h": 15, "i": "27e69f03-2a80-4298-b6ab-c280725dd971" }, "panelIndex": "27e69f03-2a80-4298-b6ab-c280725dd971", "embeddableConfig": {}, "panelRefName": "panel_0" }, { "version": "7.5.2", "gridData": { "x": 24, "y": 0, "w": 24, "h": 15, "i": "e3d49a2e-b4dc-4074-ad23-87eb8c9fa722" }, "panelIndex": "e3d49a2e-b4dc-4074-ad23-87eb8c9fa722", "embeddableConfig": {}, "panelRefName": "panel_1" }, { "version": "7.5.2", "gridData": { "x": 0, "y": 15, "w": 48, "h": 29, "i": "6b4fa019-ea58-4822-9df2-bcd452e31b83" }, "panelIndex": "6b4fa019-ea58-4822-9df2-bcd452e31b83", "embeddableConfig": {}, "panelRefName": "panel_2" }
         ],
         "timeRestore": false
      },
      "references": [
         {
            "name": "panel_0",
            "type": "visualization",
            "id": name.toLowerCase() + "-visualization"
         },
         {
            "name": "panel_1",
            "type": "search",
            "id": name.toLowerCase() + "-search"
         }
      ]
   }
   axios.post(url, body, {
      headers: {
         "kbn-xsrf": true
      }
   }).then((response) => {
      // console.log(response);
      return true;
   }).catch((error) => {
      // console.log(error);
      return false;
   })
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


   axios.get('http://localhost:5601/api/saved_objects/' + type + '/' + id, {
      headers: {
         "kbn-xsrf": true
      }
   }).then(response => {
      console.log(response);
      return res.json({
         success: true,
      });
   }).catch(error => {
      console.log(error);

   });
   return res.json({
      success: true,
   });
});

router.post('/createIndex/:name', function (req, res, next) {
   var name = req.params.name
   createIndex(name)
   if (1) {
      return res.json({
         success: true,
      });
   }
   else {
      return res.json({
         success: false,
      });
   }
});

router.post('/createVisualization/:name', function (req, res, next) {
   var name = req.params.name
   createVisualization(name)
   if (1) {
      return res.json({
         success: true,
      });
   }
   else {
      return res.json({
         success: false,
      });
   }
});

router.post('/createSearch/:name', function (req, res, next) {
   var name = req.params.name
   createSearch(name);
   if (1) {
      return res.json({
         success: true,
      });
   }
   else {
      return res.json({
         success: false,
      });
   }
});

router.post('/createDashboard/:name', function (req, res, next) {
   var name = req.params.name
   createDashboard(name);
   if (1) {
      return res.json({
         success: true,
      });
   }
   else {
      return res.json({
         success: false,
      });
   }
});


router.post('/createAny/:name', function (req, res, next) {
   var name = req.params.name
   //createDashboard(name);
   return res.json({
      success: false,
      message: "Not impliment"
   });
});

module.exports = router;