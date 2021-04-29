import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, ImageStyle, Image, View, ActivityIndicator } from "react-native"
import { Button, Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { SvgUri } from "react-native-svg"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  alignItems: "center",
}
const TEXT: TextStyle = {
  color: color.palette.black,
  fontSize: 20,
}
const WEATHR: TextStyle = {
  color: color.palette.black,
  fontSize: 22,
  fontWeight: "bold",
  backgroundColor: color.palette.lighterGrey,
  marginBottom: 5,
  padding: 10,
  textAlign: "center",
}
const BUTTON: ViewStyle = {
  height: 45,
  margin: 40,
  width: 300,
  borderRadius: 10,
}
const CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const ICON: ImageStyle = { height: 40, width: 40 }
export const CountryDetailsScreen = observer(function CountryDetailsScreen() {
  // Pull in one of our MST stores
  const { countryDetailsStore } = useStores()
  const { countryDetail } = countryDetailsStore
  const { weatherDetails } = countryDetailsStore
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const renderText = (label: string, value: any) => (
    <Text text={`${label} : ${value}`} style={TEXT} />
  )
  //on Capital Weather
  const onSubmit = () => {
    countryDetailsStore.getWeather()
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        headerTx={"CountryDetailsScreen.header"}
        titleStyle={TEXT}
        leftIcon={"back"}
        onLeftPress={() => navigation.goBack()}
      />
      <View>
        {renderText("Capital", countryDetail.capital)}
        {renderText("Population", countryDetail.population)}
        {renderText("Latitude", countryDetail.latlng[0])}
        {renderText("Longitude", countryDetail.latlng[1])}
        <View style={CONTAINER}>
          <Text text={"Flag : "} style={TEXT} />
          <SvgUri uri={countryDetail.flag} height={50} width={50} />
        </View>
      </View>
      <Button tx={"button.capitalWeather"} textStyle={TEXT} style={BUTTON} onPress={onSubmit}>
        {countryDetailsStore.isLoading && <ActivityIndicator color={color.palette.black} />}
      </Button>
      {weatherDetails && (
        <View>
          <Text tx={"CountryDetailsScreen.WeatherDetails"} style={WEATHR} />
          {renderText("Temperature", weatherDetails.temperature)}
          {renderText("Wind Speed", weatherDetails.wind_speed)}
          {renderText("Precip", weatherDetails.precip)}
          <View style={CONTAINER}>
            <Text text={"Weather Icon : "} style={TEXT} />
            <Image source={{ uri: weatherDetails.weather_icons[0] }} style={ICON} />
          </View>
        </View>
      )}
    </Screen>
  )
})
