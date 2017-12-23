const express = require('express');
const menuItemsRouter = express.Router({ mergeParams: true });

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// selects a menu item from a valid menuItemId and handles invalid menuItemId
menuItemsRouter.param('menuItemId', (req, res, next, menuItemId) => {
  const sql = 'SELECT * FROM MenuItem WHERE id = $menuItemId';
  const values = { $menuItemId: menuItemId };
  db.get(sql, values, (err, row) => {
    if (err) {
      next(err);
    } else if (row) {
      req.menuItem = row;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// return all menu items
menuItemsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM MenuItem WHERE menu_id = $menuId',
  { $menuId: req.params.menuId }, (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ menuItems: rows });
    }
  });
});

// creates a new menu item and returns the newly created item
menuItemsRouter.post('/', (req, res, next) => {
  const name = req.body.menuItem.name;
  const description = req.body.menuItem.description;
  const inventory = req.body.menuItem.inventory;
  const price = req.body.menuItem.price;
  const menuId = req.params.menuId;
  if (!name || !description || !inventory || !price ) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO MenuItem (name, description, inventory, price, menu_id) VALUES ($name, $description, $inventory, $price, $menuId)';
  const values = {
    $name: name,
    $description: description,
    $inventory: inventory,
    $price: price,
    $menuId: menuId
  };

  db.run(sql, values, function(err) {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM MenuItem WHERE id = ${this.lastID}`, (err, row) => {
        res.status(201).json({ menuItem: row });
      });
    }
  });
});

// updates an existing menu item and returns the updated item
menuItemsRouter.put('/:menuItemId', (req, res, next) => {
  const name = req.body.menuItem.name;
  const description = req.body.menuItem.description;
  const inventory = req.body.menuItem.inventory;
  const price = req.body.menuItem.price;
  const menuId = req.params.menuId;
  if (!name || !description || !inventory || !price ) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE MenuItem SET name = $name, description = $description, inventory = $inventory, price = $price WHERE menu_id = $menuId AND id = $menuItemId';

  const values = {
    $name: name,
    $description: description,
    $inventory: inventory,
    $price: price,
    $menuId: menuId,
    $menuItemId: req.params.menuItemId
  };

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get('SELECT * FROM MenuItem WHERE id = $menuItemId', { $menuItemId: req.params.menuItemId }, (err, row) => {
        res.status(200).json({ menuItem: row });
      });
    }
  });
});

// deletes an existing menu item
menuItemsRouter.delete('/:menuItemId', (req, res, next) => {
  const sql = 'DELETE FROM MenuItem WHERE id = $menuItemId';
  const values = { $menuItemId: req.params.menuItemId };

  db.run(sql, values, (err) => {
    if (err) {
      next (err);
    } else {
        res.sendStatus(204);
    }
  });
});

module.exports = menuItemsRouter;
