const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./Routes/authRoutes");
const postsRoutes = require("./Routes/postsRoutes");  
const adminRoutes = require("./Routes/adminRoutes");  

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());


app.use(authRoutes);
app.use(postsRoutes);
app.use(adminRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.log(" MongoDB connection error:", err));
