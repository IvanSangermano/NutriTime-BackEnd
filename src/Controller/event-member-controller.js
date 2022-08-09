const { request, response } = require('express');
const EventMember = require('../Model/event-member');

const getEventMembers = async (req = request, res = response) => {
  try {
    const { userId, workoutEvent } = req.query;
    let termsEventMember = {};

    if (userId) {
      termsEventMember.userId = userId;
    }
    if (workoutEvent) {
      const regex = new RegExp(workoutEvent, 'i');
      termsEventMember.workoutEvent = { $regex: regex };
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
  }

  const eventMember = await EventMember.find(termsEventMember);
  res.send(eventMember);
};

const getEventMember = async (req = request, res = response) => {
  try {
    const eventMemberId = req.params.id;
    const eventMember = await EventMember.findById(eventMemberId);

    if (eventMember) {
      res.json(eventMember);
    } else {
      res.status(404).json({ error: 'eventMember doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postEventMember = async (req = request, res = response) => {
  try {
    const eventMember = new EventMember(req.body);
    const eventMemberExist = await EventMember.findOne(eventMember);

    if (eventMemberExist) {
      res.status(400).json({
        error: 'Error, existing Event Member',
      });
    } else {
      await eventMember.save();
      res.status(201).json({
        message: 'Event Member added successfully',
        data: eventMember,
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
  }
};

const putEventMember = async (req = request, res = response) => {
  try {
    const eventMemberId = req.params.id;
    let eventMember = req.body;

    eventMember = await eventMember.findByIdAndUpdate(
      eventMemberId,
      eventMember,
      {
        new: true,
      }
    );

    if (eventMember) {
      res.json({ data: eventMember });
    } else {
      res.status(404).json({ error: 'Event Member doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteEventMember = async (req = request, res = response) => {
  try {
    const eventMemberId = req.params.id;
    const eventMember = await EventMember.findByIdAndDelete(eventMemberId);

    if (eventMember) {
      res.json({
        message: 'Event Member deleted successfully',
        data: eventMember,
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
  getEventMember,
  getEventMembers,
  postEventMember,
  putEventMember,
  deleteEventMember,
};
