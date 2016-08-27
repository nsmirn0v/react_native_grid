import React, { Component } from 'react'
import { AppRegistry, StyleSheet } from 'react-native'
import App from './app/App.js'
class sampleApp extends Component {
  render() {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent('sampleApp', () => sampleApp)
