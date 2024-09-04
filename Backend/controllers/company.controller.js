import { Company } from "../model/Company.mode.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    // Check if the company name is provided
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    // Check if a company with the same name already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company with this name already exists",
        success: false,
      });
    }

    // Create a new company
    company = await Company.create({
      name: companyName,
      userId: req.id, // Assuming req.id contains the user ID from middleware authentication
    });

    // Return success response
    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company, // Return the created company object if needed
    });
  } catch (error) {
    console.error("Error while registering company:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params; // Get the company ID from the request parameters

    // Find the company by its ID
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Return the company details
    return res.status(200).json({
      message: "Company found",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error while retrieving company:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // Prepare the update data
    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(website && { website }),
      ...(location && { location }),
    };

    // Find the company by ID and update it
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Return the updated company details
    return res.status(200).json({
      message: "Company information updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error while updating company:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // Assuming userId is obtained from middleware authentication

    // Find all companies associated with the logged-in user
    const companies = await Company.find({ userId });

    if (companies.length === 0) {
      return res.status(404).json({
        message: 'No companies found for this user',
        success: false,
      });
    }

    // Return the company details
    return res.status(200).json({
      message: 'Companies found',
      success: true,
      companies,
    });

  } catch (error) {
    console.error('Error while retrieving companies:', error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};