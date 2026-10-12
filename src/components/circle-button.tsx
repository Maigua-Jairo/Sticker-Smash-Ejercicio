import EpnColors from '@/constants/epn-colors';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, View } from "react-native";

type Props={
    onPress: ()=>void;
};

export default function CircleButton({onPress}: Props ){
    return(
        <View style={styles.circleButtonContainer}>
           <Pressable style={styles.CircleButton} onPress={onPress}>
            <MaterialIcons name="add" size={38} color={EpnColors.surface}/>
           </Pressable>
        </View>
    )
}

const styles= StyleSheet.create({
    circleButtonContainer:{
        width: 72,
        height: 72,
    borderWidth: 1,
    borderColor: EpnColors.border,
        borderRadius: 36,
    padding: 3,
    },
    CircleButton:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 36,
        backgroundColor: EpnColors.primary,
    },
})