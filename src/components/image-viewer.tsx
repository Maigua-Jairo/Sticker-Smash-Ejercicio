import EpnColors from '@/constants/epn-colors';
import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
  imageWidth: number;
  imageHeight: number;
};

export default function ImageViewer({ imgSource, selectedImage, imageWidth, imageHeight }: Props) {
    const imageSource= selectedImage ? {uri: selectedImage} : imgSource;    
  return <Image source={imageSource} style={[styles.image, { width: imageWidth, height: imageHeight }]} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: EpnColors.border,
    backgroundColor: EpnColors.surface,
  },
});
