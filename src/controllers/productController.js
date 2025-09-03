import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getProducts(req, res) {
  const products = await prisma.product.findMany();
  res.json(products);
}

export async function createProduct(req, res) {
  const { name, price, stock } = req.body;
  const product = await prisma.product.create({ data: { name, price, stock } });
  res.status(201).json(product);
}