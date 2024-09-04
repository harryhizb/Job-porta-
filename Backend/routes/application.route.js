import express from 'express';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob,getApplicantsJobs,getApplicants,updateStatus } from '../controllers/application.controller.js';


const router = express.Router();

router.route('/apply/:id').get(isAuthenticated,applyJob);
router.route('/get').get(isAuthenticated,getApplicantsJobs);
router.route('/getAdminJobs/:id').get(isAuthenticated,getApplicants);
router.route('/updateStatus/:id').post(isAuthenticated,updateStatus);

export default router;