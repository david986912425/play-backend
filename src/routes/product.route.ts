import { Router } from 'express';
import {
    createProduct,
    deleteProductByUuid,
    getProductByUuid,
    getProducts,
    updateProductByUuid
} from '../controllers/product.controller';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:uuid', getProductByUuid);
router.patch('/:uuid', updateProductByUuid);
router.delete('/:uuid', deleteProductByUuid);

export default router;
