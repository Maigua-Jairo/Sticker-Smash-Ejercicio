import EpnColors from '@/constants/epn-colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props={
    label: string,
    theme?: 'primary',
  compact?: boolean,
    onPress?:()=> void;
}

export default function Button({label, theme, compact = false, onPress}: Props){
  if (theme === 'primary') {
  return (
    <View style={[styles.buttonContainer, compact && styles.compactButtonContainer]}>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color={EpnColors.surface} style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, styles.primaryButtonLabel]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
    return (
    <View style={[styles.buttonContainer, compact && styles.compactButtonContainer]}>
      <Pressable style={[styles.button, styles.secondaryButton]} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles= StyleSheet.create({
    buttonContainer:{
    width: 320,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    },
    compactButtonContainer: {
    width: '100%',
    },
    button:{
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    },
    primaryButton: {
    backgroundColor: EpnColors.primary,
    borderRadius: 10,
    },
    primaryButtonLabel: {
    color: EpnColors.surface,
    },
    secondaryButton: {
    backgroundColor: EpnColors.surface,
    borderColor: EpnColors.border,
    borderWidth: 1,
    borderRadius: 10,
    },
    buttonIcon: {
    paddingRight: 8,
  },
    buttonLabel:{
    color: EpnColors.text,
    fontSize: 16,
    },
});