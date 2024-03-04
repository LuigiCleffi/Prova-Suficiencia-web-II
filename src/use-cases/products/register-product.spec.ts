import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProductRepository } from '../../repositories/in-memory/in-memory-product-repository'
import { RegisterProductUseCase } from './register-product'
import { ProductAlreadyExistsError } from '../errors/products/product-already-exists'

let productRepository: InMemoryProductRepository
let sut: RegisterProductUseCase

describe('Register use case', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new RegisterProductUseCase(productRepository)
  })

  it('should be able to register a new product', async () => {
    const { product } = await sut.execute({
      name: 'X-salad',
      price: 12,
    })

    expect(product.id).toEqual(expect.any(Number))
  })

  it('should not be able to register two products with the same name', async () => {
    const productName = 'X-salad'

    await sut.execute({
      name: productName,
      price: 12,
    })

    await expect(() =>
      sut.execute({
        name: productName,
        price: 12,
      }),
    ).rejects.toBeInstanceOf(ProductAlreadyExistsError)
  })
})
