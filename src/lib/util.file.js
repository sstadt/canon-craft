
import sanitize from 'sanitize-filename'
import { randomString } from '@/lib/util.js'

export const getUniqueFileName = name => {
  const fileName = sanitize(name).replace(new RegExp(' ', 'g'), '')
  const uniqueId = randomString()
  const extensionIndex = fileName.lastIndexOf('.')

  return `${fileName.substring(0, extensionIndex)}-${uniqueId}${fileName.substring(extensionIndex)}`
}