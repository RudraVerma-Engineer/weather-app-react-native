import { BlurView } from "expo-blur";
import { StyleSheet, Text, View } from "react-native";

export default function AirCondition({ item }) {
  return (
    <BlurView intensity={50} tint="dark" style={{margin:10 ,gap:5}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent:"space-around"
        }}
      >
        <View>
          <Text style={styles.text2}>Feels Like</Text>
          <Text style={styles.text1}>{item?.main.feels_like}</Text>
        </View>
        <View>
            <Text style={styles.text2}> Presssure</Text>
            <Text style={styles.text1}>{item?.main.pressure}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent:"space-around"
        }}
      >
        <View>
          <Text style={styles.text2}>Humidity</Text>
          <Text style={styles.text1}>{item?.main.humidity}</Text>
        </View>
        <View>
            <Text style={styles.text2}> Wind</Text>
            <Text style={styles.text1}>{item?.wind?.speed} m/sec</Text>
        </View>
      </View>
       <View
        style={{
          flexDirection: "row",
          justifyContent:"space-around"
        }}
      >
        <View>
          <Text style={styles.text2}>Ground Level</Text>
          <Text style={styles.text1}>{item?.main.grnd_level} hPa</Text>
        </View>
        <View>
            <Text style={styles.text2}> Sea Level</Text>
            <Text style={styles.text1}>{item?.main.sea_level} hPa</Text>
        </View>
      </View>
       <View
        style={{
          flexDirection: "row",
          justifyContent:"space-around"
        }}
      >
        <View>
          <Text style={styles.text2}>Visibility</Text>
          <Text style={styles.text1}>{item?.visibility}</Text>
        </View>
        <View>
            <Text style={styles.text2}> Description</Text>
            <Text style={styles.text1}>{item?.weather[0].description}</Text>
        </View>
      </View>
    </BlurView>
  );
}



const styles = StyleSheet.create({
    text1:{
        textAlign:"center",
        color:"white",
        fontSize:24,
    },
    text2:{
        textAlign:"center",
        color:"",
        fontSize:25
    }
})