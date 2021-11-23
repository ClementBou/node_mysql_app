const express = require("express");
const mysql = require("mysql");
const app = express();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "test",
});

app.get("/", (req, res) => {
  connection.query("INSERT INTO Poeple(student_name,student_age)VALUES(\"Clement Boulanger\", 22);", (err, rows) => {
    if (err) {
      connection.query("CREATE TABLE Poeple(student_id INT PRIMARY KEY AUTO_INCREMENT, student_name VARCHAR(60), student_age INT);", (err, rows) => {
        if(err){
          res.json({
            success: false,
            err,
          });
        }else{
          connection.query("INSERT INTO Poeple(student_name,student_age)VALUES(\"Clement Boulanger\", 22);", (err, rows) => {
            if(err){
              res.json({
                success: false,
                err,
              });
            }else{
              connection.query("SELECT * FROM Poeple", (err, rows) => {
                if (err) {
                  res.json({
                    success: false,
                    err,
                  });
                } else {
                  res.json({
                    success: true,
                    rows,
                  });
                }
              });
            }
          });
        }
      });
    } else {
      connection.query("SELECT * FROM Poeple", (err, rows) => {
        if (err) {
          res.json({
            success: false,
            err,
          });
        } else {
          res.json({
            success: true,
            rows,
          });
        }
      });
    }
  });
  connection.query("SELECT * FROM Poeple", (err, rows) => {
    if (err) {
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        rows,
      });
    }
  });
});

app.listen(8080, () => console.log("listining on port 8080"));