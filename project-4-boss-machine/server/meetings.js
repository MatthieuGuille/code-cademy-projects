const express = require('express');
const meetingsRouter = express.Router();

const { createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

// Add the different meetings routes below
meetingsRouter.get('/', (req, res, next) => {
  const meetings = getAllFromDatabase('meetings');
  if (meetings) {
    res.send(meetings);
  } else {
    res.status(400).send("There is no meeting in the database");
  }
});

meetingsRouter.post('/', (req, res, next) => {
  const meeting = createMeeting();
  const newMeeting = addToDatabase('meetings', meeting);
  if (newMeeting) {
    res.status(201).send(newMeeting);
  } else {
    res.status(400)
  }
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleteMeetings = deleteAllFromDatabase('meetings');
    res.status(204).send();
});


module.exports = meetingsRouter;
