const express = require('express');
const employeesRouter = express.Router();
const timesheetsRouter = require('./timesheets.js')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// selects an employee from a valid employeeId and handles invalid employeeId
employeesRouter.param('employeeId', (req, res, next, employeeId) => {
  const sql = 'SELECT * FROM Employee WHERE id = $employeeId';
  const values = { $employeeId: employeeId };
  db.get(sql, values, (err, row) => {
    if (err) {
      next(err);
    } else if (row) {
      req.employee = row;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

employeesRouter.use('/:employeeId/timesheets', timesheetsRouter);

// return all employees
employeesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Employee WHERE is_current_employee = 1', (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ employees: rows });
    }
  });
});

// return one employee
employeesRouter.get('/:employeeId', (req, res, next) => {
  res.status(200).json({ employee: req.employee });
});

// creates a new employee and returns the newly created employee
employeesRouter.post('/', (req, res, next) => {
  const name = req.body.employee.name;
  const position = req.body.employee.position;
  const wage = req.body.employee.wage;

  if (!name || !position || !wage) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO Employee (name, position, wage) VALUES ($name, $position, $wage)';
  const values = {
    $name: name,
    $position: position,
    $wage: wage
  };

  db.run(sql, values, function(err) {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Employee WHERE id = ${this.lastID}`, (err, row) => {
        res.status(201).json({ employee: row });
      });
    }
  });
});

// updates an existing employee and returns the updated employee
employeesRouter.put('/:employeeId', (req, res, next) => {
  const name = req.body.employee.name;
  const position = req.body.employee.position;
  const wage = req.body.employee.wage;
  if (!name || !position || !wage) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE Employee SET name = $name, position = $position, wage = $wage WHERE id = $employeeId';

  const values = {
    $name: name,
    $position: position,
    $wage: wage,
    $employeeId: req.params.employeeId
  };

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get('SELECT * FROM Employee WHERE id = $employeeId', { $employeeId: req.params.employeeId }, (err, row) => {
        res.status(200).json({ employee: row });
      });
    }
  });
});

// deletes an existing employee
employeesRouter.delete('/:employeeId', (req, res, next) => {
  const sql = 'UPDATE Employee SET is_current_employee = 0 WHERE id = $employeeId';
  const values = { $employeeId: req.params.employeeId };

  db.run(sql, values, (err) => {
    if (err) {
      next (err);
    } else {
      db.get('SELECT * FROM Employee WHERE id = $employeeId',
      { $employeeId: req.params.employeeId }, (err, row) => {
        if (err) {
          next(err);
        } else {
        res.status(200).json({ employee: row })
        }
      });
    }
  });
});

module.exports = employeesRouter;
