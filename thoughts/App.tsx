import React from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import Constants from 'expo-constants'
import PostThought from './components/PostThought'
import ThoughtList from './components/ThoughtList'
import colors from './assets/colors'

export default function App() {
  return (
    <View style={styles.appContainer}>
      <ScrollView style={styles.appScrollView}>
        <PostThought />
        <ThoughtList />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.dark,
    paddingTop: Constants.statusBarHeight,
    paddingRight: 15,
    paddingLeft: 15
  },
  appScrollView: {
    flex: 1
  }
})