import { create } from 'zustand'

interface Account {
  username?: string
  email?: string | null
  id?: string | null
  // image?: string | null // Optional image attribute
}

interface AccountState {
  account: Account | null
  token: string | null
  setAccount: (accountInfo: Partial<Account>) => void
  setToken: (token: string) => void
  resetAccount: () => void
}

const accountStore = create<AccountState>((set) => ({
  account: null,
  token: null,

  setAccount: (accountInfo: Partial<Account>) => {
    set((state) => ({
      account: {
        ...state.account,
        ...accountInfo
      }
    }))
  },

  setToken: (token: string) => set({ token }),

  resetAccount: () => set({ account: null, token: null })
}))

export default accountStore
