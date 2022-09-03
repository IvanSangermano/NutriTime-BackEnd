const { Schema, model } = require('mongoose');

const PermissionSchema = Schema({
  role:{
    type: String,
  },
  addUser: {
    type: Boolean,
  },
  modifyUser: {
    type: Boolean,
  },
  deleteUser: {
    type: Boolean,
  },
  addHealth: {
    type: Boolean,
  },  
  modifyHealth: {
    type: Boolean,
  },
  deleteHealth: {
    type: Boolean,
  },
  addExcercises: {
    type: Boolean,
  },
  modifyExcercises: {
    type: Boolean,
  },
  deleteExcercises: {
    type: Boolean,
  },
  addRoutines: {
    type: Boolean,
  },
  modifyRoutines: {
    type: Boolean,
  },
  deleteRoutines: {
    type: Boolean,
  },
  addSuscription: {
    type: Boolean,
  },
  modifySuscription: {
    type: Boolean,
  },
  deleteSuscription: {
    type: Boolean,
  },
});

module.exports = model('Permission', PermissionSchema);
