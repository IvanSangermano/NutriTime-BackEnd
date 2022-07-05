const { Schema, model } = require('mongoose');

const PermissionSchema = Schema({
  addUser: {
    type: Boolean,
  },
  mdifyUser: {
    type: Boolean,
  },
  deleteUser: {
    type: Boolean,
  },
  addHeight: {
    type: Boolean,
  },
  addweight: {
    type: Boolean,
  },
});

module.exports = model('Permission', PermissionSchema);
