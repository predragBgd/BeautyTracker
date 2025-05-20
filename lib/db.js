import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase ? SQLite.openDatabase("beauty.db") : null;

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER DEFAULT 1,
        rate TEXT NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS treatments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        rate TEXT NOT NULL,
        quantity INTEGER DEFAULT 1,
        date DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    );
  });
};

export const addProduct = (name, price, quantity, rate, date) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO products (name, price, quantity, rate, date) VALUES (?, ?, ?, ?, ?)`,
      [name, price, quantity, rate, date],
      (_, result) => {
        console.log("Product added successfully", result);
      },
      (_, error) => {
        console.error("Error adding product", error);
      }
    );
  });
};
