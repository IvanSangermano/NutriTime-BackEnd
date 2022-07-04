const { Schema, model } = require('mongoose');

const EventMemberSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  workoutEvent: {
    type: Schema.Types.ObjectId,
    ref: 'WorkoutEvent',
  },
});

module.exports = model('EventMember', EventMemberSchema);
