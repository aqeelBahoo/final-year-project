var mongoose = require('mongoose');

var LoadSchema = new mongoose.Schema({
  network: String,
  number: String,
  rupees: String,
  date: String,
  user_id: {type:  String, required: true}
});

module.exports = mongoose.model('Loads', LoadSchema);
