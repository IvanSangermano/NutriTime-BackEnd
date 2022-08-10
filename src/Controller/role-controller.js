const { request, response } = require('express');
const Role = require('../Model/role');

const getRoles = async (req = request, res = response) => {
  try {
    const { name } = req.query;
    let termRole = {};

    if (name) {
        const regex = new RegExp(name, 'i');
        termRole.name = { $regex: regex };
    }

    const roles = await Role.find(termRole);
    res.send(roles);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getRole = async (req = request, res = response) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);

    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ error: 'Role doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postRole = async (req = request, res = response) => {
  try {
    const role = new Role(req.body);
    const roleExist = await Role.findOne({
        name : req.body.name,
    });
    if (roleExist) {
      res.status(400).json({
        error: 'Error, existing role',
      });
    } else {
      await role.save();
      res.status(201).json({ message: 'Role added successfully', data: role });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const putRole = async (req = request, res = response) => {
  try {
    const roleId = req.params.id;
    let role = req.body;

    const roleExist = await Role.findOne({
        name : req.body.name,
    });
    if (roleExist) {
      return res.status(400).json({
        error: 'Error, existing role',
      });
    } else {
        role = await Role.findByIdAndUpdate(roleId, role, {
        new: true,
      });
    }
    if (role) {
      res.json({ message: 'Role modify successfully', data: role });
    } else {
      res.status(404).json({ error: 'Role doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteRole = async (req = request, res = response) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findByIdAndDelete(roleId);

    if (role) {
      res.json({ message: 'Role deleted successfully', data: role });
    } else {
      res.status(404).json({ error: 'Role doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
    getRoles,
    getRole,
    postRole,
    putRole,
    deleteRole
};
