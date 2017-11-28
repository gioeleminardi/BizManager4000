var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var User = require('./User');

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send('There was a problem retrieving the users.');
        res.status(200).send(users);
    });
});

router.post('/', (req, res) => {
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    }, (err, user) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(user);
    })
});

router.get('/:username', (req, res) => {
    User.findByUsername(req.params.username, (err, user) => {
        if (err) return res.status(500).send('There was a problem finding the user.');
        if (!user) return res.status(404).send(`User ${req.params.username} not found.`);
        res.status(200).send(user);
    });
});

router.delete('/:username', (req, res) => {
    User.findByUsernameAndRemove(req.params.username, (err, user) => {
        if (err) return res.status(500).send('There was a problem removing the user.');
        res.status(200).send(`User ${user.username} was deleted.`);        
    });
});

router.put('/:username', (req, res) => {
    User.findByUsernameAndUpdate(req.params.username, req.body, (err, user) => {
        if (err) return res.status(500).send('There was a problem updating the user.');
        res.status(200).send(user);        
    });
});

module.exports = router;