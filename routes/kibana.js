var express = require('express');
var router = express.Router();
const axios = require('axios');
var config = require('../config/config')
var url_kibana_save_obj = config.url_kibana_save_obj

function createIndex(name) {
   title = name.toLowerCase() + "*"
   url = url_kibana_save_obj + "index-pattern/" + title;
   body = {
      "attributes": {
         "title": title
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
   title = name.toLowerCase() + "-visualization"
   url = url_kibana_save_obj + "visualization/" + title;
   body = {
      "attributes": {
         "title": title,
         "visState": JSON.stringify({ "title": title, "type": "histogram", "params": { "type": "histogram", "grid": { "categoryLines": false }, "categoryAxes": [{ "id": "CategoryAxis-1", "type": "category", "position": "bottom", "show": true, "style": {}, "scale": { "type": "linear" }, "labels": { "show": true, "filter": true, "truncate": 100 }, "title": {} }], "valueAxes": [{ "id": "ValueAxis-1", "name": "LeftAxis-1", "type": "value", "position": "left", "show": true, "style": {}, "scale": { "type": "linear", "mode": "normal" }, "labels": { "show": true, "rotate": 0, "filter": false, "truncate": 100 }, "title": { "text": "Count" } }], "seriesParams": [{ "show": true, "type": "histogram", "mode": "stacked", "data": { "label": "Count", "id": "1" }, "valueAxis": "ValueAxis-1", "drawLinesBetweenPoints": true, "lineWidth": 2, "showCircles": true }], "addTooltip": true, "addLegend": true, "legendPosition": "right", "times": [], "addTimeMarker": false, "labels": { "show": false }, "thresholdLine": { "show": false, "value": 10, "width": 1, "style": "full", "color": "#34130C" }, "dimensions": { "x": { "accessor": 0, "format": { "id": "date", "params": { "pattern": "HH:mm" } }, "params": { "date": true, "interval": "PT1M", "intervalESValue": 1, "intervalESUnit": "m", "format": "HH:mm" }, "aggType": "date_histogram" }, "y": [{ "accessor": 1, "format": { "id": "number" }, "params": {}, "aggType": "count" }] } }, "aggs": [{ "id": "1", "enabled": true, "type": "count", "schema": "metric", "params": {} }, { "id": "2", "enabled": true, "type": "date_histogram", "schema": "segment", "params": { "field": "@timestamp", "timeRange": { "from": "now-15d", "to": "now" }, "useNormalizedEsInterval": true, "scaleMetricValues": false, "interval": "12h", "drop_partials": false, "min_doc_count": 1, "extended_bounds": {} } }] }),
         "uiStateJSON": "{}",
         "kibanaSavedObjectMeta": {
            "searchSourceJSON": JSON.stringify({ "query": { "query": "", "language": "kuery" }, "filter": [], "indexRefName": "kibanaSavedObjectMeta.searchSourceJSON.index" }),
         }

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
      console.log(error);
      return false;
   })
}

function createVisualizationByField(name, field, top) {
   title = name.toLowerCase() + "-by-" + field + "-visualization"
   url = url_kibana_save_obj + "visualization/" + title + "?overwrite=true";
   body = {
      "attributes": {
         "title": title,
         "visState": JSON.stringify({ "title": title, "type": "histogram", "params": { "type": "histogram", "grid": { "categoryLines": false }, "categoryAxes": [{ "id": "CategoryAxis-1", "type": "category", "position": "bottom", "show": true, "style": {}, "scale": { "type": "linear" }, "labels": { "show": true, "filter": true, "truncate": 100 }, "title": {} }], "valueAxes": [{ "id": "ValueAxis-1", "name": "LeftAxis-1", "type": "value", "position": "left", "show": true, "style": {}, "scale": { "type": "linear", "mode": "normal" }, "labels": { "show": true, "rotate": 0, "filter": false, "truncate": 100 }, "title": { "text": "Count" } }], "seriesParams": [{ "show": true, "type": "histogram", "mode": "stacked", "data": { "label": "Count", "id": "1" }, "valueAxis": "ValueAxis-1", "drawLinesBetweenPoints": true, "lineWidth": 2, "showCircles": true }], "addTooltip": true, "addLegend": true, "legendPosition": "right", "times": [], "addTimeMarker": false, "labels": { "show": false }, "thresholdLine": { "show": false, "value": 10, "width": 1, "style": "full", "color": "#34130C" }, "dimensions": { "x": null, "y": [{ "accessor": 0, "format": { "id": "number" }, "params": {}, "aggType": "count" }] } }, "aggs": [{ "id": "1", "enabled": true, "type": "count", "schema": "metric", "params": {} }, { "id": "2", "enabled": true, "type": "terms", "schema": "segment", "params": { "field": field + ".keyword", "orderBy": "1", "order": "desc", "size": top, "otherBucket": false, "otherBucketLabel": "Other", "missingBucket": false, "missingBucketLabel": "Missing" } }] }),
         "uiStateJSON": "{}",
         "kibanaSavedObjectMeta": {
            "searchSourceJSON": JSON.stringify({ "query": { "query": "", "language": "kuery" }, "filter": [], "indexRefName": "kibanaSavedObjectMeta.searchSourceJSON.index" }),
         }

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
      console.log(error);
      return false;
   })
}

function createSearch(name) {
   title = name.toLowerCase() + "-search"
   url = url_kibana_save_obj + "search/" + title;
   body = {
      "attributes": {
         "title": title,
         "columns": ["key", "loglevel", "host", "server", "value", "@timestamp"],
         "kibanaSavedObjectMeta": {
            "searchSourceJSON": JSON.stringify({ "highlightAll": true, "version": true, "query": { "language": "kuery", "query": "" }, "filter": [], "indexRefName": "kibanaSavedObjectMeta.searchSourceJSON.index" })
         },
         "sort": [
            ["@timestamp", "desc"]
         ]
      },
      "references": [
         {
            "name": "kibanaSavedObjectMeta.searchSourceJSON.index",
            "type": "index-pattern",
            // "id": "37d7bcc0-7a71-11ea-b089-87cc167e955c"
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

function createSearchByCond(name, index, fields, condition) {
   title = name.toLowerCase();
   url = url_kibana_save_obj + "search/" + title + "?overwrite=true";
   body = {
      "attributes": {
         "title": title,
         "columns": fields,
         "kibanaSavedObjectMeta": {
            "searchSourceJSON": JSON.stringify({ "highlightAll": true, "version": true, "query": { "language": "kuery", "query": condition }, "filter": [], "indexRefName": "kibanaSavedObjectMeta.searchSourceJSON.index" })
         },
         "sort": [
            // ["@timestamp", "desc"]
         ]
      },
      "references": [
         {
            "name": "kibanaSavedObjectMeta.searchSourceJSON.index",
            "type": "index-pattern",
            "id": index.toLowerCase() + "*"
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
      console.log(error);
      return false;
   })
}

function createDashboard(name) {
   title = name.toLowerCase() + "-dashboard"
   url = url_kibana_save_obj + "dashboard/" + title;
   body = {
      "attributes": {
         "title": title,
         "kibanaSavedObjectMeta": {
            "searchSourceJSON": JSON.stringify({
               "query": {
                  "query": "",
                  "language": "kuery"
               },
               "filter": []
            })
         },
         "optionsJSON": JSON.stringify({
            "useMargins": true,
            "hidePanelTitles": false
         }),
         "panelsJSON": JSON.stringify([{ "version": "7.5.2", "gridData": { "x": 0, "y": 0, "w": 48, "h": 16, "i": "d2b26ade-5b5b-4e96-837a-62a9e1382f46" }, "panelIndex": "d2b26ade-5b5b-4e96-837a-62a9e1382f46", "embeddableConfig": {}, "panelRefName": "panel_0" }, { "version": "7.5.2", "gridData": { "x": 0, "y": 16, "w": 48, "h": 19, "i": "1bfb07bd-8f5d-4fa3-a822-915360f508f9" }, "panelIndex": "1bfb07bd-8f5d-4fa3-a822-915360f508f9", "embeddableConfig": {}, "panelRefName": "panel_1" }]),
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
         },

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

function createDashboardSearch(name, pId) {
   title = name.toLowerCase();
   url = url_kibana_save_obj + "dashboard/" + title + "?overwrite=true";
   panelId = pId || "0a007e09-b359-4efe-874d-503695b96955";
   body = {
      "attributes": {
         "title": title,
         "kibanaSavedObjectMeta": {
            "searchSourceJSON": JSON.stringify({
               "query": {
                  "query": "",
                  "language": "kuery"
               },
               "filter": []
            })
         },
         "optionsJSON": JSON.stringify({
            "useMargins": true,
            "hidePanelTitles": false
         }),
         "panelsJSON": JSON.stringify([{ "version": "7.5.2", "gridData": { "x": 0, "y": 0, "w": 48, "h": 28, "i": "0a007e09-b359-4efe-874d-503695b96955" }, "panelIndex": panelId, "embeddableConfig": {}, "panelRefName": "panel_0" }]),
         "timeRestore": false
      },
      "references": [
         {
            "name": "panel_0",
            "type": "search",
            "id": name.toLowerCase() + "-search"
         },

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


   axios.get(url_kibana_save_obj + type + '/' + id, {
      headers: {
         "kbn-xsrf": true
      }
   }).then(response => {
      // console.log(response);
      return response;
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
/* DELETE file listing. */
router.delete('/:type/:id/', function (req, res) {
   var id = req.params.id.toLowerCase()
   var type = req.params.type
   axios.delete(url_kibana_save_obj + type + '/' + id).then(response => {
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

router.post('/createVisualizationByField/:name/:field/:top', function (req, res, next) {
   var name = req.params.name
   var field = req.params.field
   var top = req.params.top
   createVisualizationByField(name, field, top)
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

router.post('/createSearchByCond/:name', function (req, res, next) {
   var name = req.params.name.toLocaleLowerCase()
   var index = "" || req.body.index
   var fields = req.body.fields || [];
   var condition = "" || req.body.condition;
   // console.log(condition)
   createSearchByCond(name, index, fields, condition);
   if (1) {
      return res.json({
         success: true,
         url: config.url_discover + name
      });
   }
   else {
      return res.json({
         success: false,
      });
   }
});

router.post('/createDashboardSearch/:name', function (req, res, next) {
   var name = req.params.name.toLocaleLowerCase()
   var index = "" || req.body.index
   var fields = req.body.fields || [];
   var condition = "" || req.body.condition;
   var pId = req.body.penalIndex;
   // console.log(condition)
   createSearchByCond(name + '-search', index, fields, condition);
   createDashboardSearch(name,pId);
   if (1) {
      return res.json({
         success: true,
         url: config.url_dashboard + name+"?embed=true"
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
   return res.json({
      success: false,
      message: "Not impliment"
   });
});

module.exports = router;