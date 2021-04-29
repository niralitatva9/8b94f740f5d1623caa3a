import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Api } from "../../services/api"

const api = new Api()
api.setup()
/**
 * Model description here for TypeScript hints.
 */
export const CountryDetailsStoreModel = types
  .model("CountryDetailsStore")
  .props({
    countryName: types.optional(types.string, ""),
    isLoading: types.optional(types.boolean, false),
    countryDetail: types.maybeNull(types.frozen()),
    weatherDetails: types.maybeNull(types.frozen()),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearWeather() {
      self.weatherDetails = null
    },
    updateCountry(value: string) {
      self.countryName = value
    },
    getCountryDetails: flow(function* getCountryDetails() {
      try {
        self.isLoading = true
        const response = yield api.getCountryDetails(self.countryName)
        if (response.kind == "ok") {
          const data = response.user
          let found = false
          if (data.length) {
            for (let index = 0; index < data.length; index++) {
              if (data[index].name.toLocaleLowerCase() == self.countryName.toLocaleLowerCase()) {
                self.countryDetail = data[index]
                found = true
                self.isLoading = false
              }
            }
          }
          if (!found) {
            self.countryDetail = null
          }
          self.isLoading = false
        } else {
          self.isLoading = false
          self.countryDetail = null
        }
      } catch (error) {
        self.isLoading = false
        console.log(error)
      }
    }),
    getWeather: flow(function* getWeather() {
      try {
        self.isLoading = true
        const response = yield api.getWeather(self.countryDetail.capital)
        if (response.kind == "ok") {
          self.weatherDetails = response.user.current
          self.isLoading = false
        }
        self.isLoading = false
      } catch (error) {
        self.isLoading = false
        console.log(error)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CountryDetailsStoreType = Instance<typeof CountryDetailsStoreModel>
export interface CountryDetailsStore extends CountryDetailsStoreType {}
type CountryDetailsStoreSnapshotType = SnapshotOut<typeof CountryDetailsStoreModel>
export interface CountryDetailsStoreSnapshot extends CountryDetailsStoreSnapshotType {}
