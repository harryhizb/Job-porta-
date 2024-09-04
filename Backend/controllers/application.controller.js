import { Application } from "../model/Application.model.js";
import { Job } from "../model/Job.model.js";
import { User } from "../model/User.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Assuming `application` is an array in your Job schema
    job.application.push(newApplication._id);
    await job.save();

    return res.status(200).json({
      message: "Application submitted successfully",
      success: true,
      application: newApplication,
    });
  } catch (err) {
    console.error("Error while applying for job:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
export const getApplicantsJobs = async (req, res) => {
  try {
    const userId = req.id;

    // Find all applications made by the user
    const applications = await Application.find({ applicant: userId }).populate(
      "job"
    );

    if (applications.length === 0) {
      return res.status(404).json({
        message: "No jobs found that you have applied to",
        success: false,
      });
    }

    // Extract the jobs from the applications
    const jobs = applications.map((application) => application.job);

    return res.status(200).json({
      message: "Jobs retrieved successfully",
      success: true,
      jobs,
    });
  } catch (err) {
    console.error("Error while retrieving jobs applied by user:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find the job to ensure it exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Find all applications for the job and populate the applicant details
    const applications = await Application.find({ job: jobId }).populate(
      "applicant",
      "name email"
    ); // Customize the fields as needed

    if (applications.length === 0) {
      return res.status(404).json({
        message: "No applicants found for this job",
        success: false,
      });
    }

    // Map the applications to extract applicant details
    const applicants = applications.map((application) => ({
      applicant: application.applicant,
      applicationDate: application.createdAt, // Assuming there's a timestamp field
    }));

    return res.status(200).json({
      message: "Applicants retrieved successfully",
      success: true,
      applicants,
    });
  } catch (err) {
    console.error("Error while retrieving applicants:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
    try {
      const { id } = req.params; // The ID of the application to update
      const { status } = req.body; // The new status to set
  
      // Validate the status
      const validStatuses = ['accepted', 'rejected'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid status provided",
          success: false,
        });
      }
  
      // Find the application by ID and update its status
      const application = await Application.findById(id);
  
      if (!application) {
        return res.status(404).json({
          message: "Application not found",
          success: false,
        });
      }
  
      if (application.status !== 'pending') {
        return res.status(400).json({
          message: "Application status cannot be changed",
          success: false,
        });
      }
  
      // Update the application status
      application.status = status.toLowerCase();
      await application.save();
  
      return res.status(200).json({
        message: "Application status updated successfully",
        success: true,
        application,
      });
  
    } catch (err) {
      console.error("Error while updating application status:", err);
      return res.status(500).json({
        message: "Server error",
        success: false,
      });
    }
  };
