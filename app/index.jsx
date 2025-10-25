import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { CloudIcon, CloudRainIcon, GpsFix, MapPin, SnowflakeIcon, SunIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AirCondition from "../weather/airconditions";
import DynamicWeatherTop from "../weather/dynamicWeather";
import ForeCast from "../weather/forecast";

const apiKey = "cefa9ba397f9432bd371908c31526124";

export default function HomePage() {
    const [location, setLocation] = useState(null);
    const [currentMapLocation, setCurrentMapLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [forecastData, setForecastData] = useState(null);
    
    
    
    // function fetch location from current location 
    function getLocationInfo() {
        requestForegroundPermissionsAsync().then((permission) => {
            if (permission.status === "granted") {
                getCurrentPositionAsync().then((location) => {
                    const currLocation = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }
                    setLocation(currLocation);
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${currLocation.latitude}&lon=${currLocation.longitude}&appid=${apiKey}&units=metric`;
                    // fetching weather data from current location
                    fetch(url).then(function (resp) {
                        resp.json().then(function (data) {
                            setWeatherData(data)
                            // console.log(data?.main)
                        })
                    })
                    const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currLocation.latitude}&lon=${currLocation.longitude}&appid=${apiKey}&units=metric`;
                    // forecast data from current location 
                    fetch(forecasturl).then(function (resp) {
                        resp.json().then(function (data) {
                            setForecastData(data)
                        })
                    })
                })
            } else {
                Alert.alert("Location access denied", "Please allow location access through your setting app to use this feature")
            }
        })
    }
    // fetch the location from map
    function handleMapPress(event) {
        const coordinate = {
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        }
        setCurrentMapLocation(coordinate);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${apiKey}&units=metric`;
        // fetching weatherdata for map location  
        fetch(url).then(function (resp) {
            resp.json().then(function (data) {
                setWeatherData(data)
                // console.log(data)
            })
        })
        const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${apiKey}&units=metric`;
        //forecast data from map location
        fetch(forecasturl).then(function (resp) {
            resp.json().then(function (data) {
                setForecastData(data);
                // console.log(data)
            })
        })
    }
    const x = weatherData?.weather[0].main
    function getWeatherIcon() {
        switch (x) {
            case "Clear": return <SunIcon size={64} />
            case "Snow": return <SnowflakeIcon size={64} />
            case "Clouds": return <CloudIcon size={64} />
            case "Rain": return <CloudRainIcon size={64} />
            default: return <CloudIcon size={64} />
        }
    }
    // function setLocation And Close map 
    function handleConfirm() {
        setLocation(currentMapLocation);
        setShowMap(false);
    }
    // opening of Map 
    function openMap() {
        setShowMap(true);
    }


useEffect(function(){
    getLocationInfo()
},[]);

    // return
    return (
        <ImageBackground source={require("../image/weather.png")} style={{ height: "100%" }}>
            <ScrollView >
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.container2}
                        onPress={getLocationInfo}>
                        <Text style={styles.text1}>
                            Current Location:
                        </Text>
                        <GpsFix size={24} style={styles.text1} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.container2} onPress={openMap}>
                        <Text style={styles.text1}>
                            Choose on map:</Text>
                        <MapPin size={24} style={styles.text1} />
                    </TouchableOpacity>
                </View>
                <Modal visible={showMap} transparent={true}>
                    <View style={{
                        width: "95%",
                        margin: "auto",
                        boxShadow: "0 0 20px 5px black",
                    }}>
                        <MapView onPress={handleMapPress} zoomEnabled={true} style={{
                            height: 400,


                        }}  >{currentMapLocation && <Marker coordinate={{
                            latitude: currentMapLocation.latitude,
                            longitude: currentMapLocation.longitude
                        }} />} </MapView>
                        <TouchableOpacity onPress={handleConfirm}
                            style={{

                                borderRadius: 10,
                                margin: 10,
                                padding: 5,
                                backgroundColor: "black",
                                alignItems: "center",

                            }}><View style={{
                                flexDirection: "row",
                                gap: 1,
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    color: "white",
                                    padding: 5
                                }}>
                                    Confirm Location :
                                </Text>
                                <Text><MapPin size={14} style={styles.text1} /></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View>
                    {
                        weatherData &&
                        <Text style={styles.weatherName}>{weatherData?.name}
                        </Text>}
                    {
                        weatherData && <Text style={styles.currerntTemp}>
                            {weatherData?.main.temp}°C
                        </Text>
                    }
                    {
                        weatherData &&
                        <DynamicWeatherTop item={weatherData?.weather[0].main} />
                    }
                    {
                        weatherData && <Text style={styles.weatherDetails}>
                            {weatherData?.weather[0].main}
                        </Text>

                    }
                    {forecastData &&
                        <Text style={{ fontSize: 42 }}>Forecast</Text>
                    }
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.container1}>
                        {
                            forecastData?.list.map(function (item) {
                                return <ForeCast key={item.dt} item={item} />
                            })
                        }
                    </View>
                </ScrollView>
                { weatherData && 
                    <Text style={{
                        fontSize:42
                    }}>Air Conditions</Text>
                }
                   <View>
                        {weatherData &&

                            <AirCondition item={weatherData} />
                        }
                    </View> 
            </ScrollView>
        </ImageBackground>
    )
}

// StyleSheets

const styles = StyleSheet.create({
    container1: {

        flexDirection: "row",
        gap: 5,
        margin: 5
    },
    container2: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 10,
        padding: 5,
        gap: 2
    },
    text1: {
        color: "white"
    },
    weatherName: {
        fontSize: 52,
        fontWeight: "600",
        textAlign: "center",
    },
    currerntTemp: {
        fontSize: 42,
        fontWeight: "600",
        textAlign: "center",
    },
    weatherDetails: {
        fontSize: 52,
        textAlign: "center",
    },
    

})