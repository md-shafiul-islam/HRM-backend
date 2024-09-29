const express = require("express");
const cors = require("cors");
const routers = require("./router");
const cookieParser = require("cookie-parser");
class App {
  app = undefined;
  port = process.env.PORT | 3052;
  constructor() {
    this.app = express();
    this.initMiddleware();
    this.initRouter();
  }

  initRouter = () => {
    routers(this.app);
  };

  initMiddleware = () => {
    const allowedOrigins = new Set(["http://localhost:5173"]);
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (allowedOrigins.has(origin ?? "") || !origin) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
        optionsSuccessStatus: 200,
      })
    );

    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json({ limit: "20mb" }));
    this.app.use(cookieParser());
  };

  run = () => {
    this.app.listen(this.port, () => {
      console.log(`Server http://localhost:${this.port}`);
    });
  };
}

module.exports = { App };
