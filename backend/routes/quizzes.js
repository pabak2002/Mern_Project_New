const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/quizzes").get(async function (req, res) {
  try {
    const quizzesCollection = dbo.getDb("quiz").collection("quizzes");
    const results = await new Promise((resolve, reject) => {
      quizzesCollection.find().toArray((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    console.log("Fetched all quizzes");
    res.send(results);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

recordRoutes.route("/quizzes").post(async function (req, res) {
  try {
    const quizzesCollection = dbo.getDb("quiz").collection("quizzes");
    const result = await new Promise((resolve, reject) => {
      quizzesCollection.insertOne(req.body, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    console.log("Added quiz to quizzes collection");
    res.send(result.insertedId);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

recordRoutes.route("/quizzes/:id").get(async function (req, res) {
  try {
    const quizzesCollection = dbo.getDb("quiz").collection("quizzes");
    const id = req.params.id;
    const quiz = await new Promise((resolve, reject) => {
      quizzesCollection.findOne({ _id: ObjectId(id) }, (err, quiz) => {
        if (err) {
          reject(err);
        } else {
          resolve(quiz);
        }
      });
    });
    console.log("Fetched quiz info");
    res.send(quiz);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

recordRoutes.route("/quizzes/edit/:id").put(async function (req, res) {
  try {
    const quizzesCollection = dbo.getDb("quiz").collection("quizzes");
    const id = req.params.id;
    const updatedQuiz = req.body;
    const quiz = await new Promise((resolve, reject) => {
      quizzesCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updatedQuiz },
        (err, quiz) => {
          if (err) {
            reject(err);
          } else {
            resolve(quiz);
          }
        }
      );
    });
    console.log("Updated quiz");
    res.send(quiz);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

recordRoutes.route("/quizzes/:id").delete(async function (req, res) {
  try {
    const quizzesCollection = dbo.getDb("quiz").collection("quizzes");
    const id = req.params.id;
    const quiz = await new Promise((resolve, reject) => {
      quizzesCollection.deleteOne({ _id: ObjectId(id) }, (err, quiz) => {
        if (err) {
          reject(err);
        } else {
          resolve(quiz);
        }
      });
    });
    console.log("Deleted quiz");
    res.send(quiz);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

recordRoutes.route("/signin").post(async (req, res) => {
  const { username, password } = req.body;
  console.log("hello from signin");
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const existingUser = await dbo
      .getDb("quiz")
      .collection("users")
      .findOne({ username, password });

    if (existingUser) {
      res.status(200).send({ success: true, message: "Sign-in successful" });
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

recordRoutes.route("/signup").post(async function (req, res) {
  console.log("Hello");
  try {
    const { username, password, email } = req.body;

    // Check if username already exists
    const existingUser = await dbo
      .getDb("quiz")
      .collection("users")
      .findOne({ username });

    if (existingUser) {
      return res.status(200).json({
        message: "Username already exists.",
        success: false,
      });
    }

    // Hash the password before saving it to the database (assuming you have a hash function)
    // For example, using bcrypt:
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user into database
    const newUser = await dbo
      .getDb("quiz")
      .collection("users")
      .insertOne({ username, password, email });

    const newUserread = await dbo
      .getDb("quiz")
      .collection("users")
      .findOne({ username, password });

    console.log("New user added:", newUserread);

    res.status(200).json({
      message: "User signed up successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = recordRoutes;
