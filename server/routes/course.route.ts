import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authrizeRoles, isAuthenticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authrizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/update-course/:id",
  isAuthenticated,
  authrizeRoles("admin"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);

// Get course By ID

courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

// Add Question

courseRouter.put("/add-question", isAuthenticated, addQuestion);

// Add Answer

courseRouter.put("/add-answer", isAuthenticated, addAnswer);

// Add Review in Course

courseRouter.put(
  "/add-review/:id", 
  isAuthenticated,
   addReview);


// Add Reply in Review in Course

courseRouter.put(
  "/add-reply", 
  isAuthenticated,
  authrizeRoles("admin"),
   addReplyToReview);

export default courseRouter;
