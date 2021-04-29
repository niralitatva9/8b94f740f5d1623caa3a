import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Alert,
  Keyboard,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  ActivityIndicator,
} from "react-native"
import { Button, Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  color: color.palette.black,
  fontSize: 20,
}
const INPUT: ViewStyle = {
  height: 50,
  paddingLeft: 5,
  marginHorizontal: 20,
  borderWidth: 1,
}
const BUTTON: ViewStyle = {
  height: 45,
  margin: 40,
  borderRadius: 10,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}
export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { countryDetailsStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [country, setCountry] = useState<string>("")
  const onChangeValue = (value: string) => {
    setCountry(value)
    countryDetailsStore.updateCountry(value)
  }
  const onSubmit = async () => {
    countryDetailsStore.clearWeather()
    await countryDetailsStore.getCountryDetails()
    if (countryDetailsStore.countryDetail !== null) {
      navigation.navigate("countryDetail")
    } else {
      Alert.alert("No Record Found!")
    }
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header headerText={"Dashboard"} titleStyle={TEXT} />
      <View style={CONTAINER}>
        <TextInput
          placeholder={"Enter country"}
          style={INPUT}
          value={country}
          onChangeText={(text) => onChangeValue(text)}
          onSubmitEditing={() => Keyboard.dismiss}
        />
        <Button
          text={"Submit"}
          textStyle={TEXT}
          style={[BUTTON, { opacity: country == "" ? 0.5 : 1 }]}
          onPress={onSubmit}
          disabled={country == "" ? true : false}
        >
          {countryDetailsStore.isLoading && <ActivityIndicator color={color.palette.black} />}
        </Button>
      </View>
    </Screen>
  )
})
