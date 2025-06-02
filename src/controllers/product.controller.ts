import { Request, Response, NextFunction } from 'express';
import {
    createProductService,
    deleteProductByUuidService,
    getProductByUuidService,
    getProductsService, updateProductByUuidService
} from "../services/product.service";

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, description } = req.body;
        await createProductService(name, description, req.files!);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await getProductsService();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductByUuid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { uuid } = req.params;
        const product = await getProductByUuidService(uuid);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const deleteProductByUuid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { uuid } = req.params;
        await deleteProductByUuidService(uuid);
        res.json({ message: `Producto con UUID ${uuid} eliminado correctamente.` });
    } catch (error) {
        next(error);
    }
};

export const updateProductByUuid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { uuid } = req.params
        const updateData = req.body

        if (!uuid) {
            res.status(400).json({ message: "UUID es requerido" })
            return
        }

        await updateProductByUuidService(uuid, updateData);

        res.status(200).json()
    } catch (error) {
        next(error)
    }
}
