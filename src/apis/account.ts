import type {
  GetAccountInfoResponse,
  UpdateAccountResponse,
  UpdateAccountRequest
} from '@/types'
import axiosInstance from '@/utils/axiosInstance'

export const updateAccountInfo = async (
  updateAccount: Partial<UpdateAccountRequest>
): Promise<UpdateAccountResponse> => {
  const { id, username, email, password } = updateAccount
  return await axiosInstance.patch(`account/${id}/update`, {
    username,
    email,
    password
  })
}

export const getAccountInfo = async ({
  accountId
}: {
  accountId: string
}): Promise<GetAccountInfoResponse> => {
  return await axiosInstance.get(`account/${accountId}`)
}
