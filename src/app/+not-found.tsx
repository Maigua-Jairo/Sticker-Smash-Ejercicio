import EpnColors from '@/constants/epn-colors';
import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen(){
   return(
    <>
    <Stack.Screen options={{title: 'Oops! Not Found'}}/>
    <View style={styles.container}>
        <Link href="/"style={styles.button}>
        Go back to HomeScreen!
        </Link>
    </View>
    </>
   )
}
const styles= StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: EpnColors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: EpnColors.primary,
  },
})