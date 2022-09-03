const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Telephone is required'],
  },
  dni: {
    type: String,
    required: [true, 'Dni is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  permissionId: {
    type: Schema.Types.String,
    ref: 'Permission',
    required: [true, 'Permission required']
  },
  status: {
    type: Boolean,
    required: [true, 'status is required'],
  },
});

module.exports = model('User', UserSchema);
