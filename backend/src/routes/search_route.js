

import express from 'express';
import { searchOrganizations } from '../controllers/search.controller.js';



const router = express.Router();

// ✅ Statistics route (should be before /:id to avoid confusion)
router.get('/', searchOrganizations);

router.post('/', searchOrganizations);


export default router;

