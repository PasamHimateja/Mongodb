// import express from "express";
// import mongoose from "mongoose";
// import Test from './schemas/test.js';

                                    
// const app = express();  
// app.use(express.json());          
// const MONGO_URL="mongodb://localhost:27017/test"    

// mongoose.connect(MONGO_URL)

// app.post('/register', async (req, res) => {
//     const { name, age } = req.body;
//     const test = new Test({name, age});
//     await test.save();
//     res.json({name, age});
// })

// app.listen(3001, () => {
//     console.log("app is running");
// })



// import express from 'express';
// import mongoose from 'mongoose';
// import Student from './schemas/student.js';  
// import Fee from './schemas/fee.js';  

// const app = express();
// app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/test")
//     .then(() => console.log("MongoDB is connected"))
//     .catch((error) => console.error("Connection not successful:", error));

// app.get('/Dashboard', (req, res) => {
//     res.send('Hello World');
// });


// app.post('/student', async (req, res) => {
//     try {
//         const { name, class: classId, rollNo } = req.body;

//         if (!name || !classId || !rollNo) {
//             return res.status(400).send("All fields are required");
//         }

//         const newStudent = new Student({ 
//             name, 
//             class: classId, 
//             rollNo 
//         });  
//         await newStudent.save();
//         res.status(201).send({ message: 'Student created successfully', student: newStudent });

//     } catch (error) {
//         console.error("Internal server error:", error);
//         res.status(500).send("Internal server error");
//     }
// });


// app.post('/fee', async (req, res) => {
//     try {
//         const { student, amount, date } = req.body;

//         if (!student || !amount) {
//             return res.status(400).send("Student ID and amount are required");
//         }

//         const newFee = new Fee({ student, amount, date: date || new Date() });  
//         await newFee.save();
//         res.status(201).send({ message: 'Fee Document created successfully', fee: newFee });

//     } catch (error) {
//         console.error("Internal server error:", error);
//         res.status(500).send("Internal server error");
//     }   
// });

// app.get('/student/:id', async (req, res) => {
//     try {
//         const studentId = req.params.id;

//         const studentFees = await Fee.find({ student: studentId });

//         if (studentFees.length === 0) {
//             return res.status(404).send("No fee records found for this student");
//         }

//         res.send(studentFees);
//     } catch (error) {
//         console.error("Internal server error:", error);
//         res.status(500).send("Internal server error");
//     }
// });

// app.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });



import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { createLogger } from 'vite';

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'mysecretkey';
const users = [{ username: 'hima', password: 'preethi@123' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username, password }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.sendStatus(403);
      res.json({ message: 'Protected content', user: decoded});
    });
  } else {
    res.sendStatus(401);
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
console.log("connected to mongobd")



