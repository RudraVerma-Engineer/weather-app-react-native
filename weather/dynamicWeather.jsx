import { CloudIcon, CloudRainIcon, SnowflakeIcon, SunIcon } from "phosphor-react-native";
import { View } from "react-native";


function getWeatherIcon(x){
    switch(x){
        case "Clear" : return <SunIcon size={64}/>
        case "Snow" : return <SnowflakeIcon size={64}/>
        case "Clouds" : return <CloudIcon size={64}/>
        case "Rain" : return <CloudRainIcon size={64}/>
        default: return <CloudIcon size={64}/>
    }
}

export default function DynamicWeatherTop({weather}){
    
    return(
        <View style={{
            alignItems:"center",
        }}>
            {getWeatherIcon(weather)}
        </View>
    )
}