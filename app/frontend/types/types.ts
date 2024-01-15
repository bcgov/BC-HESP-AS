import { ESortDirection } from "./enums"

export type TLatLngTuple = [number, number]

export interface IContact {
  name: string
  firstNation?: string
  title?: string
  phone?: string
  email?: string
}

export interface ISort<TField = string> {
  field: TField
  direction: ESortDirection
}

export interface IOption<TField = string> {
  name: string
  value: TField
}

export type TDebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void
