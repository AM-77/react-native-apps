import React, { Component } from 'react'
import { Image } from 'react-native'
import Login from './src/Login'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'

function cacheImages(images) { 
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  async loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./assets/background.jpg")
    ])

    await Promise.all([...imageAssets])
  }

  render() {
    const { isReady } = this.state
    if (!isReady) {
      return <AppLoading
        startAsync={this.loadAssetsAsync}
        onFinish={()=>this.setState({isReady: true})}
        onError={console.warn} />
    }
    
    return <Login />
  }
}