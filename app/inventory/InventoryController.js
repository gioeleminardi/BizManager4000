'use strict';
var Item = require('./InventoryItem');

exports.get_all_items = (req, res) => {
    Item.find({}, (err, items) => {
        if (err) res.send(err);
        res.json(items);
    });
};

exports.get_item = (req, res) => {
    Item.findOne({ serialnumber: req.params.serialnumber }, (err, item) => {
        if (err) res.send(err);
        res.json(item);
    });
};

exports.create_item = (req, res) => {
    const newItem = new Item(req.body);
    newItem.save((err, item) => {
        if (err) res.send(err);
        res.json(item);
    });
};

exports.update_item = (req, res) => {
    Item.findOneAndUpdate({ serialnumber: serialnumber }, req.body, { new: true }, (err, item) => {
        if (err) res.send(err);
        res.json(item);
    });
};

exports.delete_item = (req, res) => {
    Item.findOneAndRemove({ serialnumber: serialnumber }, (err, item) => {
        if (err) res.send(err);
        res.json({ message: 'Item successfully deleted.' });
    });
};

exports.get_user_items = (req, res) => {
    Item.find({ user_id: req.params.userid }, (err, items) => {
        if (err) res.send(err);
        res.json(items);
    });
};

exports.search_item = (req, res) => {
    let searchType = req.query.field;
    if (searchType === 'description') {
        Item.findByDescription(req.query.value, (err, items) => {
            if (err) res.send(err);
            res.json(items);
        });
    } else if (searchType === 'model' || searchType == 'brand' || searchType == 'user_id') {
        Item.find({ searchType: req.query.value }, (err, items) => {
            if (err) res.send(err);
            res.json(items);
        });
    } else {
        res.status(404).json({ message: 'field not valid.' });
    }
}