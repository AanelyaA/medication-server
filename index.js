const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const patientsRouter = require("./routes/patient-route");
const medicationsRouter = require("./routes/medication-route");
const authRoutes = require("./routes/auth");
const nfcRoute = require("./routes/nfc"); ///

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/nfctest", nfcRoute);///


function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


app.use("/patients", authenticateToken, patientsRouter);
app.use("/medications", authenticateToken, medicationsRouter);

app.use("/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
