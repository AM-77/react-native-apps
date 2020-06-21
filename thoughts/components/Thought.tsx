import React, { Component } from 'react'
import IThought from '../interfaces/Thought.interface'
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native'
import colors from '../assets/colors.ts';

interface IProps {
  thought: IThought
}
const arabicUnicodeRange = /[\u0600-\u06FF]/

export default class Thought extends Component<IProps> {
  
  isArabic = (content: string): {} => (arabicUnicodeRange.test(content)) ? { textAlign: "right" } : {}
  
  render() {
    const { id, time, content, images = [] } = this.props.thought
    
    return (
      <View style={styles.thought}>
        <View style={styles.head}>
          <Text style={styles.id}>ID: { id && id.slice(1, 8) }</Text>
          <Text style={styles.time}>{ time }</Text>
        </View>
        {
          content !== "" && <View style={styles.contentContainer}>
            <Text style={{ ...styles.content, ...this.isArabic(content)}}>{ content }</Text>
          </View>
        }
        { images.length > 0 && (<ScrollView horizontal style={styles.images}>{ images.map((image, index) => (<View key={index} style={styles.image}><Image style={{ width: '100%', height: '100%', borderRadius: 5 }} source={{ uri: image }} /></View>)) }</ScrollView>) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  thought: {
    marginBottom: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    position: 'relative'
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    top: -10,
  },
  id: {
    color: colors.main,
    fontSize: 11,
    fontWeight: '700',
    marginRight: 'auto',
    backgroundColor: colors.dark,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    textTransform: 'uppercase',
    textDecorationLine: 'underline'
  },
  time: {
    color: colors.main,
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: colors.dark,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 10,
    textDecorationLine: 'underline'
  },
  contentContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  content: {
    color: colors.light,
    lineHeight: 20
  },
  images: {
    height: 90,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5
  },
  image: {
    height: 80,
    width: 80,
    margin: 5
  }
})