import { GpsFixIcon, MapPinIcon } from "phosphor-react-native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
export default function HomePage() {
  
  const [location, setLocation] = useState(null);
  const [currentMapLocation, setCurrentMapLocation]=useState(null);



  function getLocationInfo() {
    requestForegroundPermissionsAsync().then((permission) => {
      if (permission.status == "granted") {
        getCurrentPositionAsync().then((location) => {
          console.log(location.coords.latitude);
          console.log(location.coords.longitude);
          const currLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setLocation(currLocation);
        });
      } else {
        Alert.alert(
          "Location access denied",
          "Please allow location access through your settings app to use this feature"
        );
      }
    });
  }

    function handleMapPress(event) {
      const coordinate = {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      }
      setCurrentMapLocation(coordinate);
      
    }

    function handleConfirm(){
      setLocation(currentMapLocation)
    }
  return (
    <ScrollView style={{
        height:"100%",
        width:"100%",
    }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap:5,
          marginTop:30,
          width:"100%",
          paddingHorizontal:10,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            padding: 5,
          }}
          onPress={getLocationInfo}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Current Location:
          </Text>
          <GpsFixIcon style={{ color: "black" }} size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            padding: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Choose on map:
          </Text>
          <MapPinIcon style={{ color: "black" }} size={32} />
        </TouchableOpacity>
      </View>
      <View>
        <MapView onPress={handleMapPress} style={{height: 400}}>
          {
            currentMapLocation && <Marker coordinate={{
              latitude:currentMapLocation.latitude,
              longitude:currentMapLocation.longitude
            }}/>
          }
        </MapView>
        <TouchableOpacity onPress={handleConfirm}>
          <Text>Confirm</Text>
        </TouchableOpacity>
        <Text>{location?.latitude}</Text>
        <Text>{location?.longitude}</Text>
      </View>
    </ScrollView>
  );
}
