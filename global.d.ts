declare module "*.svg" {
  const content: any
  export default content
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}

declare module '*.gql' {
  const content: string
  export = content
}

declare namespace NodeJS {
  export interface Global {
    fetch: any
  }
  export interface Window {
    gtag: any
  }
}
