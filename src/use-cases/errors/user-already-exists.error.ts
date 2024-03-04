export class UserPhoneNumberExistsError extends Error {
  constructor() {
    super('User with same phone number already exists')
  }
}
