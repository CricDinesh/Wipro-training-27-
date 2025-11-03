import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection String
const uri = "mongodb+srv://dinesh130704_db_user:uVtYah3rKeTgNrLj@eduprodb.gsau1ip.mongodb.net/EduProDB?retryWrites=true&w=majority";

const client = new MongoClient(uri);
let db, coursesCollection;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("EduProDB");
    coursesCollection = db.collection("courses");
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}
connectDB();


// ➕ CREATE (Add new course)
app.post("/api/courses", async (req, res) => {
  try {
    const result = await coursesCollection.insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📖 READ (Get all courses)
app.get("/api/courses", async (req, res) => {
  try {
    const data = await coursesCollection.find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ UPDATE (Edit a course)
app.put("/api/courses/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await coursesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ DELETE (Remove a course)
app.delete("/api/courses/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await coursesCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔍 SEARCH by name
app.get("/api/courses/search/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await coursesCollection
      .find({ name: { $regex: name, $options: "i" } })
      .toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Dynamic port (fixes EADDRINUSE)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
