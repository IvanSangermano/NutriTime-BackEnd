const { Schema, model } = require('mongoose');

const ValorationSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },  
  valoration: {
    type: String,
    required: [true, 'valoration is required'],
  },
});

module.exports = model('Valorations', ValorationSchema);
