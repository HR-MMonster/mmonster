var mongoose = require('mongoose');
var Schema = mongoose.Shcema;

var messageSchema = new Schema({
  message: String,
  type: String,  // indicates user or group account type
  typeId: Schema.Types.ObjectId, // user or group ID
  created: {
    type: Date,
    default: Date.now,
  }
});

exports.model = mongoose.model('Message', messageSchema);
exports.schema = messageSchema;
