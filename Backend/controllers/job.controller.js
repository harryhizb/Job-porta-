import {Job} from '../model/Job.model.js'

export const postJob = async (req, res) => {
    try {
      const { title, description, requirements, salary, location, jobTypes, experience, position, companyId } = req.body;
      const userId = req.id; // Assuming req.id contains the user ID from middleware authentication
  
      // Check if all required fields are provided
      if (!title || !description || !requirements || !salary || !location || !jobTypes || !experience || !position || !companyId) {
        return res.status(400).json({
          message: 'Something is missing',
          success: false,
        });
      }
  
      // Create a new job
      const job = await Job.create({
        title,
        description,
        requirements: requirements.split(","),
        salary: Number(salary),
        location,
        jobTypes,
        experienceLevel: experience,
        position,
        company: companyId,
        createded_by: userId,
      });
  
      return res.status(200).json({
        message: 'Job posted successfully',
        success: true,
        job,
      });
  
    } catch (error) {
      console.error('Error while posting job:', error);
      return res.status(500).json({
        message: 'Server error',
        success: false,
      });
    }
  };

  export const getAllJobs = async (req, res) => {
    try {
      const { query } = req.query; // Get search query from request query parameters
  
      let jobs;
  
      if (query) {
        // Use regular expressions to search for keywords in title and description
        jobs = await Job.find({
          $or: [
            { title: { $regex: query, $options: 'i' } }, // Case-insensitive search
            { description: { $regex: query, $options: 'i' } }
          ]
        });
        
        if (jobs.length === 0) {
          return res.status(404).json({
            message: 'No jobs found matching the query',
            success: false,
          });
        }
      } else {
        // Get all jobs if no query is provided
        jobs = await Job.find();
      }
  
      return res.status(200).json({
        message: 'Jobs retrieved successfully',
        success: true,
        jobs,
      });
  
    } catch (error) {
      console.error('Error while retrieving jobs:', error);
      return res.status(500).json({
        message: 'Server error',
        success: false,
      });
    }
  };

  export const getJobById = async (req, res) => {
    try {
      const { id } = req.params; // Get job ID from request parameters
  
      // Find the job by its ID
      const job = await Job.findById(id).populate('company').populate('created_by');
  
      if (!job) {
        return res.status(404).json({
          message: 'Job not found',
          success: false,
        });
      }
  
      return res.status(200).json({
        message: 'Job retrieved successfully',
        success: true,
        job,
      });
  
    } catch (error) {
      console.error('Error while retrieving job:', error);
      return res.status(500).json({
        message: 'Server error',
        success: false,
      });
    }
  };

  export const getAdminJobs = async (req, res) => {
    try {
      const { userId } = req.params; // Get user ID from request parameters
  
      // Find all jobs created by the specified user (admin)
      const jobs = await Job.find({ created_by: userId }).populate('company');
  
      if (!jobs.length) {
        return res.status(404).json({
          message: 'No jobs found for this admin',
          success: false,
        });
      }
  
      return res.status(200).json({
        message: 'Jobs retrieved successfully',
        success: true,
        jobs,
      });
  
    } catch (error) {
      console.error('Error while retrieving admin jobs:', error);
      return res.status(500).json({
        message: 'Server error',
        success: false,
      });
    }
  };

   