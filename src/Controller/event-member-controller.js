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
      termsEventMember.workoutEvent = workoutEvent;
    } 
    const eventMember = await EventMember.find(termsEventMember);
    res.send(eventMember);
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
  }
};

const getEventMembersListOfParticipants = async (req = request, res = response) => {
  try {
    const { workoutEvent } = req.query;
    let termsEventMember = {};

    if (workoutEvent) {
      termsEventMember.workoutEvent = workoutEvent;
    } 
    const eventMember = await EventMember.find(termsEventMember).populate("userId");
    res.send(eventMember);
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
  }
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
    const eventMemberExist = await EventMember.findOne({
      userId: req.body.userId,
      workoutEvent: req.body.workoutEvent,
    });

    if (eventMemberExist) {
      res.status(400).json({
        error: 'Error, existing Event Member',
      });
    } else {
      await eventMember.save();
      res.status(201).json({
        message: 'Event Member added successfully',
        data: eventMember
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
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
  getEventMembersListOfParticipants,
  deleteEventMember,
};
