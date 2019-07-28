
import { randomString } from '@/lib/util.js'

export const getUniqueFileName = name => {
  const uniqueId = randomString()
  const extensionIndex = name.lastIndexOf('.')

  return `${name.substring(0, extensionIndex)}-${uniqueId}${name.substring(extensionIndex)}`
}