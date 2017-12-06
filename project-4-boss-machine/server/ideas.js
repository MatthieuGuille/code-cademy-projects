const express = require('express');
const ideasRouter = express.Router();

const { createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea')

// Add the different ideas routes below
ideasRouter.get('/', (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  if (ideas) {
    res.send(ideas);
  } else {
    res.status(400).send("There is no idea in the database");
  }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  const idea = getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    res.send(idea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const idea = {
      id: req.params.ideaId,
      name: req.body.name,
      description: req.body.description,
      numWeeks: Number(req.body.numWeeks),
      weeklyRevenue: Number(req.body.weeklyRevenue)
    };
    const updatedIdea = updateInstanceInDatabase('ideas', idea);
    if (updatedIdea) {
      res.send(updatedIdea);
    } else {
      res.status(404).send();
    }
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const idea = {
      name: req.body.name,
      description: req.body.description,
      numWeeks: Number(req.body.numWeeks),
      weeklyRevenue: Number(req.body.weeklyRevenue)
    }
      const newIdea = addToDatabase('ideas', idea);
  if (newIdea) {
      res.status(201).send(newIdea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  if (!isNaN(req.params.ideaId)) {
    const deleteIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleteIdea) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } else {
    res.status(404).send();
  }
});


module.exports = ideasRouter;
