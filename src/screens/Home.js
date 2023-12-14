import React, { useEffect, useRef } from "react";
import { View, Text, ImageBackground, StyleSheet, Animated, Easing } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Home() {
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;

  
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const dancingStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: [0, 50, 0, -20, 0], // Adjusted for increased bounce
        }),
      },
    //   {
    //     translateX: animatedValue.interpolate({
    //       inputRange: [0, 0.25, 0.5, 0.75, 1],
    //       outputRange: [0, 20, 0, -10, 0], // Adjusted for increased bounce
    //     }),
    //   },
    ],
  };
  

  const staggeredTextStyle = (text) => {
    return text.split('').map((letter, index) => (
      <Animated.Text key={index} style={[styles.staggeredText, dancingStyle]}>
        {letter}
      </Animated.Text>
    ));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", flexDirection: 'column', alignItems: 'center', backgroundColor: "white" }}>
      <ImageBackground style={styles.container} source={require('../../assets/Sherman1.jpg')} resizeMode="cover">
        <View style={styles.staggeredTextContainer}>
          {staggeredTextStyle("Say hi! To Camera")}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('TakePicture')}
            style={{ width: 200, marginTop: 5, backgroundColor: '#8B4513' }}
            contentStyle={{ flexDirection: 'row-reverse', alignItems: 'center' }}
          >
            <MaterialCommunityIcons name="camera" size={18} color="white" />
            <Text style={{ marginLeft: 5 }}>Open Camera</Text>
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('ViewPicture')}
            style={{ width: 200, marginTop: 5, backgroundColor: '#8B4513',justifyContent:"space-between" }}
          ><MaterialCommunityIcons name="image" size={18} color="white" />
            <Text style={{ marginLeft: 5 }}>Open Gallery</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    marginBottom: "-50"
  },
  staggeredTextContainer: {
    flexDirection: 'row',
  },
  staggeredText: {
    marginBottom: 50,
    fontWeight: '800',
    fontSize: 25,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
});

export default Home;
