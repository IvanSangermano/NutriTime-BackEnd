const { request, response } = require('express');
const ExerciseRoutine = require('../Model/exercise-routine');

const getExerciseRoutines = async (req = request, res = response) => {
  try {
    const { routineId } = req.query;
    let termsExerciseRoutine = {};

    if (routineId) {
      termsExerciseRoutine.routineId = routineId
    }

    const exerciseRoutine = await ExerciseRoutine.find(termsExerciseRoutine).populate("exerciseId");
    res.send(exerciseRoutine);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getExerciseRoutine = async (req = request, res = response) => {
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
    let exerciseIsLowerTo1 = false
    const exerciseRoutine = new ExerciseRoutine(req.body);
    const exerciseRoutinePositionExist = await ExerciseRoutine.findOne({
      routineId: req.body.routineId,
      position: req.body.position,
      day: req.body.day,
    });
    
    if(exerciseRoutine.position < 1) {
      exerciseIsLowerTo1 = true
    }
    if (exerciseIsLowerTo1) {
      res.status(400).json({
        error: 'Error, position is lower to 1',
      });
    } else {
      if (exerciseRoutinePositionExist) {
        res.status(400).json({
          error: 'Error, existing exercise in routine on this position',
        });
      } else {
        console.log(exerciseRoutine)
        await exerciseRoutine.save();
        res.status(201).json({
          message: 'Exercise routine added successfully',
          data: await ExerciseRoutine.findOne({
            _id: exerciseRoutine._id
          }).populate("exerciseId")
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
  }
};

const putExerciseRoutine = async (req = request, res = response) => {
  try {
    const exerciseRoutineId = req.params.id;
    let exerciseRoutine = req.body;
    const exerciseRoutinePositionExist = await ExerciseRoutine.findOne({
      routineId: req.body.routineId,
      position: req.body.position,
      day: req.body.day,
      _id: { $ne: exerciseRoutineId },
    });

    if (exerciseRoutinePositionExist) {
      return res.status(400).json({
        error: 'Error, existing exercise in routine on this position',
      });
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
      res.json({ data: await ExerciseRoutine.findOne({
        _id: exerciseRoutine._id
        }).populate("exerciseId")
      });
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
    const exerciseRoutine = await ExerciseRoutine.findByIdAndDelete(exerciseRoutineId);

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
