import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import colors from '../assets/colors'
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
    // TODO: posting logic
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
                  underlineColorAndroid="transparent"
                  placeholder="post your thoughts"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}/>
              </View>
              <View style={styles.btns}>
                <TouchableOpacity onPress={this.pickImage}>
                  <Upload width={27} height={27} fill={colors.main} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.postThought}>
                  <Send width={27} height={27} fill={colors.main} />
                </TouchableOpacity>
              </View>
          </View>
        </View>
        <View style={styles.images}>
          <PickedImages images={images} removeImage={this.removeImage} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  postThoughtContainer: {
    marginTop: 15
  },
  header: {
    color: colors.light,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 17
  },
  post: {
    borderColor: colors.gray,
    borderStyle: 'dotted',
    borderWidth: 2,
    marginTop: 30
  },
  labels: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: -12,
  },
  title: {
    paddingLeft: 7,
    paddingRight: 7,
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '700',
    color: colors.main,
    backgroundColor: colors.dark,
  },
  time: {
    paddingLeft: 7,
    paddingRight: 7,
    marginRight: 10,
    fontSize: 12,
    fontWeight: '700',
    color: colors.main,
    backgroundColor: colors.dark
  },
  postContainer: {
    position: 'relative'
  },
  inputContainer: {
    
  },
  input: {
    fontSize: 14,
    textAlignVertical: 'top',
    height: 100,
    padding: 10,
    color: colors.light
  },
  btns: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 76,
    height: 35,
    paddingLeft: 5,
    paddingTop: 5,
    borderWidth: 2,
    borderLeftColor: colors.gray,
    borderTopColor: colors.gray,
    borderRightColor: colors.dark,
    borderBottomColor: colors.dark,
    backgroundColor: colors.dark
  },
  images: {
    marginTop: 5
  }
})