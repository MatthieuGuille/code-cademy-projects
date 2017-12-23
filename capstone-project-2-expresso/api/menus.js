const express = require('express');
const menusRouter = express.Router();
const menuItemsRouter = require('./menu-items.js')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// selects a menu from a valid menuId and handles invalid menuId
menusRouter.param('menuId', (req, res, next, menuId) => {
  const sql = 'SELECT * FROM Menu WHERE id = $menuId';
  const values = { $menuId: menuId };
  db.get(sql, values, (err, row) => {
    if (err) {
      next(err);
    } else if (row) {
      req.menu = row;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

menusRouter.use('/:menuId/menu-items', menuItemsRouter);

// return all menus
menusRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Menu', (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ menus: rows });
    }
  });
});

// return one menu
menusRouter.get('/:menuId', (req, res, next) => {
  res.status(200).json({ menu: req.menu });
});

// creates a new menu and returns the newly created menu
menusRouter.post('/', (req, res, next) => {
  const title = req.body.menu.title;

  if (!title) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO Menu (title) VALUES ($title)';
  const values = { $title: title };

  db.run(sql, values, function(err) {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Menu WHERE id = ${this.lastID}`, (err, row) => {
        res.status(201).json({ menu: row });
      });
    }
  });
});

// updates existing menu and returns the updated menu
menusRouter.put('/:menuId', (req, res, next) => {
  const title = req.body.menu.title;

  if (!title) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE Menu SET title = $title WHERE id = $menuId';

  const values = {
    $title: title,
    $menuId: req.params.menuId
  };

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get('SELECT * FROM Menu WHERE id = $menuId', { $menuId: req.params.menuId }, (err, row) => {
        res.status(200).json({ menu: row });
      });
    }
  });
});

// deletes a menu that does not have any menu items
menusRouter.delete('/:menuId', (req, res, next) => {
  const sql = 'SELECT * FROM MenuItem WHERE menu_id = $menuId';
  const values = { $menuId: req.params.menuId };

  db.get(sql, values, (err, row) => {
    if (err) {
      next(err)
    } else if (row) {
      res.sendStatus(400)
    } else {
      const sql2 = 'DELETE FROM Menu WHERE id = $menuId';

      db.run(sql2, values, (err) => {
        res.sendStatus(204);
      });
    }
  })
});

module.exports = menusRouter;
