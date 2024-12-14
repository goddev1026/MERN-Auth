export enum Message {
  // Success
  Success = "Success",
  SuccessfullyUpdated = "Successfully updated.",
  SuccessfullyRemoved = "Successfully removed.",

  // Validation
  EmailRequired = "Email is required.",
  InvalidEmail = "Email is invalid.",
  PasswordRequired = "Password is requried",
  FirstNameRequired = "First name is required.",
  LastNameRequired = "Last name is required.",
  ShortPassword = "Password is shorter than minimum allowed length (8)",
  ConfirmPasswordRequired = "Confirmation password is required.",
  PasswordsNotMatch = "Password and confirmation password do not match.",

  // Mongoose Error
  UserNotFound = "User not found.",
  DuplicateKeyError = "Duplicate key error occurred.",
  InvalidId = "Id is invalid.",

  // Authentication
  InvalidLogin = "Invalid email or password.",
  InvalidToken = "Token is invalid.",
  NoPermission = "You have no permission.",

  // Server Error
  InternalServerError = "Internal server error.",
}
