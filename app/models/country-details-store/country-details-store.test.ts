import { CountryDetailsStoreModel, CountryDetailsStore } from "./country-details-store"

test("can be created", () => {
  const instance: CountryDetailsStore = CountryDetailsStoreModel.create({})

  expect(instance).toBeTruthy()
})