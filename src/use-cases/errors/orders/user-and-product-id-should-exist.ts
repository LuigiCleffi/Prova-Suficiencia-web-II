export class UserAndProductIdShouldExistError extends Error {
  constructor() {
    super('User ID and Product ID must be provided to place an order.')
  }
}
