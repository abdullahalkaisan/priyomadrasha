
import Organization_model from '../models/organization.model.js';

const requiredFields = [
    "name",
    "urlID",
    "emailUser",
    "orgEmail",
    "phone",
    "division",
    "district",
    "upazila",
    "zipCode",
    "logoUrl",
    "coverUrl",
    "galleryUrls",
    "isPending",
    "isActive",
    "isRejected",
    "isEdited",
    "residencyType",
    "checkBoxValues"
];




export const markNeedUpdate = async () => {
    try {
        // Condition for missing ANY required field
        const missingFieldsQuery = {
            $or: requiredFields.map(field => ({
                [field]: {
                    $exists: false
                }
            }))
        };

        // Condition for ALL required fields existing
        const allFieldsExistQuery = {
            $and: requiredFields.map(field => ({
                [field]: {
                    $exists: true
                }
            }))
        };

        // Mark missing or incomplete ones
        const resultMissing = await Organization_model.updateMany(missingFieldsQuery, {
            $set: {
                needUpdate: true
            }
        });

        // Mark complete ones
        const resultComplete = await Organization_model.updateMany(allFieldsExistQuery, {
            $set: {
                needUpdate: false
            }
        });

        console.log(
            `${resultMissing.modifiedCount} docs marked as needUpdate=true`
        );
        console.log(
            `${resultComplete.modifiedCount} docs marked as needUpdate=false`
        );
    } catch (err) {
        console.error("Error marking needUpdate:", err);
    }
}
