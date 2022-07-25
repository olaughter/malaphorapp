import { Animated, Pressable, StyleSheet, Dimensions } from 'react-native';
import React, {  useRef, useState } from 'react';
import * as Clipboard from 'expo-clipboard';

import AwesomeButton from "../components/react-native-really-awesome-button/index";
import { setButtonBackgroundColor, setButtonBackgroundDarker, Text, View, FontSizes } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import model_json from '../assets/model.json';
import markovify from 'markovify';


// TODO: Move to app load, better yet. save model!
// TODO: Fork Repo or something(contriubte?)
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

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.top_section}>
          <Pressable onPress={() => {copyToClipboard(MalaphorText); fadeIn();}}>
            <View style={styles.malaphor_section}>
              <Text
                style={styles.malaphor_text}
                numberOfLines={5}
                >{MalaphorText}</Text>
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
            style={styles.more_button}
            ><Text style={styles.button_text}>More!</Text>
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
    marginTop: "10%",
  },
  top_section: {
    alignSelf:'center',
    justifyContent: 'center',
    borderWidth: DEBUG,
    height: '68%',
    width: '100%'
  },
  malaphor_section: {
    paddingHorizontal: '10%',
    borderWidth: DEBUG,
    justifyContent: 'center',
    height: '85%',
  },
  malaphor_text: {
    fontSize: FontSizes.malaphor_text,
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
    fontSize: FontSizes.copied_text,
    lineHeight: FontSizes.copied_text
  },
  separator: {
    alignSelf:'center',
    marginTop: '2%',
    height: 1,
    width: '80%',
  },
  bottom_section: {
    marginHorizontal: '10%',
    justifyContent: 'center',
    height: '30%',
  },
  more_button: {
    marginTop: '5%',
    marginBottom: '5%',
  },
  button_text: {
    fontSize: FontSizes.button_text,
    lineHeight: FontSizes.button_text,
    fontFamily: 'ibarra-reg',
  },
});
