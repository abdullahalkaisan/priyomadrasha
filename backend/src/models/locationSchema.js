

import mongoose from 'mongoose';

export const locationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    bn_name: {
        type: String
    },
    division_id: {
        type: String
    }, // used for district
    district_id: {
        type: String
    } // used for upazila
}, {
    _id: false // prevents Mongoose from adding its own _id to subdocs
});
