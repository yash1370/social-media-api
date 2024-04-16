import "./env.js";
import express from "express";
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";
import UserRoutes from "./src/features/users/user.routes.js";
import ApplicationError from "./src/errorhandlers/application.errors.js";
import PostRoutes from "./src/features/posts/post.routes.js";
import CommentsRoutes from "./src/features/comments/comments.routes.js";
import LikeRoutes from "./src/features/likes/likes.routes.js";
import FriendsRoutes from "./src/features/friends/friends.routes.js";
import OtpRoutes from "./src/features/otp/otp.routes.js";
import logMiddleware from "./src/middlewares/logger.middleware.js";

const app = express();
app.use(express.json());
app.use(logMiddleware);
app.get("/", (req, res) => {
  res.json({
    appName: "Postaway-II",
    msg: "Welcome to the App Express Server",
  });
});

app.use("/api/users", UserRoutes);
app.use("/api/posts", jwtAuth, PostRoutes);
app.use("/api/comments", jwtAuth, CommentsRoutes);
app.use("/api/likes", jwtAuth, LikeRoutes);
app.use("/api/friends",jwtAuth,FriendsRoutes);
app.use("/api/otp",jwtAuth,OtpRoutes);

app.use((req, res) => {
  res
    .status(404)
    .json(
      "API Not Found. Please Verify the Document to know More Information at https://documenter.getpostman.com/view/33021592/2sA35JzKrW"
    );
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  }
  // Server Error
  res.status(500).send("Something Went Wrong Please Try Again Later");
});

export default app;
