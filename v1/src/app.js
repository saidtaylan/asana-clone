const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const events = require("./scripts/events");
const { ProjectRoutes, UserRoutes, SectionRoutes, TaskRoutes } = require("./api-routes");
const fileUpload = require("express-fileupload")
const path = require("path")
const app = express();
app.use(express.json());
app.use(helmet());
app.use(fileUpload())
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")))
config();
loaders();
events();

app.listen(process.env.APP_PORT, () => {
  app.use("/projects", ProjectRoutes);
  app.use("/users", UserRoutes);
  app.use("/sections", SectionRoutes)
  app.use("/tasks", TaskRoutes)
  console.log("Sunucu ayağa kalktı");
});
