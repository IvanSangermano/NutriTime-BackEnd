const User = require('../Model/user');
const Permission = require('../Model/permission');
const bcrypt = require('bcrypt');

const pwd = 'test1234';

const seeder = async () => {
  const existingUser = await User.findOne();
  if (existingUser) return;
  console.log('No user was found, creating one...');

  const permission = new Permission()
  permission.role = "admin";
  permission.users = true;
  permission.permissions = true;
  permission.exercises = true;
  permission.routinesAction = true;
  permission.routinesView = true;
  permission.healthsAction = true;
  permission.healthsView = true;
  permission.subscriptions = true;
  permission.lessons = true;
  permission.workou = true;
  await permission.save()

  const user = new User();
  user.email = 'user@mail.com';
  user.name = 'Lionel';
  user.lastName = 'Messi';
  user.phone = '1231231231';
  user.dni = '12312323';
  user.status = true;
  user.permissionRole = "admin";
  user.password = await bcrypt.hash(pwd, 12);

  await user.save();
  console.log(`[User created] \nemail: ${user.email} \npassword: ${pwd} `);
};

module.exports = seeder;
