import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import Job from "../models/Job";

const getAllJobs: RequestHandler = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user?.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob: RequestHandler = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user?.userId;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id '${jobId}'`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob: RequestHandler = async (req, res) => {
  const job = await Job.create({ ...req.body, createdBy: req.user?.userId });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob: RequestHandler = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user?.userId;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }

  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    { company, position },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job with id '${jobId}'`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob: RequestHandler = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user?.userId;

  const job = await Job.findOneAndRemove({ createdBy: userId, _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id '${jobId}'`);
  }

  res.status(StatusCodes.OK).json({ job });
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
