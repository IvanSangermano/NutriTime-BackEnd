const { Schema, model } = require('mongoose');

const PostSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  likes: {
    type: String,
    required: [true, 'likes is required'],
  },
  type: {
    type: String,
    required: [true, 'type is required'],
  },
});

module.exports = model('Post', PostSchema);
