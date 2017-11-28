var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

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
        description: req.body.description,
        user_id: req.body.user_id
    }, (err, item) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(item);
    });
});

router.get('/:serialnumber', (req, res) => {
    Item.findBySerialNumber(req.params.serialnumber, (err, item) => {
        if (err) return res.status(500).send('There was a problem retrieving the item.');
        res.status(200).send(item);
    });
});

router.get('/model/:model', (req, res) => {
    Item.findAllByModel(req.params.model, (err, items) => {
        if (err) return res.status(500).send('There was a problem retrieving the items.');
        res.status(200).send(items);
    });
});

router.get('/brand/:brand', (req, res) => {
    Item.findAllByBrand(req.params.brand, (err, items) => {
        if (err) return res.status(500).send('There was a problem retrieving the items.');
        res.status(200).send(items);
    });
});

router.get('/user_id/:userid', (req, res) => {
    Item.findAllByUserId(req.params.userid, (err, items) => {
        if (err) return res.status(500).send('There was a problem retrieving the items.');
        res.status(200).send(items);
    });
});

router.get('/search/descr/:text', (req, res) => {
    Item.findByDescription(req.params.text, (err, items) => {
        if (err) return res.status(500).send('There was a problem finding the items.');
        res.status(200).send(items);
    });
});

module.exports = router;