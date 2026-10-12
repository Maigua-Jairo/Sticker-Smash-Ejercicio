import { View, StyleSheet, ImageBackgroundBase, ImageSourcePropType, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library/legacy';

import { useState, useEffect, useRef} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Button from '@/components/button';
import ImageViewer from '@/components/image-viewer';
import domtoimage from 'dom-to-image';

import CircleButton from '@/components/circle-button';
import IconButton from '@/components/icon-buttons';

import EmojiPicker from '@/components/emoji-picker';
import EmojiList from '@/components/emoji-list';
import EmojiSticker from '@/components/emoji-sticker';

import {captureRef} from'react-native-view-shot';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
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
        height:440,
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
          width: 320,
          height: 440,
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
    <GestureHandlerRootView  style={styles.container}>
    <View style={styles.container}>
      <View ref={imageRef} collapsable={false}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedImage && <EmojiSticker imageSize={40} stickerSource={pickedImage}  />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
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
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
    optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
