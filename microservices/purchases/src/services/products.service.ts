import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, { lower: true });

    const hasProductWithSomeSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (hasProductWithSomeSlug) {
      throw new Error('Another product with some slug already exists.');
    }

    return await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
