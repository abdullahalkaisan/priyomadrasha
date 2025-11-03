

import express from 'express';

import {
    getAllOrganizations,
    getOrganizationById,
    getOrganizationsByUserEmail,
    createOrganization,
    updateOrganization,
    approveOrganization,
    rejectOrganization,
    deleteOrganization,
    getOrganizationStats,
    getOrganizationByUrlID,
    updateOrganizationByUrlID,
    getAllActiveOrganizations
} from '../controllers/organization.controller.js';

const router = express.Router();

// ✅ Statistics route (should be before /:id to avoid confusion)
router.get('/stats/summary', getOrganizationStats);

// ✅ Get organizations by user email
router.get('/user/:email', getOrganizationsByUserEmail);

// ✅ Main CRUD routes
router
    .route('/')
    .get(getAllOrganizations)
    .post(createOrganization);

router.route('/active').get(getAllActiveOrganizations);

router
    .route('/:id')
    .get(getOrganizationById)
    .put(updateOrganization)
    .delete(deleteOrganization);

router.route('/url/:urlID').get(getOrganizationByUrlID);

// ✅ Admin approval routes
router.patch('/:id/approve', approveOrganization);
router.patch('/:id/reject', rejectOrganization);

export default router;







