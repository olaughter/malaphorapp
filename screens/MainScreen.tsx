import { Share, Pressable, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

import { FontAwesome } from '@expo/vector-icons';
import AwesomeButton from "../components/awesome-button/index";
import { setButtonBackgroundColor, setButtonBackgroundDarker, Text, View, FontSizes } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import model_json from '../assets/model.json';
import markovify from 'markovify';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

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
  let colorScheme = useColorScheme();

  function UpdateMalaphor() {
    setMalaphorText(NewMalaphor())
  };

  const onShare = async (text: string) => {
    try {
      const result = await Share.share({
        message: '"' + text + '" - The Malaphor Maker',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        alert("Sorry, something went wrong with sharing");
      }
    } catch (error) {
      alert("Sorry, something went wrong with sharing");
    }
    
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.top_section}>
          <Pressable onPress={() => {onShare(MalaphorText);}}>
            <View style={styles.malaphor_section}>
              <Text
                style={styles.malaphor_text}
                numberOfLines={5}
                >{MalaphorText}</Text>
            </View>
            <View style={styles.share_container}>
              <FontAwesome
                name="share-square-o"
                size={28}
                color={Colors[colorScheme].text}
                style={styles.share_icon}
              />
            </View>
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
  share_container: {
    alignItems: 'center',
    height: '15%',
    justifyContent: 'center',
  },
  share_icon: {
    opacity: 0.5
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
