import { getCurrentPositionAsync, requestForegroundPermissionsAsync, } from "expo-location";
import { GpsFix, MapPin, SealCheck } from "phosphor-react-native";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function HomePage() {
    const [location , setLocation ] =useState(null);
    const [currentMapLocation , setCurrentMapLocation] = useState(null); 

    function getLocationInfo() {
        requestForegroundPermissionsAsync().then((permission)=>{
            if(permission.status ==="granted"){
                getCurrentPositionAsync().then((location)=>{
                    const currLocation={
                        latitude : location.coords.latitude,
                        longitude : location.coords.longitude
                    }
                    setLocation(currLocation);
                })
            }else{
                Alert.alert("Location access denied","Please allow location access through your setting app to use this feature")
            }
        })
    }

    function handleMapPress(event){
        const coordinate={
            latitude:event.nativeEvent.coordinate.latitude,
            longitude:event.nativeEvent.coordinate.longitude
        }
        setCurrentMapLocation(coordinate);
    }

    function handleConfirm(){
        setLocation(currentMapLocation);
    }

    return (
        <ScrollView >
            <View style={{
                flexDirection:"row",
                gap:5,
                margin:5

            }}>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "black",
                    borderRadius: 10,
                    padding:5,
                    gap:2
                }}onPress={getLocationInfo}>
                    <Text style={{
                        color: "white",
                    }}>Current Location:</Text>
                    <GpsFix size={24} style={{
                        color: "white",
                    }} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor:"black",
                    flexDirection:"row",
                    borderRadius:10,
                    alignItems:"center",
                    padding:5,
                    gap:2,
                }}>
                    <Text style={{
                        color:"white",
                    }}>Choose on map:</Text>
                    <MapPin size={24} style={{
                        color: "white"
                    }}></MapPin>
                </TouchableOpacity>
                
            </View>
            <View>
                <MapView onPress={handleMapPress} zoomEnabled={true} style={{
                    height:400,
                    boxShadow:"0 0 10px 10px black"
                }}  >{currentMapLocation && <Marker coordinate={{
                    latitude : currentMapLocation.latitude,
                    longitude : currentMapLocation.longitude
                }} />} </MapView>
                
            </View>
            <View style={{
                marginTop:10,
            }}>
                <TouchableOpacity onPress={handleConfirm}
                style={{
                    
                    borderRadius:10,
                    margin:10,
                    padding:5,
                    backgroundColor:"black",
                    alignItems:"center",
                    
                }}><View style={{
                    flexDirection:"row",
                    gap:1
                }}>
                    <Text style={{
                        color:"white",
                        padding:5,
                        textAlign:"center"
                    }}>
                        Confirm :
                    </Text>
                    <Text><SealCheck size={24} style={{color:"white"}} /></Text>
                </View>
                </TouchableOpacity>
                <Text>{location?.latitude}</Text>
                <Text>{location?.longitude}</Text>
            </View>
        </ScrollView>
    )
}