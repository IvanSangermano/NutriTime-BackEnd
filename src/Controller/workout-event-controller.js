const getWorkoutEvent = async (req = request, res = response) => {
  try {
    const { name, places, duration, location, theme, members } = req.query;
    let termsWorkoutEvent = {};

    if (name) {
      const regex = new RegExp(name, 'i');
      termsWorkoutEvent.name = { $regex: regex };
    }
    if (places) {
      const regex = new RegExp(places, 'i');
      termsWorkoutEvent.places = { $regex: regex };
    }
    if (duration) {
      const regex = new RegExp(duration, 'i');
      termsWorkoutEvent.duration = { $regex: regex };
    }
    if (location) {
      const regex = new RegExp(location, 'i');
      termsWorkoutEvent.location = { $regex: regex };
    }
    if (theme) {
      const regex = new RegExp(theme, 'i');
      termsWorkoutEvent.theme = { $regex: regex };
    }
    if (members) {
      const regex = new RegExp(members, 'i');
      termsWorkoutEvent.members = { $regex: regex };
    }

    const workoutEvent = await User.find(termsWorkoutEvent);
    res.send(workoutEvent);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};
