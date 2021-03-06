export * from './date'
export * from './text'
export * from './tracking'

type urlData = {
  [key: string]: string
}

export const urlEncode = (data : urlData) => Object.keys(data)
  .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
  .join("&")
