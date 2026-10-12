import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library/legacy';
import { ImageSourcePropType, Platform, StyleSheet, useWindowDimensions, View } from 'react-native';

import Button from '@/components/button';
import ImageViewer from '@/components/image-viewer';
import domtoimage from 'dom-to-image';
import { useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CircleButton from '@/components/circle-button';
import IconButton from '@/components/icon-buttons';

import EmojiList from '@/components/emoji-list';
import EmojiPicker from '@/components/emoji-picker';
import EmojiSticker from '@/components/emoji-sticker';

import EpnColors from '@/constants/epn-colors';
import { captureRef } from 'react-native-view-shot';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const compactLandscape = windowWidth > windowHeight && windowHeight < 620;
  const imageHeight = Math.min(440, Math.max(180, windowHeight - (compactLandscape ? 160 : 300)));
  const imageWidth = imageHeight * (320 / 440);
  const imageRef= useRef<View>(null);
  const [permissioResponse, requestPermission]=ImagePicker.useMediaLibraryPermissions();

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedImage, setPickedImage]=useState<ImageSourcePropType | undefined>(undefined);
  
 
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };


  const onReset= () =>{
     setShowAppOptions(false);
  }

  const onAddSticker = () =>{
    setIsModalVisible(true);
  }
  const onModalClose = () =>{
    setIsModalVisible(false);
  }

  const onSaveImageAsync = async()=>{
    if(Platform.OS !== 'web'){
    try{
      const localUri= await captureRef(imageRef,{
        width: imageWidth,
        height: imageHeight,
        quality:1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    }catch(e){
      console.log(e);
    }
  }else{
     try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: imageWidth,
          height: imageHeight,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  }
 
  useEffect(()=>{
    if(!permissioResponse?.granted){
      requestPermission();
    }
  },[]);

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
    <View style={[styles.container, compactLandscape && styles.compactLandscapeContainer]}>
      <View ref={imageRef} collapsable={false}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} imageWidth={imageWidth} imageHeight={imageHeight} />
        {pickedImage && <EmojiSticker imageSize={40} imageOffset={imageHeight - 90} stickerSource={pickedImage} />}
      </View>
      {showAppOptions ? (
        <View style={[styles.optionsContainer, compactLandscape && styles.compactLandscapeOptionsContainer]}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" variant="destructive" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={[styles.footerContainer, compactLandscape && styles.compactLandscapeFooterContainer]}>
          <Button compact={compactLandscape} theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button compact={compactLandscape} label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedImage} onCloseModal={onModalClose}></EmojiList>
      </EmojiPicker>
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    backgroundColor: EpnColors.background,
  },
  container: {
    flex: 1,
    backgroundColor: EpnColors.background,
    alignItems: 'center',
  },
  compactLandscapeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  compactLandscapeFooterContainer: {
    flex: 0,
    width: 220,
  },
    optionsContainer: {
    position: 'absolute',
    bottom: 80,
      width: 320,
      backgroundColor: EpnColors.surface,
      borderColor: EpnColors.border,
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
  },
    compactLandscapeOptionsContainer: {
      position: 'relative',
      bottom: 0,
      width: 280,
    },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
      justifyContent: 'space-between',
  },
});
