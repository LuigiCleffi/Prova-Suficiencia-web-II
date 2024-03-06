export class ProductDoesntExistsError extends Error {
  constructor() {
    super("Product doesn't exist ")
  }
}
