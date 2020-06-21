import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'

import Remove from './svgs/Remove'

interface IProps {
  images: string[]
  removeImage: (index: number) => void
}

export default class PickedImages extends Component<IProps> {
  render() {
    const { images, removeImage } = this.props
    return (
      <ScrollView horizontal style={styles.images}>
        {
          images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(index)}>
                <Remove height={20} width={20} />
              </TouchableOpacity>
            </View>
          ))
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  images: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  imageContainer: {
    position: 'relative',
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden'
  },
  image: {
    width: 80, 
    height: 80,
    zIndex: 1
  },
  removeBtn: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 2
  }
})
