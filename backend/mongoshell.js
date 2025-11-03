
import {
    MongoClient
} from "mongodb";
const uri = `mongodb+srv://helpmasum_db_user:Tn5iWaQLTbPgGrUy@cluster0.ynz17jp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);



async function removeAfield() {
    try {
        await client.connect();
        const db = client.db("test");
        const organizations = db.collection("organizations");



        const result = await organizations.updateMany({}, {
            $unset: {
                city: ""
            }
        });
        console.log(`${result.modifiedCount} documents updated`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

// removeAfield();



async function addNeedUpdateFalse() {
    try {
        await client.connect();
        const db = client.db("test"); // Replace with your database name
        const organizations = db.collection("organizations"); // Replace with your collection name

        const result = await organizations.updateMany({}, {
            $set: {
                needUpdate: false
            }
        });
        console.log(`${result.modifiedCount} documents updated`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

// addNeedUpdateFalse();

















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

async function markNeedUpdate() {
    try {
        await client.connect();
        const db = client.db("test");
        const organizations = db.collection("organizations");

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

        // Mark documents missing any required field
        const resultMissing = await organizations.updateMany(missingFieldsQuery, {
            $set: {
                needUpdate: true
            }
        });

        // Mark documents having all required fields
        const resultComplete = await organizations.updateMany(allFieldsExistQuery, {
            $set: {
                needUpdate: false
            }
        });

        console.log(`${resultMissing.modifiedCount} docs marked as needUpdate=true`);
        console.log(`${resultComplete.modifiedCount} docs marked as needUpdate=false`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

markNeedUpdate();








async function clearNeedUpdate() {
    await client.connect();
    const db = client.db("test");
    const organizations = db.collection("organizations");

    // Find docs that have all required fields
    const allFieldsExist = {
        $and: requiredFields.map(field => ({
            [field]: {
                $exists: true
            }
        }))
    };

    const result = await organizations.updateMany(allFieldsExist, {
        $set: {
            needUpdate: false
        }
    });

    console.log(`${result.modifiedCount} documents marked as needUpdate=false`);
    await client.close();
}

// clearNeedUpdate();











async function syncNeedUpdate() {
    await client.connect();
    const db = client.db("test");
    const organizations = db.collection("organizations");

    // Missing fields → needUpdate = true
    await organizations.updateMany({
        $or: requiredFields.map(f => ({
            [f]: {
                $exists: false
            }
        }))
    }, {
        $set: {
            needUpdate: true
        }
    });

    // All fields present → needUpdate = false
    await organizations.updateMany({
        $and: requiredFields.map(f => ({
            [f]: {
                $exists: true
            }
        }))
    }, {
        $set: {
            needUpdate: false
        }
    });

    console.log("needUpdate flags synced successfully");
    await client.close();
}

// syncNeedUpdate();

