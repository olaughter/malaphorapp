import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        A Malaphor is a mix up of multiple idioms or phrases.
        The Malaphor Maker is trained on a list of over 2,000
        english phrases, and generates original Malaphors on
        every press. Some of the sample phrases were not all
        that great in the first place — so maybe try and
        take them with a grain of sand!
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  description: {
    width: '80%',
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'ibarra-reg',
  },
});
