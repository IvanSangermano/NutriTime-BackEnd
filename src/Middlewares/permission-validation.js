const { body } = require('express-validator');

const permissionValidations = () => {
  return [
    body('addUser' , 'permission add User is required').notEmpty().isBoolean(),
    body('modifyUser', 'permission modify User is required').notEmpty().isBoolean(),
    body('deleteUser', 'permission delete User is required').notEmpty().isBoolean(),
    body('addHealth', 'permission add Health is required').notEmpty().isBoolean(),
    body('modifyHealth', 'permission modify Health is required').notEmpty().isBoolean(),
    body('deleteHealth', 'permission delete Health is required').notEmpty().isBoolean(),
    body('addExcercises', 'permission add Excercises is required').notEmpty().isBoolean(),
    body('modifyExcercises', 'permission modify Excercises is required').notEmpty().isBoolean(),
    body('deleteExcercises', 'permission delete Excercises is required').notEmpty().isBoolean(),
    body('addRoutines', 'permission add Routines is required').notEmpty().isBoolean(),
    body('modifyRoutines', 'permission modify Routines is required').notEmpty().isBoolean(),
    body('deleteRoutines', 'permission delete Routines is required').notEmpty().isBoolean(),
    body('addSuscription', 'permission add Suscription is required').notEmpty().isBoolean(),
    body('modifySuscription', 'permission modify Suscription is required').notEmpty().isBoolean(),
    body('deleteSuscription', 'permission delete Suscription is required').notEmpty().isBoolean()
  ];
};

module.exports = permissionValidations;