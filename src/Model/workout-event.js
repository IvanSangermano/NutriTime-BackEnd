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
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  day: {
    type: String,
    required: [true, 'Day is required'],
  },
  startHour: {
    type: String,
    required: [true, 'Start hour is required'],
  },
  finalHour: {
    type: String,
    required: [true, 'Final hour is required'],
  },
  classroom: {
    type: String,
    required: [true, 'Classroom is required'],
  },
  placesOccupied: {
    type: String,
    required: [true, 'Places occupied is required'],
  }
});

module.exports = model('WorkoutEvent', WorkoutEventSchema);
