'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const InventoryItemSchema = new Schema({
    serialnumber: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    model: {
        type: String,
        trim: true,
        required: true,
        index: true
    },
    brand: {
        type: String,
        trim: true,
        required: true,
        index: true
    },
    description: {
        type: String,
        trim: true,
        index: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }
});

InventoryItemSchema.index({ description: 'text' });

InventoryItemSchema.statics.findByDescription = function (description, cb) {
    return this.find(
        {
            $text:
                {
                    $search: description
                }
        },
        {
            score:
                {
                    $meta: "textScore"
                }
        })
        .sort({ score: { $meta: 'textScore' } })
        .exec(cb);
}

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);