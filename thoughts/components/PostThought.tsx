import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import PickedImages from './PickedImages'
import Send from './svgs/Send'
import Upload from './svgs/Upload'

type PickedImage = { uri: string,  base64: string }
interface IState {
  thought: string
  time: string
  images: PickedImage[]
}

export default class PostThought extends Component<unknown, IState> {

  constructor(props: unknown) {
    super(props)
    this.state = { 
      thought: "",
      time: this.now(),
      images: []
    }
  }

  getPermissions = async () => {
    if (Constants.platform && Constants.platform.ios) {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
      if (status !== 'granted') { alert('Sorry, we need camera roll permissions to make this work!') }
    }
  }
  
  componentDidMount() {
    this.getPermissions()
    setInterval(() => { this.setState((state) => ({ time: this.now() })) }, 1000)
  }

  now = ():string => new Date().toUTCString()

  postThought = () => {

  }

  pickImage = async () => {  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      quality: 1,
    })

    if (!result.cancelled) this.setState((state) => ({ images: [...state.images, { uri: result.uri, base64: result.base64 }] }))
  }

  removeImage = (index: number) => {
    const { images } = this.state
    images.splice(index, 1)
    this.setState(({ images }))
  }

  render() {
    const { thought, time, images } = this.state
    return (
      <View style={styles.postThoughtContainer}>
        <Text style={styles.header}>Thoughts, quotes & stuff.</Text>
        <View style={styles.post}>
          <View style={styles.labels}>
            <Text style={styles.title}>Think: </Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <View style={styles.postContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  onChangeText={(thought) => this.setState({thought})}
                  value={thought}/>
              </View>
              <View style={styles.btns}>
                <TouchableOpacity style={styles.btn} onPress={this.pickImage}>
                  <Upload width={40} height={40} fill="#119955" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={this.postThought}>
                  <Send width={40} height={40} fill="#119955" />
                </TouchableOpacity>
              </View>
              <View style={styles.images}>
                <PickedImages images={images} removeImage={this.removeImage} />
              </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  postThoughtContainer: {
    
  },
  header: {

  },
  post: {

  },
  labels: {

  },
  title: {

  },
  time: {

  },
  postContainer: {

  },
  inputContainer: {

  },
  input: {
    fontSize: 13,
    lineHeight: 1.7,
    outline: 'none',
    height: 100
  },
  btns: {

  },
  btn: {

  },
  images: {

  }
})