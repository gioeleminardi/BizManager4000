var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var Item = require('./InventoryItem');

router.get('/', (req, res) => {
    Item.find({}, (err, items) => {
        if (err) return res.status(500).send('There was a problem retrieving the items.');
        res.status(200).send(items);
    });
});

router.post('/', (req, res) => {
    Item.create({
        serialnumber: req.body.serialnumber,
        model: req.body.model,
        brand: req.body.brand,
        description: req.body.description
    }, (err, item) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(item);
    })
});

router.get('/search/descr/:text', (req, res) => {
    Item.findByDescription(req.params.text, (err, results) => {
        if (err) return res.status(500).send('There was a problem finding the items.');
        res.status(200).send(results);
    });
});


module.exports = router;