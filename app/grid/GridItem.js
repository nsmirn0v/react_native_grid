import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, Animated, Easing } from 'react-native'

let Touchable = TouchableWithoutFeedback

let prevX = 0
let prevY = 0

export default class GridItem extends Component {
  constructor(props) {
    super(props)
    this.animWidth = new Animated.Value(props.data.width)
    this.animHeight = new Animated.Value(props.data.height)
    this.position = new Animated.ValueXY({ x: props.data.x, y: props.data.y })
    this.scale = new Animated.Value(1)
    this.onPressIn = this.onPressIn.bind(this)
    this.onPressOut = this.onPressOut.bind(this)
  }

  componentDidUpdate() {
    Animated.parallel([
      Animated.spring(this.animWidth, {
        toValue: this.props.data.width,
      }),
      Animated.spring(this.animHeight, {
        toValue: this.props.data.height,
      }),
      Animated.spring(this.scale, {
        toValue: 1,
      }),
      Animated.spring(this.position, {
        toValue: {
          x: this.props.data.x,
          y: this.props.data.y,
        },
      }),
    ]).start()
  }

  onPressIn() {
    this.animate(0.99, this.scale)
  }

  onPressOut() {
    this.animate(1, this.scale)
  }

  animate(toValue, value) {
    Animated.parallel([
      Animated.spring(value, {
        toValue,
      }),
      Animated.spring(this.position, {
        toValue: {
          x: this.props.data.x,
          y: this.props.data.y,
        },
      }),
      Animated.spring(this.animWidth, {
        toValue: this.props.data.width,
      }),
      Animated.spring(this.animHeight, {
        toValue: this.props.data.height,
      }),
    ]).start()
  }

  render() {
    const {
      data: {
        key,
        width,
        height,
        data,
      },
      expanded,
      renderItem,
      renderExpandedItem,
      toggleItem,
    } = this.props

    const { scale, anim, position } = this

    const content = expanded ?
      renderExpandedItem(data, { width, height }) :
      renderItem(data, { width, height })

    return (
      <Touchable
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={() => toggleItem(expanded ? null : key)}>
        <Animated.View
          style={{
            position: 'absolute',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            width: this.animWidth,
            height: this.animHeight,
            transform: [
              ...position.getTranslateTransform(),
              { scale },
            ]
          }}>
          {content}
        </Animated.View>
      </Touchable>
    )
  }
}

let styles = {
  container: {
    // flex: 1,
  },

  innerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },

  box: {
    position: 'absolute',
  },

  closeBtn: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // top: 20,
    // right: 20,
    borderRadius: 0,
  },
}
