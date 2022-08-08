const { Schema, model } = require('mongoose');

const ExerciseSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  area: {
    type: String,
    required: [true, 'Area is required'],
  },
  expecifyMuscle: {
    type: String,
    required: [true, 'ExpecifyMuscle is required'],
  },
});

module.exports = model('Exercise', ExerciseSchema);
