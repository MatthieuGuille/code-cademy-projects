const express = require('express');
const timesheetsRouter = express.Router({ mergeParams: true });

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// selects a timesheet from a valid timesheetId and handles invalid timesheetId
timesheetsRouter.param('timesheetId', (req, res, next, timesheetId) => {
  const sql = 'SELECT * FROM Timesheet WHERE id = $timesheetId';
  const values = { $timesheetId: timesheetId };
  db.get(sql, values, (err, row) => {
    if (err) {
      next(err);
    } else if (row) {
      req.timesheet = row;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// return all timesheets
timesheetsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Timesheet WHERE employee_id = $employeeId', { $employeeId: req.params.employeeId }, (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ timesheets: rows });
    }
  });
});

// return one timesheet
timesheetsRouter.get('/:timesheetId', (req, res, next) => {
  res.status(200).json({ timesheet: req.timesheet });
});

// creates a new timesheet and returns the newly created timesheet
timesheetsRouter.post('/', (req, res, next) => {
  const hours = req.body.timesheet.hours;
  const rate = req.body.timesheet.rate;
  const date = req.body.timesheet.date;
  const employeeId = req.params.employeeId;
  if (!hours || !rate || !date ) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO Timesheet (hours, rate, date, employee_id) VALUES ($hours, $rate, $date, $employeeId)';
  const values = {
    $hours: hours,
    $rate: rate,
    $date: date,
    $employeeId: employeeId
  };

  db.run(sql, values, function(err) {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Timesheet WHERE id = ${this.lastID}`, (err, row) => {
        res.status(201).json({ timesheet: row });
      });
    }
  });
});

// updates an existing employee
timesheetsRouter.put('/:timesheetId', (req, res, next) => {
  const hours = req.body.timesheet.hours;
  const rate = req.body.timesheet.rate;
  const date = req.body.timesheet.date;
  const employeeId = req.params.employeeId;
  if (!hours || !rate || !date) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE Timesheet SET hours = $hours, rate = $rate, date = $date WHERE employee_id = $employeeId AND Id = $timesheetId';

  const values = {
    $hours: hours,
    $rate: rate,
    $date: date,
    $employeeId: employeeId,
    $timesheetId: req.params.timesheetId
  };

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get('SELECT * FROM Timesheet WHERE id = $timesheetId', { $timesheetId: req.params.timesheetId }, (err, row) => {
        res.status(200).json({ timesheet: row });
      });
    }
  });
});

// deletes an existing employee
timesheetsRouter.delete('/:timesheetId', (req, res, next) => {
  const sql = 'DELETE FROM Timesheet WHERE id = $timesheetId';
  const values = { $timesheetId: req.params.timesheetId };

  db.run(sql, values, (err) => {
    if (err) {
      next (err);
    } else {
        res.sendStatus(204);
    }
  });
});

module.exports = timesheetsRouter;
