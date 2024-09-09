const express = require('express');
require('./src/database/config');
const app = express();
const Student = require('./src/models/model');
const cors = require('cors');

app.use(express.json());
app.use(cors());


// GET /students
app.get('/students', async (req, res) => {
  const students = await Student.find().exec();
  res.send(students);
});

// GET /students/:id
app.get('/students/:id', async (req, res) => {
  const id = req.params.id;
  const student = await Student.findById(id).exec();
  if (!student) {
    res.status(404).send({ message: 'Student not found' });
  } else {
    res.send(student);
  }
});

// POST /students
app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send({ message: 'Error creating student' });
  }
});

// PUT /students/:id
app.put('/students/:id', async (req, res) => {
  const id = req.params.id;
  const student = await Student.findByIdAndUpdate(id, req.body, { new: true }).exec();
  if (!student) {
    res.status(404).send({ message: 'Student not found' });
  } else {
    res.send(student);
  }
});

// DELETE /students/:id
app.delete('/students/:id', async (req, res) => {
  const id = req.params.id;
  const student =  await Student.findByIdAndDelete(id).exec();
  if (!student) {
    res.status(404).send({ message: 'Student not found' });
  } else {
    res.status(200).send({ message: 'Student Deleted' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});