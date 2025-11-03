


import mongoose from 'mongoose';
import {
    locationSchema
} from './locationSchema.js';

const orgSchema = new mongoose.Schema({
    // ✅ Basic Info
    name: {
        type: String,
        required: [true, 'Please provide an organization name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },

    urlID: {
        type: String,
        required: [true, 'Please provide a URL ID'],
        unique: true,
        trim:true,
        match: [/^[a-z0-9-]+$/, 'URL ID can only contain lowercase letters, numbers, and hyphens']
    },

    // ✅ User email (owner or contact person)
    emailUser: {
        type: String,
        required: [true, 'Please provide the user email'],
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },

    // ✅ Organization’s official email
    orgEmail: {
        type: String,
        required: [true, 'Please provide organization email'],
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },

    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        match: [/^\+?[0-9]{7,15}$/, 'Please provide a valid phone number']
    },

    // ✅ Location objects
    division: {
        type: locationSchema,
        required: true
    },
    district: {
        type: locationSchema,
        required: true
    },
    upazila: {
        type: locationSchema,
        required: true
    },

    // ✅ Address Fields
    localAddress: {
        type: String,
        trim: true
    },
    zipCode: {
        type: String,
        required: [true, 'Please provide a zip code'],
        trim: true
    },
    mapLink: {
        type: String,
        trim: true,
        match: [
            /^(https?:\/\/)?(www\.)?google\.com\/maps/,
            'Please provide a valid Google Maps link'
        ]
    },

    residencyType:{
        type: String,
        required: [true, 'Please provide a Residency Type'],
        trim: true
    },

    checkBoxValues:{
        type: Array,
        required: [true, 'Please provide checkBoxValues '],
    },

    // ✅ Media & Description
    details: {
        type: String,
        maxlength: [2000, 'Details cannot exceed 2000 characters']
    },
    logoUrl: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Please provide a valid logo URL']
    },
    coverUrl: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Please provide a valid cover URL']
    },
    galleryUrls: {
        type: [String],
        trim: true,
        match: [/^https?:\/\/.+/, 'Please provide a valid cover URL']
    },

    // ✅ Status Flags
    isPending: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isRejected: {
        type: Boolean,
        default: false
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    // needUpdate:{
    //     type: Boolean,
    //     default: false
    // }
}, {
    timestamps: true
});

// ✅ Clean up output (optional)
orgSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const Organization = mongoose.model('Organization', orgSchema);
export default Organization;

