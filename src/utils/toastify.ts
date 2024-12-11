import { toast } from 'react-toastify'

export const toastifySuccess = (message: string, options?: any) => {
  toast.success(message, options)
}

export const toastifyError = (message: string, options?: any) => {
  toast.error(message, options)
}

export const toastifyWarning = (message: string, options?: any) => {
  toast.warning(message, options)
}
