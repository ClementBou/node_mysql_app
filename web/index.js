const express = require("express");
const mysql = require("mysql");
const app = express();

// Connection setting
const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "test",
});

app.get("/", (req, res) => {

  //Try to insert a new row in People table
  connection.query("INSERT INTO Poeple(student_name,student_age)VALUES(\"Clement Boulanger\", 22);", (err, rows) => {
    
    // If table doesn't exist we have to create it
    if (err) {
      connection.query("CREATE TABLE Poeple(student_id INT PRIMARY KEY AUTO_INCREMENT, student_name VARCHAR(60), student_age INT);", (err1, rows) => {
        
        // If table creation doesn't work return an error
        if(err1){
          res.json({
            success: false,
            err1,
          });
        }

        // Retry to insert a row
        else{
          connection.query("INSERT INTO Poeple(student_name,student_age)VALUES(\"Clement Boulanger\", 22);", (err2, rows) => {
            
            // If the insertion doesn't work return an error
            if(err2){
              res.json({
                success: false,
                err2,
              });
            }
            
            // Display the content of the table People
            else{
              connection.query("SELECT * FROM Poeple", (err3, rows) => {
                
                // If the request doesn't work return an error
                if (err3) {
                  res.json({
                    success: false,
                    err3,
                  });
                } 
                
                // Show th result
                else {
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
    } 
    
    // If insertion as been completed
    else {
      connection.query("SELECT * FROM Poeple", (err2, rows) => {
        
        // If the request doesn't work return an error
        if (err2) {
          res.json({
            success: false,
            err2,
          });
        } 
        
        // Show the result
        else {
          res.json({
            success: true,
            rows,
          });
        }
      });
    }
  });
});

app.listen(8080, () => console.log("listining on port 8080"));