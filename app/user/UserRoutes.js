'use strict';
const express = require('express');
const router = express.Router();

const user_controller = require('./UserController');
const item_controller = require('../inventory/InventoryController');

router.get('/', user_controller.get_all_users);
router.post('/', user_controller.create_user);
router.get('/:username', user_controller.get_user);
router.get('/:username/items', item_controller.get_user_items);
router.put('/:username', user_controller.update_user);
router.delete('/:username', user_controller.delete_user);

module.exports = router;