import forge from 'node-forge'

/**
 * encrypt password
 * @params {string} password
 * @params {string} publicKey
 * @returns {string} encrypted password
 * */
export const encryptPassword = (
  password: string,
  publicKeyPem: string
): string => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem)
  const encrypted = publicKey.encrypt(password, 'RSA-OAEP')
  return forge.util.encode64(encrypted)
}
