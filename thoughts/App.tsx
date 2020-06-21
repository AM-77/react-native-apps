import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants'
import { initThoughts, readThoughts, writeThoughts } from './firebase'
import IThought from './interfaces/Thought.interface'
import PostThought from './components/PostThought'
import ThoughtsList from './components/ThoughtsList'
import colors from './assets/colors'

interface IState {
  thoughts: IThought[]
  isLoading: boolean
}

export default class App extends Component <unknown, IState> {

  constructor (props: unknown) {
    super(props)
    this.state = {
      thoughts: [],
      isLoading: true
    }
    
    initThoughts()
  }

  componentDidMount () { this.readThoughts() }

  writeThoughts = (thought: IThought) => {
    this.setState({ isLoading: true })
    writeThoughts(thought, this.readThoughts)
  }

  readThoughts = () => {
    readThoughts().then(snapshot => {
      const snapshotVal = snapshot.val()
      const thoughts = []
      for (var key in snapshotVal) {
        thoughts.unshift({
          id: key,
          ...snapshotVal[key]
        })
      }
      this.setState({thoughts, isLoading: false})
    }).catch(error => { 
      console.error("Error while loading data from firebase: ", error)
    })
  }

  render() {
    const { thoughts, isLoading } = this.state
    return (
      <View style={styles.appContainer}>
        <ScrollView style={styles.appScrollView}>
          <PostThought writeThought={this.writeThoughts} />
          { isLoading 
            ?
            <View style={styles.isLoading}>
              <ActivityIndicator color={colors.main} size={"large"} />
            </View>
            :
            <ThoughtsList thoughts={thoughts} />
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.dark,
    paddingTop: Constants.statusBarHeight
  },
  appScrollView: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15
  },
  isLoading: {
    flex: 1,
    justifyContent: "center",
    marginTop: 50
  }
})