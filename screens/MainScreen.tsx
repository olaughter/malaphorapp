import { Pressable, StyleSheet, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import useColorScheme from '../hooks/useColorScheme';
import AwesomeButton from "react-native-really-awesome-button";

import { Text, View } from '../components/Themed';
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

function setButtonBackgroundColor() {
  let colorScheme = useColorScheme();

  if (colorScheme === 'dark') {
    return '#3C4042'
  } else {
    return '#fff'
  }; 
};

function setButtonBackgroundDarker() {
  let colorScheme = useColorScheme();

  if (colorScheme === 'dark') {
    return '#606368'
  } else {
    return '#C0C0C0'
  };
};

export default function MainScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const screen_height = Dimensions.get('window').height;
  const [MalaphorText, setMalaphorText] = useState(NewMalaphor());


  function UpdateMalaphor() {
    setMalaphorText(NewMalaphor())
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(MalaphorText);
    Alert.alert('Copied to Clipboard:', MalaphorText);
  };
  return (
    <View style={styles.background}>
      <View style={styles.container}>

      <View style={styles.bottom_section}>
          <Pressable onPress={copyToClipboard}>
            <Text style={styles.malaphor_text}>{MalaphorText}</Text>
          </Pressable>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={styles.top_section}>
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

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    margin: "10%"
  },
  button_text: {
    fontSize: 30,
    lineHeight: 36,
    fontFamily: 'ibarra-reg',
  },
  separator: {
    alignSelf:'center',
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  top_section: {
    height: '30%',
    justifyContent: 'center',
  },
  bottom_section: {
    flexGrow: 1,
    alignSelf:'center',
    justifyContent: 'center',
    marginBottom: '25%',
  },
  malaphor_text: {
    fontSize: 34,
    fontFamily: 'ibarra-bold',
    textAlign: 'center',
  },
});
