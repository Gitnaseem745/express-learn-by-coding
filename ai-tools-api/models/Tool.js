const mongoose = require('mongoose');

const featuresSchema = new mongoose.Schema({
    name: { type: String, required: true },
    details: { type: String, required: true }
}, {
    _id: false
})

const toolSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, },
    tags: { type: [String], required: true },
    siteUrl: { type: String, required: true },
    features: { type: [featuresSchema] }
}, {
    timestamps: true
});

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;
