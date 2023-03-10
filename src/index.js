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
const routerPermission = require('./Router/permission-route');
const routerWorkoutEvent = require('./Router/workout-event-route');
const routerPost = require('./Router/post-route');
const routerRoutine = require('./Router/routine-route');
const routerExerciseRoutine = require('./Router/exercise-routine-route');
const routerSubscription = require('./Router/subscription-route');
const routerValoration = require('./Router/valoration-route');


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(json());

app.use('/users', routerUsers);
app.use('/health', routerHealth);
app.use('/exercises', routerExercises);
app.use('/eventmembers', routerEventMembers);
app.use('/permission', routerPermission);
app.use('/workoutevents', routerWorkoutEvent);
app.use('/routines', routerRoutine);
app.use('/exerciseroutines', routerExerciseRoutine);
app.use('/subscription', routerSubscription);
app.use('/post', routerPost);
app.use('/valoration', routerValoration);


app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await ConnectionDB();
  await seeder();
});
