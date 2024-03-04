import { describe, expect, it } from 'vitest'
import { PlaceAnOrderUseCase } from './place-a-order'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/in-memory-orders-repository'
import { beforeEach } from 'node:test'

let orderRepository: InMemoryOrdersRepository
let sut: PlaceAnOrderUseCase

describe('Place new Order UseCase', () => {
  beforeEach(() => {
    orderRepository = new InMemoryOrdersRepository()
    sut = new PlaceAnOrderUseCase(orderRepository)
  })

  it('should be able to place a new order', async () => {
    const { product } = await sut.createOrder({
      productId: 1,
      userId: '12',
    })

    expect(product.id).toEqual(expect.any(Number))
  })
})
