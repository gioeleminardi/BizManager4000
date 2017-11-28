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

InventoryItemSchema.statics.findBySerialNumber = function (sn, cb) {
    return this.findOne({ serialnumber: sn }, cb);
}

InventoryItemSchema.statics.findAllByModel = function (model, cb) {
    return this.find({ model: model }, cb);
}

InventoryItemSchema.statics.findAllByBrand = function (brand, cb) {
    return this.find({ brand: brand }, cb);
}

InventoryItemSchema.statics.findAllByUserId = function (userId, cb) {
    return this.find({ user_id: userId }, cb);
}

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

InventoryItemSchema.statics.findBySerialNumberAndUpdate = function (sn, updatedItem, cb) {
    return this.findOneAndUpdate({ serialnumber: sn }, updatedItem, { new: true }, cb);
}

InventoryItemSchema.statics.findBySerialNumberAndRemove = function (sn, cb) {
    return this.findOneAndRemove({ serialnumber: sn }, cb);
}

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);