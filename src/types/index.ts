export * from './invoice'

declare global {
  interface BooleanConstructor {
    <T>(value?: T): value is Exclude<T, false | null | undefined | '' | 0>
  }
}
