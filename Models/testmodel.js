const {model , Schema} = require('mongoose');

const testSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
});

module.exports = model('Test', testSchema);
