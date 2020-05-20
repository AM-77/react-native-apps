import React, { Component } from 'react'
import { Text, Image, StyleSheet, View, Dimensions } from 'react-native'

import Animated, { Easing } from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'

const { height, width } = Dimensions.get("window")
const { event, Value, block, eq, cond, set, timing, interpolate, Extrapolate } =  Animated
export default class Login extends Component {

  constructor(props) {
    super(props)
    
    this.buttonOpacity = new Value(1)
    
    this.onHandlerStateChange = event([
      {
        nativeEvent: ({ state }) => block([
          cond(eq(state, State.END), set(this.buttonOpacity, 0))
        ])
      }
    ])
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{...styles.imageContainer}}>
          <Image 
            source={require("./../assets/background.jpg")} 
            style={styles.image}
            />
        </Animated.View>
        <Animated.View style={{...styles.buttonsContainer, opacity: this.buttonOpacity, transform: [{ translateY: 0}]}}>
          <TapGestureHandler onHandlerStateChange={this.onHandlerStateChange}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TapGestureHandler>
          <View style={{...styles.button, ...styles.facebookButton}}>
            <Text style={{...styles.buttonText, ...styles.facebookButtonText}}>Sign In With Facebook</Text>
          </View>
        </Animated.View>
      </View> 
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
  }
})
