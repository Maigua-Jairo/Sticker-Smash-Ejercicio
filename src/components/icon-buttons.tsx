import EpnColors from '@/constants/epn-colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'destructive';
};

export default function IconButton({ icon, label, onPress, variant = 'primary' }: Props) {
  const backgroundColor = variant === 'destructive' ? EpnColors.destructive : EpnColors.primary;

  return (
    <Pressable style={[styles.iconButton, { backgroundColor }]} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color={EpnColors.surface} />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 72,
    minHeight: 72,
    borderRadius: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: EpnColors.surface,
    fontSize: 12,
    marginTop: 6,
  },
});
