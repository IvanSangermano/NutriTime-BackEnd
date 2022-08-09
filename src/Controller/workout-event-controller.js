const { request, response } = require('express');
const WorkoutEvent = require('../Model/workout-event');

const getWorkoutEvent = async (req = request, res = response) => {
  try {
    const { name, places, duration, location, theme, members } = req.query;
    let termsUser = {};

    if (name) {
      const regex = new RegExp(name, 'i');
      termsUser.name = { $regex: regex };
    }
    if (lastName) {
      const regex = new RegExp(lastName, 'i');
      termsUser.lastName = { $regex: regex };
    }
    if (phone) {
      const regex = new RegExp(phone, 'i');
      termsUser.phone = { $regex: regex };
    }
    if (dni) {
      const regex = new RegExp(dni, 'i');
      termsUser.dni = { $regex: regex };
    }
    if (email) {
      const regex = new RegExp(email, 'i');
      termsUser.email = { $regex: regex };
    }

    const users = await User.find(termsUser);
    res.send(users);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};
