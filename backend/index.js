const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@weindic.b0umfyp.mongodb.net/registrationFormDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const registrationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    passwordConfirmation: String,
    mobileNumber: Number // Changed mobileNumber field type to Number
});
const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, passwordConfirmation, mobileNumber } = req.body;

        // Check if password and passwordConfirmation match
        if (password !== passwordConfirmation) {
            console.log("Passwords don't match");
            return res.status(400).send("Passwords don't match");
        }

        const existingUser = await Registration.findOne({ email: email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).send("User already exists");
        }

        const registrationData = new Registration({
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
            mobileNumber // Added mobileNumber to the registration data
        });
        

        await registrationData.save();

        res.redirect("/success");
    } catch (error) {
        console.error("Error registering user:", error);
        res.redirect("/error");
    }
});

app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "success.html"));
});

app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "error.html"));
});

app.get("/all-users", async (req, res) => {
    try {
        const allUsers = await Registration.find();
        res.json(allUsers);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});
