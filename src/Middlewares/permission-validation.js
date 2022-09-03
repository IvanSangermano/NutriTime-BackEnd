const { body } = require('express-validator');

const permissionValidations = () => {
  return [
    body('role').notEmpty().isString().trim(),
    body('addUser').isBoolean(),
    body('modifyUser').isBoolean(),
    body('deleteUser').isBoolean(),
    body('addHealth').isBoolean(),
    body('modifyHealth').isBoolean(),
    body('deleteHealth').isBoolean(),
    body('addExcercises').isBoolean(),
    body('modifyExcercises').isBoolean(),
    body('deleteExcercises').isBoolean(),
    body('addRoutines').isBoolean(),
    body('modifyRoutines').isBoolean(),
    body('deleteRoutines').isBoolean(),
    body('addSuscription').isBoolean(),
    body('modifySuscription').isBoolean(),
    body('deleteSuscription').isBoolean()
  ];
};

module.exports = permissionValidations;