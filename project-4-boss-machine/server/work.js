const express = require('express');
const workRouter = express.Router();

const { createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');

workRouter.param('minionId', (req, res, next, minionId) => {
  const requestedMinion = getFromDatabaseById('minions', minionId);
  if (requestedMinion) {
    req.minionId = minionId;
    next();
  } else {
    res.status(404).send();
  }
});

workRouter.get('/', (req, res, next) => {
  const works = getAllFromDatabase('work');
  if (works) {
    let minionWorks = [];
    for (let i=0; i<works.length; i++) {
      if (works[i].minionId === req.minionId) {
        minionWorks.push(works[i]);
      }
    }
    res.send(minionWorks);
  } else {
    res.status(400).send("There is no work in the database");
  }
});

workRouter.put('/:workId', (req, res, next) => {
    const updatedWork = updateInstanceInDatabase('work', req.body);
    if (updatedWork) {
      res.send(updatedWork);
    } else {
      res.status(404).send();
    }
});

workRouter.post('/', (req, res, next) => {
  const newWork = addToDatabase('work', req.body);
  if (newWork) {
    res.status(201).send(newWork);
  } else {
    res.status(404).send();
  }
});

workRouter.delete('/:workId', (req, res, next) => {
    const deleteWork = deleteFromDatabasebyId('work', req.params.workId);
    if (deleteWork) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
});


module.exports = workRouter;
