const express = require('express');
const minionsRouter = express.Router();

const { createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

const workRouter = require('./work');
minionsRouter.use('/:minionId/work', workRouter);

// Add the different minions routes below
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  if (minions) {
    res.send(minions);
  } else {
    res.status(400).send("There is no minion in the database");
  }
});

minionsRouter.get('/:minionId', (req, res, next) => {
  const requestedMinion = getFromDatabaseById('minions', req.params.minionId);
  if (requestedMinion) {
    res.send(requestedMinion);
  } else {
    res.status(404).send();
  }
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const minion = {
      id: req.params.minionId,
      name: req.body.name,
      title: req.body.title,
      weaknesses: req.body.weaknesses,
      salary: Number(req.body.salary)
    };
    const updatedMinion = updateInstanceInDatabase('minions', minion);
    if (updatedMinion) {
      res.send(updatedMinion);
    } else {
      res.status(404).send();
    }
});

minionsRouter.post('/', (req, res, next) => {
  const minion = {
    name: req.body.name,
    title: req.body.title,
    weaknesses: req.body.weaknesses,
    salary: Number(req.body.salary)
  }
  const newMinion = addToDatabase('minions', minion);
  if (newMinion) {
    res.status(201).send(newMinion);
  } else {
    res.status(404).send();
  }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  if (!isNaN(req.params.minionId)) {
    const deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleteMinion) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
});


module.exports = minionsRouter;
