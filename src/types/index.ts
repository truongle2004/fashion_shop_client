export interface GetKeyResponse {
  publicKey: string
}

export interface LoginResponse {
  message: string
  email: string
  id: string
  username: string
}

export interface UpdateAccountRequest {
  id: string
  username: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
}

export interface UpdateAccountResponse {
  message: string
  id: string
  username: string
  email: string
}

export interface GetAccountInfoResponse {
  id: string
  username: string
  email: string
}

export interface RefreshTokenResponse {
  accessToken: string
}

export interface FashionProduct {
  _id: string
  _name: string
  _price: number
  _size: string[]
  _category: string
  _currency: string
  _descriptionOfUse: string[]
  _features: string[]
  _imagesColor: Array<{
    _id: string
    _url: string
    _color?: string
  }>
}
