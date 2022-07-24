import { Animated, Pressable, StyleSheet, Dimensions, Alert } from 'react-native';
import React, {  useRef, useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import AwesomeButton from "react-native-really-awesome-button";


import { setButtonBackgroundColor, setButtonBackgroundDarker, Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import model_json from '../assets/model.json';

// TODO: Move to app load, better yet. save model!
// TODO: Fork Repo or something(contriubte?)
import markovify from 'markovify';

const model = markovify.Text.from_dict(model_json);

function NewMalaphor() {
  return model.make_sentence(
    null,                           // init_state
    30,                             // max_words
    2,                              // min_words
    65                              // tries
    ) || "It's not rocket surgery"  // (default)
}

export default function MainScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const screen_height = Dimensions.get('window').height;
  const [MalaphorText, setMalaphorText] = useState(NewMalaphor());
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  function UpdateMalaphor() {
    fadeAnim.setValue(0);
    setMalaphorText(NewMalaphor())
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(MalaphorText);
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.top_section}>
          <Pressable onPress={() => {fadeIn();}}>
            <View style={styles.malaphor_section}>
              <Text style={styles.malaphor_text}>{MalaphorText}</Text>
            </View>
            <Animated.View style={[styles.copied_section, {opacity: fadeAnim}]}>
              <Text style={styles.copied_text}>Copied</Text>
            </Animated.View>
          </Pressable>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.bottom_section}>
          <AwesomeButton
            onPress={UpdateMalaphor}
            raiseLevel={7}
            borderRadius={8}
            height={screen_height*0.18}
            stretch={true}
            backgroundColor={setButtonBackgroundColor()}
            backgroundDarker={setButtonBackgroundDarker()}
            style={{}}
            ><Text style={styles.button_text}>Mala-more</Text>
            </AwesomeButton> 
        </View>
      </View>
    </View>
  );
}

const DEBUG = 0

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  container: {
    marginVertical: "10%",
  },
  top_section: {
    alignSelf:'center',
    justifyContent: 'center',
    borderWidth: DEBUG,
    height: '65%',
    width: '100%'
  },
  malaphor_section: {
    paddingHorizontal: '10%',
    borderWidth: DEBUG,
    justifyContent: 'center',
    height: '85%',
  },
  malaphor_text: {
    fontSize: 34,
    fontFamily: 'ibarra-bold',
    textAlign: 'center',
  },
  copied_section: {
    borderWidth: DEBUG,
    height: '15%',
    justifyContent: 'flex-end',
  },
  copied_text: {
    fontFamily: 'ibarra-bold',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 20
  },
  separator: {
    alignSelf:'center',
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  bottom_section: {
    marginHorizontal: '10%',
    justifyContent: 'center',
    height: '30%',
  },
  button_text: {
    fontSize: 30,
    lineHeight: 36,
    fontFamily: 'ibarra-reg',
  },
});
