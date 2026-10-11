import {Text, View,StyleSheet} from 'react-native';
import {Link} from 'expo-router';
import { Button } from 'expo-router/build/react-navigation';

export default function Index(){
  return(
    <View style={styles.container}>
    <Text style={styles.text}>Hello World</Text>
    <Link href="/about" style={styles.Button}> Go to AboutScreen</Link>
    </View>
  );
}

const styles= StyleSheet.create(
  {
    container:{
      flex:1,
      backgroundColor:"#25292e",
      alignItems: 'center',
      justifyContent: 'center'
    },
    text:{
      color:"#fff",
    },
    Button:{
      fontSize:20,
      textDecorationLine:'underline',
      color:'#fff'
    },
  }
);