import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobs";

const jobsRouter = Router();

jobsRouter.route("/").post(createJob).get(getAllJobs);
jobsRouter.route("/:jobId").get(getJob).delete(deleteJob).patch(updateJob);

export default jobsRouter;
