const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOption");

const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Page Not Found" });
  } else {
    res.type("txt").send("404 Page Not Found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
