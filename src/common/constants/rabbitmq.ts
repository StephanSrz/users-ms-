export enum AmqpQueues {
  usersQueue = "users"
}

export enum UsersMSG {
  CREATE = "CREATE_USER",
  FIND_ALL = "FIND_USERS",
  FIND_ONE = "FIND_USER",
  UPDATE = "UPDATE_USER",
  DELETE = "DELETE_USER",
  VALIDATE = "VALID_USER" 
}
