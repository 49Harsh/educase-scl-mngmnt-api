const express = require('express');
const schoolRoutes = require('./routes/schools');
const db = require('./db');

const app = express();
app.use(express.json());

// Create schools table if it doesn't exist
async function createSchoolsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
      )
    `);
    console.log('Schools table created or already exists');
  } catch (error) {
    console.error('Error creating schools table:', error);
  }
}

createSchoolsTable();

app.use('/api', schoolRoutes);

app.use('/',(req,res) =>{
    res.send('<h1>Welcome to the API</h1>')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});