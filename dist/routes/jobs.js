"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobs_1 = require("../controllers/jobs");
const jobsRouter = (0, express_1.Router)();
jobsRouter.route("/").post(jobs_1.createJob).get(jobs_1.getAllJobs);
jobsRouter.route("/:jobId").get(jobs_1.getJob).delete(jobs_1.deleteJob).patch(jobs_1.updateJob);
exports.default = jobsRouter;
