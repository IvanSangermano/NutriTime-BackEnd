const { Schema, model } = require('mongoose');

const PermissionSchema = Schema({
  role:{
    type: String,
  },
  users: {
    type: Boolean,
  },
  permissions: {
    type: Boolean,
  },
  exercises: {
    type: Boolean,
  },
  routinesAction: {
    type: Boolean,
  }, 
  routinesView: {
    type: Boolean,
  },   
  healthsAction: {
    type: Boolean,
  },
  healthsView: {
    type: Boolean,
  },
  subscriptions: {
    type: Boolean,
  },
  lessons: {
    type: Boolean,
  },
  workout: {
    type: Boolean,
  }
});

module.exports = model('Permission', PermissionSchema);
