import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Thought from './Thought'
import IThought from '../interfaces/Thought.interface'

interface IProps {
  thoughts: IThought[]
}

export default class ThoughtsList extends Component<IProps> {
  render() {
    const { thoughts } = this.props
    return (
      <View style={styles.thoughtsList}>
        { thoughts.map(thought => <Thought key={thought.id} thought={thought} />) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  thoughtsList: {
    marginTop: 15,
    marginBottom: 15
  }
})