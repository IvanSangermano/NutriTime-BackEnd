const { request, response } = require('express');
const WorkoutEvent = require('../Model/workout-event');

const getWorkoutEvents = async (req = request, res = response) => {
  try {
    const { name, location, day, startHour, finalHour, classroom } = req.query;
    let termsWorkoutEvent = {};

    if (name) {
      const regex = new RegExp(name, 'i');
      termsWorkoutEvent.name = { $regex: regex };
    }
    if (location) {
      const regex = new RegExp(location, 'i');
      termsWorkoutEvent.location = { $regex: regex };
    }
    if (day) {
      const regex = new RegExp(day, 'i');
      termsWorkoutEvent.day = { $regex: regex };
    }
    if (startHour) {
      const regex = new RegExp(startHour, 'i');
      termsWorkoutEvent.startHour = { $regex: regex };
    }
    if (finalHour) {
      const regex = new RegExp(finalHour, 'i');
      termsWorkoutEvent.finalHour = { $regex: regex };
    }
    if (classroom) {
      const regex = new RegExp(classroom, 'i');
      termsWorkoutEvent.classroom = { $regex: regex };
    }
    
    const workoutEvent = await WorkoutEvent.find(termsWorkoutEvent);
    res.send(workoutEvent);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getWorkoutEvent = async (req = request, res = response) => {
  try {
    const workoutEventId = req.params.id;
    const workoutEvent = await WorkoutEvent.findById(workoutEventId);

    if (workoutEvent) {
      res.json(workoutEvent);
    } else {
      res.status(404).json({ error: 'Workout Event doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postWorkoutEvent = async (req = request, res = response) => {
  try {
    const workoutEvent = new WorkoutEvent(req.body);
    let workoutEventInHourExist = false;
    let workoutEventHourFinishHigherStart = false;

    const workoutEventInClassRoomAndDay = await WorkoutEvent.find({
      location: req.body.location,
      day: req.body.day,
      classroom: req.body.classroom,
    })
    if (!!workoutEventInClassRoomAndDay.length) {
      workoutEventInHourExist = true;
      for (let i = 0; i < workoutEventInClassRoomAndDay.length; i++) {
        if((workoutEvent.startHour < workoutEventInClassRoomAndDay[i].startHour) 
        && (workoutEvent.finalHour <= workoutEventInClassRoomAndDay[i].startHour))
        {
          workoutEventInHourExist = false;
        } else{
          if((workoutEvent.startHour >= workoutEventInClassRoomAndDay[i].finalHour) 
          && (workoutEvent.finalHour > workoutEventInClassRoomAndDay[i].finalHour))
          {
            workoutEventInHourExist = false;
          } else{
            workoutEventInHourExist = true;
            break;
          }
        }
      }
    }
    if (workoutEvent.startHour >= workoutEvent.finalHour) {
      workoutEventHourFinishHigherStart = true
    }

    if (workoutEventInHourExist) {
      res.status(400).json({
        error: 'Error, there is already a workout event at that time',
      });
    } else {
      if (workoutEventHourFinishHigherStart) {
        res.status(400).json({
          error: 'Error, the start time must be greater than the end time',
        });
      } else {
        await workoutEvent.save();
        res.status(201).json({
          message: 'Workout Event added successfully',
          data: workoutEvent,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
  }
};

const putWorkoutEvent = async (req = request, res = response) => {
  try {
    const workoutEventId = req.params.id;
    let workoutEvent = req.body;

    let workoutEventInHourExist = false;
    let workoutEventHourFinishHigherStart = false;
    let workoutEventOcuppiedIsHigherPlaces = false;

    const workoutEventInClassRoomAndDay = await WorkoutEvent.find({
      location: req.body.location,
      day: req.body.day,
      classroom: req.body.classroom,
      _id: { $ne: workoutEventId }
    });

    if (!!workoutEventInClassRoomAndDay.length) {
      workoutEventInHourExist = true;
      for (let i = 0; i < workoutEventInClassRoomAndDay.length; i++) {
        if((workoutEvent.startHour < workoutEventInClassRoomAndDay[i].startHour) 
        && (workoutEvent.finalHour <= workoutEventInClassRoomAndDay[i].startHour))
        {
          workoutEventInHourExist = false;
        } else{
          if((workoutEvent.startHour >= workoutEventInClassRoomAndDay[i].finalHour) 
          && (workoutEvent.finalHour > workoutEventInClassRoomAndDay[i].finalHour))
          {
            workoutEventInHourExist = false;
          } else{
            workoutEventInHourExist = true;
            break;
          }
        }
      }
    }
    if (workoutEvent.startHour >= workoutEvent.finalHour) {
      workoutEventHourFinishHigherStart = true
    }
    if (workoutEvent.places < workoutEvent.placesOccupied) {
      workoutEventOcuppiedIsHigherPlaces = true
    }

    if (workoutEventOcuppiedIsHigherPlaces) {
      return res.status(400).json({
        error: 'Error, the places have to be greater than the places that are occupied',
      });
    } else {
      if (workoutEventInHourExist) {
        return res.status(400).json({
          error: 'Error, there is already a workout event at that time',
        });
      } else {
        if (workoutEventHourFinishHigherStart) {
          return res.status(400).json({
            error: 'Error, the start time must be greater than the end time',
          });
        } else {
            workoutEvent = await WorkoutEvent.findByIdAndUpdate(
            workoutEventId,
            workoutEvent, 
            {new: true,}
          );
      }}
    }

    if (workoutEvent) {
      res.json({ message: 'Workout event modify successfully', data: workoutEvent });
    } else {
      res.status(404).json({ error: 'workout event doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteWorkoutEvent = async (req = request, res = response) => {
  try {
    const workoutEventId = req.params.id;
    const workoutEvent = await WorkoutEvent.findByIdAndDelete(workoutEventId);

    if (workoutEvent) {
      res.json({
        message: 'Workout Event deleted successfully',
        data: workoutEvent,
      });
    } else {
      res.status(404).json({ error: 'Workout Event doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
  getWorkoutEvent,
  getWorkoutEvents,
  putWorkoutEvent,
  postWorkoutEvent,
  deleteWorkoutEvent,
};
