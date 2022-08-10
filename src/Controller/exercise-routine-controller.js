const { request, response } = require('express');
const ExerciseRoutine = require('../Model/exercise-routine');

const getExerciseRoutine = async (req = request, res = response) => {
  try {
    const { routineId, breakDuration, duration } = req.query;
    let termsExerciseRoutine = {};

    if (routineId) {
      const regex = new RegExp(name, 'i');
      termsExerciseRoutine.name = { $regex: regex };
    }
    if (breakDuration) {
      const regex = new RegExp(breakDuration, 'i');
      termsExerciseRoutine.breakDuration = { $regex: regex };
    }
    if (duration) {
      const regex = new RegExp(duration, 'i');
      termsExerciseRoutine.duration = { $regex: regex };
    }

    const exerciseRoutine = await Exercise.find(termsExerciseRoutine);
    res.send(exerciseRoutine);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getExerciseRoutines = async (req = request, res = response) => {
  try {
    const exerciseRoutineId = req.params.id;
    const exerciseRoutine = await ExerciseRoutine.findById(exerciseRoutineId);

    if (exerciseRoutine) {
      res.json(exerciseRoutine);
    } else {
      res.status(404).json({ error: 'Exercise Routine doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postExerciseRoutine = async (req = request, res = response) => {
  try {
    const exerciseRoutine = new ExerciseRoutiner(req.body);
    const exerciseRoutineExist = await ExerciseRoutiner.findOne(
      exerciseRoutine
    );

    if (exerciseRoutineExist) {
      res.status(400).json({
        error: 'Error, existing exercise routine',
      });
    } else {
      await ExerciseRoutiner.save();
      res.status(201).json({
        message: 'Exercise routine added successfully',
        data: exerciseRoutine,
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
  }
};

const putExerciseRoutine = async (req = request, res = response) => {
  try {
    const exerciseRoutineId = req.params.id;
    let exerciseRoutine = req.body;

    const exerciseRoutineExist = await ExerciseRoutine.findOne({
      breakDuration: req.body.breakDuration,
      duration: req.body.duration,
      exercise: req.body.exercise,
      _id: { $ne: exerciseRoutineId },
    });

    if (exerciseRoutineExist) {
      return res
        .status(400)
        .json({ error: 'Error, existing Exercise routine' });
    } else {
      exerciseRoutine = await ExerciseRoutine.findByIdAndUpdate(
        exerciseRoutineId,
        exerciseRoutine,
        {
          new: true,
        }
      );
    }
    if (exerciseRoutine) {
      res.json({ data: exerciseRoutine });
    } else {
      res.status(404).json({ error: 'Exercise routine doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteExerciseRoutine = async (req = request, res = response) => {
  try {
    const exerciseRoutineId = req.params.id;
    const exerciseRoutine = await Exercise.findByIdAndDelete(exerciseRoutineId);

    if (exerciseRoutine) {
      res.json({
        message: 'Exercise routine deleted successfully',
        data: exerciseRoutine,
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
  getExerciseRoutine,
  getExerciseRoutines,
  postExerciseRoutine,
  putExerciseRoutine,
  deleteExerciseRoutine,
};
