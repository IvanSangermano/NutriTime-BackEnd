const { request, response } = require('express');
const Valoration = require('../Model/valoration');

const getValorations = async (req = request, res = response) => {
  try {
    const { postId, userId } = req.query;
    let termValoration = {};

    if (postId) {
        termValoration.postId = postId;
    }
    if (userId) {
        termValoration.userId = userId;
    }

    const valorations = await Valoration.find(termValoration);
    res.send(valorations);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const getValoration = async (req = request, res = response) => {
  try {
    const valorationId = req.params.id;
    const valoration = await Valoration.findById(valorationId);

    if (valoration) {
      res.json(valoration);
    } else {
      res.status(404).json({ error: 'Valoration doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postValoration = async (req = request, res = response) => {
  try {
    const valoration = new Valoration(req.body);
    const valorationExist = await Valoration.findOne({
        userId : req.body.userId,
        postId : req.body.postId,
    });
    if (valorationExist) {
      res.status(400).json({
        error: 'Error, existing Valoration',
      });
    } else {
      await valoration.save();
      res.status(201).json({ message: 'Valoration added successfully', data: valoration });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const putValoration = async (req = request, res = response) => {
  try {
    const valorationId = req.params.id;
    let valoration = req.body;

    const valorationExist = await Valoration.findOne({
        userId : req.body.userId,
        postId : req.body.postId,
        _id: { $ne: valorationId },
    });
    if (valorationExist) {
      return res.status(400).json({
        error: 'Error, existing valoration',
      });
    } else {
        valoration = await Valoration.findByIdAndUpdate(valorationId, valoration, {
        new: true,
      });
    }
    if (valoration) {
      res.json({ message: 'Valoration modify successfully', data: valoration });
    } else {
      res.status(404).json({ error: 'Valoration doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteValoration = async (req = request, res = response) => {
  try {
    const valorationId = req.params.id;
    const valoration = await Valoration.findByIdAndDelete(valorationId);

    if (valoration) {
      res.json({ message: 'Valoration deleted successfully', data: valoration });
    } else {
      res.status(404).json({ error: 'Valoration doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
    getValorations,
    getValoration,
    postValoration,
    putValoration,
    deleteValoration
};
