var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  content: String,
  type: String,  // indicates user or group account type
  typeId: Schema.Types.ObjectId, // user or group ID
  created: {
    type: Date,
    default: Date.now,
  }
});

exports.model = mongoose.model('Message', messageSchema);
exports.schema = messageSchema;
