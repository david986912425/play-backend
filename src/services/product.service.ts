import Product from '../models/Product';
import { FileArray } from 'express-fileupload';
import { uploadFile } from '../helpers/upload.file';
import { v4 as generateUUID } from 'uuid';

export const createProductService = async (
    name: string,
    description: string | undefined,
    files: FileArray
) => {
    if (!name) {
        throw new Error('El nombre del producto es requerido.');
    }

    if (!files || !files.image) {
        throw new Error('No se encontró la imagen del producto.');
    }

    const productUuid = generateUUID();
    const imageUrl = await uploadFile(files, productUuid);

    await Product.create({
        uuid: productUuid,
        name,
        description,
        image: imageUrl,
    });
};

export const getProductsService = async () => {
    return Product.find();
};

export const getProductByUuidService = async (uuid: string) => {
    const product = await Product.findOne({ uuid });
    if (!product) {
        throw new Error(`Producto con UUID ${uuid} no encontrado.`);
    }
    return product;
};

export const deleteProductByUuidService = async (uuid: string) => {
    const product = await Product.findOneAndDelete({ uuid });
    if (!product) {
        throw new Error(`Producto con UUID ${uuid} no encontrado.`);
    }
    return product;
};

export const updateProductByUuidService = async (
    uuid: string,
    updateData: Record<string, any>
) => {
    const updatedProduct = await Product.findOneAndUpdate(
        { uuid },
        updateData,
        { new: true }
    )

    if (!updatedProduct) {
        throw new Error("Producto no encontrado")
    }
}
