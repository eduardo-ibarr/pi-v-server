import { Router } from 'express';
import { getPendingPurchases, updatePurchaseStatus } from '../controllers/purchases-controller';

const router = Router();

router.get('/pending', getPendingPurchases);
router.post('/:purchaseId/status', updatePurchaseStatus);

export default router;
