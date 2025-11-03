

import Organization_model from '../models/organization.model.js';


// ✅ Get all organizations
export const getAllOrganizations = async (req, res, next) => {
    try {
        const organizations = await Organization_model.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: organizations.length,
            data: organizations
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Get all active organizations
export const getAllActiveOrganizations = async (req, res, next) => {
    try {
        const organizations = await Organization_model.find({
            isActive: true
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: organizations.length,
            data: organizations
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Get single organization by ID
export const getOrganizationById = async (req, res, next) => {
    try {
        const organization = await Organization_model.findById(req.params.id);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization not found'
            });
        }

        res.status(200).json({
            success: true,
            data: organization
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Get organization by URL ID
export const getOrganizationByUrlID = async (req, res, next) => {
    try {
        const organization = await Organization_model.findOne({
            urlID: req.params.urlID
        });

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization not found'
            });
        }

        res.status(200).json({
            success: true,
            data: organization
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Get organizations by user email
export const getOrganizationsByUserEmail = async (req, res, next) => {
    try {
        const organizations = await Organization_model.find({
            emailUser: req.params.email
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: organizations.length,
            data: organizations
        });
    } catch (error) {
        next(error);
    }
};







// export const searchOrganizations = async (req, res, next) => {

//       const query = req.query.q?.toLowerCase() || "";

//     try {
//         const results = await Organization_model.filter(
//                 (item) =>
//                 item.name.toLowerCase().includes(query) ||
//                 item.phone.includes(query) ||
//                 item.orgEmail.toLowerCase().includes(query) ||
//                 item.urlID.toLowerCase().includes(query) ||
//                 item.localAddress.toLowerCase().includes(query) ||
//                 item.zipCode.toLowerCase().includes(query) ||
//                 item.zipCode.toLowerCase().includes(query) ||

//                 item.division.name.toLowerCase().includes(query) ||
//                 item.division.bn_name.toLowerCase().includes(query) ||

//                 item.district.bn_name.toLowerCase().includes(query) ||
//                 item.district.bn_name.toLowerCase().includes(query) ||

//                 item.upazila.bn_name.toLowerCase().includes(query) ||
//                 item.upazila.bn_name.toLowerCase().includes(query)
//         )

//         res.status(200).json({
//             success: true,
//             count: results.length,
//             data: results
//         });
//     } catch (error) {
//         next(error);
//     }
// };
























// ✅ Create a new organization
export const createOrganization = async (req, res, next) => {
    try {
        const {
            name,
            urlID,
            emailUser,
            orgEmail,
            phone,
            localAddress,
            division,
            district,
            upazila,
            zipCode,
            mapLink,
            details,
            logoUrl,
            coverUrl,
            galleryUrls,
            residencyType,
            checkBoxValues
        } = req.body;

        // Validate required fields
        if (
            !name ||
            !urlID ||
            !emailUser ||
            !orgEmail ||
            !phone ||
            !zipCode ||
            !division ||
            !district ||
            !upazila ||
            !residencyType ||
            !checkBoxValues
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Validate images
        if (!logoUrl || !coverUrl) {
            return res.status(400).json({
                success: false,
                message: 'Logo and cover image are required'
            });
        }

        if (!galleryUrls || galleryUrls.length < 3 || galleryUrls.length > 20) {
            return res.status(400).json({
                success: false,
                message: 'Gallery must contain between 3 and 20 images'
            });
        }

        // Check if urlID already exists
        const existingUrlID = await Organization_model.findOne({
            urlID
        });
        if (existingUrlID) {
            return res.status(400).json({
                success: false,
                message: 'This URL ID is already taken. Please choose another one.'
            });
        }

        const organization = await Organization_model.create({
            name,
            urlID,
            emailUser,
            orgEmail,
            phone,
            localAddress,
            division,
            district,
            upazila,
            zipCode,
            mapLink,
            details,
            logoUrl,
            coverUrl,
            galleryUrls,
            residencyType,
            checkBoxValues,
            isPending: true,
            isActive: false,
            isRejected: false,
            isEdited: false
        });

        res.status(201).json({
            success: true,
            message: 'Organization submitted successfully. Pending approval.',
            data: organization
        });
    } catch (error) {
        // Handle duplicate key error (MongoDB E11000)
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            const value = error.keyValue[field];

            return res.status(400).json({
                success: false,
                message: `An organization with this ${field} (${value}) already exists.`
            });
        }

        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages[0] || 'Validation failed',
                errors: messages
            });
        }

        next(error);
    }
};




// ✅ Update organization by ID
export const updateOrganization = async (req, res, next) => {
    try {
        const organization = await Organization_model.findById(req.params.id);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization not found'
            });
        }


        // If organization was approved and is being edited
        if (organization.isActive && !organization.isEdited) {
            req.body.isEdited = true;
            req.body.isPending = true;
            req.body.isActive = false;
        }

        const updatedOrganization = await Organization_model.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: 'Organization updated successfully',
            data: updatedOrganization
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages[0] || 'Validation failed',
                errors: messages
            });
        }
        next(error);
    }
};





// ✅ Update organization by ID
// export const updateOrganization = async (req, res, next) => {
//     try {
//         const organization = await Organization_model.findById(req.params.id);

//         if (!organization) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Organization not found",
//             });
//         }

//         // If organization was approved and is being edited
//         if (organization.isActive && !organization.isEdited) {
//             req.body.isEdited = true;
//             req.body.isPending = true;
//             req.body.isActive = false;
//         }

//         // ✅ Build dynamic missing fields check using Mongoose schema
//         const schemaPaths = Organization_model.schema.paths;
//         const requiredFields = Object.keys(schemaPaths).filter(
//             (key) => schemaPaths[key].isRequired
//         );

//         // Check for missing required fields
//         const missingFields = requiredFields.filter((field) => {
//             const value = organization[field];
//             return (
//                 value === undefined ||
//                 value === null ||
//                 (Array.isArray(value) && value.length === 0) ||
//                 (typeof value === "string" && value.trim() === "")
//             );
//         });

//         // If required fields are missing → mark needUpdate = true
//         if (missingFields.length > 0) {
//             req.body.needUpdate = true;
//         }

//         const updatedOrganization = await Organization_model.findByIdAndUpdate(
//             req.params.id,
//             req.body, {
//                 new: true,
//                 runValidators: true,
//             }
//         );

//         res.status(200).json({
//             success: true,
//             message: "Organization updated successfully",
//             data: updatedOrganization,
//         });
//     } catch (error) {
//         if (error.name === "ValidationError") {
//             const messages = Object.values(error.errors).map((err) => err.message);
//             return res.status(400).json({
//                 success: false,
//                 message: messages[0] || "Validation failed",
//                 errors: messages,
//             });
//         }
//         next(error);
//     }
// };








// export const updateOrganization = async (req, res, next) => {
//     try {
//         const {
//             id
//         } = req.params;

//         // Find the existing organization
//         const organization = await Organization_model.findById(id);

//         if (!organization) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Organization not found",
//             });
//         }

//         // ✅ Handle re-submission logic for approved organizations
//         // If organization was previously approved and is now being edited
//         if (organization.isActive && !organization.isEdited) {
//             req.body.isEdited = true;
//             req.body.isPending = true;
//             req.body.isActive = false;
//         }

//         // ✅ Merge existing data with new data to preserve unchanged fields
//         const updateData = {
//             ...req.body,
//         };

//         // If images weren't changed, keep the existing ones
//         if (!req.body.logoUrl || req.body.logoUrl === organization.logoUrl) {
//             updateData.logoUrl = organization.logoUrl;
//         }

//         if (!req.body.coverUrl || req.body.coverUrl === organization.coverUrl) {
//             updateData.coverUrl = organization.coverUrl;
//         }

//         // Handle gallery images - merge if not fully replaced
//         if (!req.body.galleryUrls || req.body.galleryUrls.length === 0) {
//             updateData.galleryUrls = organization.galleryUrls;
//         }

//         // ✅ Build dynamic missing fields check using Mongoose schema
//         const schemaPaths = Organization_model.schema.paths;
//         const requiredFields = Object.keys(schemaPaths).filter(
//             (key) => schemaPaths[key].isRequired && key !== '_id' && key !== '__v'
//         );

//         // Check for missing required fields in the MERGED data
//         const missingFields = requiredFields.filter((field) => {
//             const value = updateData[field] !== undefined ? updateData[field] : organization[field];
//             return (
//                 value === undefined ||
//                 value === null ||
//                 (Array.isArray(value) && value.length === 0) ||
//                 (typeof value === "string" && value.trim() === "")
//             );
//         });

//         // If required fields are missing → mark needUpdate = true
//         if (missingFields.length > 0) {
//             updateData.needUpdate = true;
//             console.log("Missing required fields:", missingFields);
//         } else {
//             updateData.needUpdate = false;
//         }

//         // ✅ Validate critical fields before update
//         const criticalFields = ['name', 'urlID', 'orgEmail', 'phone'];
//         const missingCriticalFields = criticalFields.filter(
//             (field) => !updateData[field] || updateData[field].trim() === ""
//         );

//         if (missingCriticalFields.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Missing critical fields: ${missingCriticalFields.join(", ")}`,
//                 missingFields: missingCriticalFields,
//             });
//         }

//         // ✅ Validate email format
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(updateData.orgEmail)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid organization email format",
//             });
//         }

//         // ✅ Validate URL ID uniqueness (if changed)
//         if (updateData.urlID && updateData.urlID !== organization.urlID) {
//             const existingOrg = await Organization_model.findOne({
//                 urlID: updateData.urlID,
//                 _id: {
//                     $ne: id
//                 }
//             });

//             if (existingOrg) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "URL ID already exists. Please choose a different one.",
//                 });
//             }
//         }

//         // ✅ Update the organization
//         const updatedOrganization = await Organization_model.findByIdAndUpdate(
//             id,
//             updateData, {
//                 new: true, // Return the updated document
//                 runValidators: true, // Run schema validators
//                 context: 'query' // Ensure validators run properly
//             }
//         );

//         if (!updatedOrganization) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Organization not found after update",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Organization updated successfully",
//             data: updatedOrganization,
//             needsReview: updateData.isPending || false,
//         });

//     } catch (error) {
//         console.error("Update organization error:", error);

//         // Handle Mongoose validation errors
//         if (error.name === "ValidationError") {
//             const messages = Object.values(error.errors).map((err) => err.message);
//             return res.status(400).json({
//                 success: false,
//                 message: messages[0] || "Validation failed",
//                 errors: messages,
//             });
//         }

//         // Handle duplicate key errors
//         if (error.code === 11000) {
//             const field = Object.keys(error.keyPattern)[0];
//             return res.status(400).json({
//                 success: false,
//                 message: `${field} already exists. Please use a different value.`,
//             });
//         }

//         // Handle cast errors (invalid ID format)
//         if (error.name === "CastError") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid organization ID format",
//             });
//         }

//         // Pass other errors to error handling middleware
//         next(error);
//     }
// };












// ✅ Update organization by URL ID
export const updateOrganizationByUrlID = async (req, res, next) => {
    try {
        const organization = await Organization_model.findOne({
            urlID: req.params.urlID
        });

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization not found'
            });
        }

        if (organization.isActive && !organization.isEdited) {
            req.body.isEdited = true;
            req.body.isPending = true;
            req.body.isActive = false;
        }

        const updatedOrganization = await Organization_model.findOneAndUpdate({
                urlID: req.params.urlID
            },
            req.body, {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: 'Organization updated successfully',
            data: updatedOrganization
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages[0] || 'Validation failed',
                errors: messages
            });
        }
        next(error);
    }
};

// ✅ Approve organization
export const approveOrganization = async (req, res, next) => {
    try {
        const organization = await Organization_model.findByIdAndUpdate(
            req.params.id, {
                isPending: false,
                isActive: true,
                isRejected: false
            }, {
                new: true
            }
        );

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Organization approved successfully',
            data: organization
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Reject organization
export const rejectOrganization = async (req, res, next) => {
    try {
        const organization = await Organization_model.findByIdAndUpdate(
            req.params.id, {
                isPending: false,
                isActive: false,
                isRejected: true
            }, {
                new: true
            }
        );

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Organization rejected',
            data: organization
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Delete organization
export const deleteOrganization = async (req, res, next) => {
    try {
        const organization = await Organization_model.findByIdAndDelete(req.params.id);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: 'Organization not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Organization deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Get organization statistics
export const getOrganizationStats = async (req, res, next) => {
    try {
        const total = await Organization_model.countDocuments();
        const active = await Organization_model.countDocuments({
            isActive: true
        });
        const pending = await Organization_model.countDocuments({
            isPending: true
        });
        const rejected = await Organization_model.countDocuments({
            isRejected: true
        });
        const edited = await Organization_model.countDocuments({
            isEdited: true
        });

        res.status(200).json({
            success: true,
            data: {
                total,
                active,
                pending,
                rejected,
                edited
            }
        });
    } catch (error) {
        next(error);
    }
};
