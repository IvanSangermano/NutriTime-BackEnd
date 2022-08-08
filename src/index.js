const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const seeder = require('./Helpers/seeder');
const { ConnectionDB } = require('./Database/config');

//Routes
const routerUsers = require('./Router/user-route');
const routerExercises = require('./Router/exercise-route');
const routerHealth = require('./Router/health-route');
const routerEventMembers = require('./Router/event-member-route');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(json());
app.use(cors());

app.use('/users', routerUsers);
app.use('/health', routerHealth);
app.use('/exercises', routerExercises);
app.use('/eventmembers', routerEventMembers);

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await ConnectionDB();
  await seeder();
});
