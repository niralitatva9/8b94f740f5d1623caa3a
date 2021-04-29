import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type getCountryDetails = { kind: "ok"; user: User } | GeneralApiProblem
export type getWeather = { kind: "ok"; user: User } | GeneralApiProblem
