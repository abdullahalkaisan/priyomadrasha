import Organization_model from '../models/organization.model.js';



export const searchOrganizations = async (req, res, next) => {
    const query = req.query.q?.toLowerCase() || "";
    // const query = "kaisan"
      const {
          searchValue,
          residencyType,
          divisions,
          districts,
          upazilas,
          checkBoxValues
      } = req.body;

    console.log(req.body)



    // Get pagination params (default limit=20, page=1)
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;

    try {
        // If query is empty, return empty response
        if (!query.trim()) {
            return res.status(200).json({
                success: true,
                count: 0,
                data: [],
            });
        }

        // Build the search condition
        const condition = {
            $or: [{
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    phone: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    orgEmail: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    urlID: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    localAddress: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    zipCode: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    "division.name": {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    "division.bn_name": {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    "district.name": {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    "district.bn_name": {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    "upazila.name": {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    "upazila.bn_name": {
                        $regex: query,
                        $options: "i"
                    }
                },
            ],
        };

        // Query with pagination
        const results = await Organization_model.find(condition)
            .skip((page - 1) * limit)
            .limit(limit);

        // Count total matching documents for pagination info
        const total = await Organization_model.countDocuments(condition);

        res.status(200).json({
            success: true,
            total, // total results matching the search
            count: results.length, // count of current page
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            data: results,
        });


    } catch (error) {
        next(error);
    }


};
