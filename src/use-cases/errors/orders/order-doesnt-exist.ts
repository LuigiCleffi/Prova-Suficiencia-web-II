export class OrderDoesntExistError extends Error {
  constructor() {
    super("Product doesn't exist ")
  }
}
