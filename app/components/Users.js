import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Grid, cardsLayout } from '../grid'

function generateFakeData() {
  const items = []

  for (let i = 0; i < 20; i++) {
    items.push({
      id: String(i + 1),
    })
  }

  return items
}

function renderItem(item, { width, height }) {
  return (
    <View
      style={{
        ...styles.item,
        width,
      }}>
      <View style={styles.avatar}>
        <Text style={styles.text}>{item.id}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ ...styles.name }} />
        <View style={{ ...styles.email }} />
      </View>
    </View>
  )
}

function renderExpandedItem(item, viewSize) {
  return (
    <View
      style={{
        width: viewSize.width,
        height: viewSize.height,
      }}>
      {renderItem(item, viewSize)}
      <View
        style={{
          height: viewSize.height - 70,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#eee',
        }}>
        <Text style={{ fontSize: 24, color: '#333' }}>{item.id}</Text>
      </View>
    </View>
  )
}

export default class Users extends Component {
  // onLayout() {
  //   this.forceUpdate()
  // }

  render() {
    const viewSize = Dimensions.get('window')
    const items = generateFakeData()
    const gridConf = cardsLayout({
      items,
      renderItem,
      renderExpandedItem,
      options: {
        padding: 8,
        minHeight: 70,
        maxHeight: 70,
      },
    })

    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 80, backgroundColor: 'white' }} />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Grid
            config={gridConf}
            viewSize={{
              ...viewSize,
              height: viewSize.height - 60
            }} />
        </View>
      </View>
    )
  }
}

const styles = {
  item: {
    justifyContent: 'center',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 2,
    backgroundColor: '#f2f2f2',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
  },

  avatar: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 40,
  },

  name: {
    height: 5,
    backgroundColor: '#333',
    // backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 10,
    borderRadius: 2,
  },

  email: {
    height: 5,
    backgroundColor: '#333',
    // backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
  },

  text: {
    fontSize: 18,
    color: 'tomato',
  },
}
