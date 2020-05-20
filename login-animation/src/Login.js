import React, { Component } from 'react'
import { Text, Image, StyleSheet, View, Dimensions, KeyboardAvoidingView } from 'react-native'

import Animated, { Easing } from 'react-native-reanimated'
import { TapGestureHandler, State, TextInput } from 'react-native-gesture-handler'

const { height, width } = Dimensions.get("window")
const { 
  event, 
  Clock,
  Value, 
  block, 
  eq, 
  cond, 
  set, 
  timing, 
  clockRunning, 
  startClock, 
  stopClock, 
  debug,
  interpolate, 
  Extrapolate } =  Animated

const runTiming = (clock, value, dest) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 800,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

export default class Login extends Component {

  constructor(props) {
    super(props)
    
    this.buttonOpacity = new Value(1)

    this.onHandlerStateChange = event([
      {
        nativeEvent: ({ state }) => block([ 
          cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0))) 
        ])
      }
    ])

    this.buttonsTranslateY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [height / 3, 0],
      extrapolate: Extrapolate.CLAMP
    })

    this.backgroundTranslateY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP
    })

    this.formOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    })

    this.formZIndex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    })

    this.formTranslateY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 6, 0],
      extrapolate: Extrapolate.CLAMP
    })
  }
  

  render() {
    return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Animated.View style={{...styles.imageContainer, transform: [{translateY: this.backgroundTranslateY}] }}>
          <Image 
            source={require("./../assets/background.jpg")} 
            style={styles.image}
            />
        </Animated.View>
        <View style={{...styles.buttonsContainer}}>
          <TapGestureHandler onHandlerStateChange={this.onHandlerStateChange}>
            <Animated.View style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{translateY: this.buttonsTranslateY}] }}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View style={{ ...styles.button, ...styles.facebookButton, opacity: this.buttonOpacity, transform: [{translateY: this.buttonsTranslateY}] }}>
            <Text style={{...styles.buttonText, ...styles.facebookButtonText}}>Sign In With Facebook</Text>
          </Animated.View>
        </View>

        <Animated.View style={{...styles.formContainer, opacity: this.formOpacity, zIndex: this.formZIndex, transform: [{translateY: this.formTranslateY}]}}>
          <TextInput placeholder="EMAIL" style={styles.formInput} />
          <TextInput placeholder="PASSWORD" style={styles.formInput} />
          <View style={styles.formButton}>
            <Text style={styles.buttonText}>Sing In</Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafbfc"
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  image: {
    flex: 1,
    height: null, 
    width: null
  },
  buttonsContainer: {
    height: height / 3,
    width,
    marginTop: "auto",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fafbfc",
    paddingVertical: 15,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 15
  },
  buttonText: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 14.5,
    color: "#212121"
  },
  facebookButton: {
    backgroundColor: "#2E31fC"
  },
  facebookButtonText: {
    color: "#fafbfc"
  },
  formContainer: {
    position: "absolute",
    bottom: -height / 6,
    height: height / 3,
    width: "100%",
    backgroundColor: "#fff",
    zIndex: -1,
    opacity: 0,
    alignItems: "center",
    paddingTop: 15,
  },
  formInput: {
    width: "80%",
    height: 40,
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#363636",
    paddingHorizontal: 15
  },
  formButton: {
    width: "80%",
    height: 45,
    marginTop: 10,
    borderRadius: 25,
    borderWidth: 0.5,
    paddingHorizontal: 15,
    shadowColor: "#363636",
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.2,
    justifyContent: "center",
    alignItems: "center"
  }
})