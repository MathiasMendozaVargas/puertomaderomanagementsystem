const mysql = require('mysql2')


const pool = mysql.createPool({
    host: 'containers-us-west-21.railway.app',
    user: 'root',
    password: 'URSgNOoZnRsEFJBqf7iz',
    database: 'railway',
    port: '6949'
})

// for railway on how to check if a table exists
const sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='Visits'"
pool.query(sql, (err, data) => {
    if(err){
        return console.error(err.message);
    }

    if(data.length === 0){
        console.log("Table 'Visits' does not exist");
        seedDB()
    } else{
        console.log("Table 'Visits' exists!");
    }
})

const seedDB = () => {
    pool.query('DROP TABLE IF EXISTS Visits')

    pool.query(
        `CREATE TABLE Visits (
            id INT PRIMARY KEY AUTO_INCREMENT,
            Name VARCHAR(100) NOT FULL,
            Description VARCHAR(400) NOT FULL,
            Date TEXT
        )`,
        (err) => {
            if(err){
                console.error(err.message);
            }
            console.log('Visits table successfuly created!');
        }
    )


    pool.query(
        `INSERT INTO Visits (id, Name, Description, Date) VALUES
        (1, 'React Afternoon', 'Come and join the first react event in Vancouver', 'June 14th 2023'),
        (2, 'Reading Club', 'We are gonna start our adventure reading the DUNE books', 'July 20th 2023'),`,
        (err) => {
            if(err){
                return console.error(err.message);
            }

            console.log('Event successfuly created!');
        }
    )
}

module.exports = pool.promise()