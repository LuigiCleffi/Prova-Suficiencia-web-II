import { Order } from '@prisma/client'
import { OrderRepository } from 'repositories/orders-repository'
// import { ProductAlreadyExistsError } from 'use-cases/errors/products/product-already-exists'

interface OrderUseCaseRequest {
  userId: number
  productId: number
}

interface OrderUseCaseResponse {
  product: Order
}

export class PlaceAnOrderUseCase {
  constructor(private productRepository: OrderRepository) {}

  async createOrder({
    productId,
    userId,
  }: OrderUseCaseRequest): Promise<OrderUseCaseResponse> {
    // const findProduct = await this.productRepository.getProductById(productId)
    // console.log('findProduct', findProduct, productId)

    // if (!findProduct) {
    //   // should be product not found
    //   throw new ProductAlreadyExistsError()
    // }

    const product = await this.productRepository.placeOrder({
      product: {
        connect: {
          id: productId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    })

    return { product }
  }
}
