const { Schema, model } = require('mongoose');

const WorkoutEventSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  places: {
    type: String,
    required: [true, 'Places is required'],
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  day: {
    type: String,
    required: [true, 'Day is required'],
  },
  hour: {
    type: String,
    required: [true, 'Hour is required'],
  },
  classroom: {
    type: String,
    required: [true, 'Classroom is required'],
  }
});

module.exports = model('WorkoutEvent', WorkoutEventSchema);
