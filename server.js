const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const runs = require("./routes/api/runs");
const cors = require("cors")

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(express.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/runs", runs)


const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server running on port ${port} ! Woop woop!!`));