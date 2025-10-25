import { BlurView } from "expo-blur";
import { Cloud, CloudRain, Snowflake, Sun } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";

function getWeatherIcon(x) {
  switch (x) {
    case "Clear":
      return <Sun size={64} style={{ color: "darkgrey" }} />;
    case "Snow":
      return <Snowflake size={64} style={{ color: "darkgrey" }} />;
    case "Clouds":
      return <Cloud size={64} style={{ color: "darkgrey" }} />;
    case "Rain":
      return <CloudRain size={64} style={{ color: "darkgrey" }} />;
    default:
      return <Cloud size={64} style={{ color: "darkgrey" }} />;
  }
}

export default function ForeCast({ item }) {
  const temp = item.main.temp;
  const weather = item.weather[0].main;
  const dateTime = item.dt_txt;

  const arrDateTime = dateTime.split(" ");
  const date = arrDateTime[0];
  const time = arrDateTime[1];
  const requiredTime = time.slice(0, time.length - 3);

  return (
    <BlurView intensity={50} tint="dark">
      <View style={styles.MainView}>
        <Text style={styles.text}>{requiredTime}</Text>
        <Text style={styles.text}>{date}</Text>
        {getWeatherIcon(weather)}
        <Text style={styles.text}>{temp}°C</Text>
        <Text style={styles.text}>{weather}</Text>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: "center",
    color: "darkgrey",
  },
  MainView: {
    padding: 10,
    paddingVertical: 30,
    // backgroundColor : "lightgray",
    borderRadius: 30,
    gap: 5,
    alignItems: "center",
  },
});
