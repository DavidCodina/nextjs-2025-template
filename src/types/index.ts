// This is an example of a type that can be used as a client/server contract for API calls.

export type Code =
  | 'OK'
  | 'CREATED'
  | 'UPDATED'
  | 'DELETED'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR'
  | 'STOCK_ERROR_FOUND'
  | 'PRICE_ERROR_FOUND'
  | 'ORDER_EXISTS'
  | 'USER_ARCHIVED'
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_UNVERIFIED'

export type ResBody<DataType> = {
  data: DataType
  message: string
  success: boolean
  errors?: Record<string, string> | null
  code?: Code

  // Adding this makes the type more flexible, while still being informative. That
  // said, if you need additional properties, it's MUCH safer to write a custom type.
  // [key: string]: any
}

export type ResponsePromise<T = unknown> = Promise<ResBody<T>>

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  password?: string
  role: 'USER' | 'ADMIN' // Assuming Role is an enum with these values
  address?: Record<string, unknown> // JSON can be an object with any structure
  createdAt: string // Would be date, but transformed to string with Prisma $extends.
  updatedAt: string // Would be date, but transformed to string with Prisma $extends.
  posts: Post[]
}

export type Post = {
  id: string
  title: string
  body: string
  published: boolean
  author?: User
  authorId: string
  createdAt: string // Would be date, but transformed to string with Prisma $extends.
  updatedAt: string // Would be date, but transformed to string with Prisma $extends.
}
