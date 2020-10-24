declare module 'serviceworker-webpack-plugin/lib/runtime'

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
