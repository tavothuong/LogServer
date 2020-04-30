var express = require('express');
var router = express.Router();
var config = require('../config/config')
const axios = require('axios');

router.get('/', function (req, res, next) {
    var index = "" || req.body.index;
    var query = "" || req.body.query;
    var url = config.uri_elasticsearch + (index ? "/" + index : "") + "/_search?" + (index ? "q=" + query : "")
    console.log(url);
    axios.get(url).then((response) => {
        // console.log(response.data);
        return {
            success: true,
            data:{
                total: response.data.hits.total.value,
                hits: response.data.hits.hits.map(item => item._source)
            }
        };
    }).catch((error) => {
        console.log(error);
        return {
            success: false,
            error: error
        };
    }).then(data =>{ res.json(data)});
});

module.exports = router;