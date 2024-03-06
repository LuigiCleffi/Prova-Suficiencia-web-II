export class OrderExistsError extends Error {
  constructor() {
    super("Product doesn't exist ")
  }
}
