const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  arrayPermision: {
    type: Schema.Types.ObjectId,
    ref: 'Permission',
  },
});

module.exports = model('Role', RoleSchema);
