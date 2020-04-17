var express = require("express");
var router = express.Router();

router.get("/:servername", function (req, res, next) {
    servername = req.params.servername;
    console.log(servername);
    a=["action","result"]
    res.json({result: a});
    
});

module.exports = router;

