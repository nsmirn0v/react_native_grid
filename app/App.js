import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Users from './components/Users'

export default class App extends Component {
  render() {
    return (
      <Users />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 16,
    color: '#333'
  }
})
