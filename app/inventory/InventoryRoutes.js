'use strict';
const express = require('express');
const router = express.Router();

const item_controller = require('./InventoryController');

router.get('/', item_controller.get_all_items);
router.post('/', item_controller.create_item);
router.get('/:serialnumber', item_controller.get_item);
router.put('/:serialnumber', item_controller.update_item);
router.delete('/:serialnumber', item_controller.delete_item);
router.get('/search', item_controller.search_item);

module.exports = router;