import {
  getCoordinates,
  getGridConfig,
  getGridHeight,
  findItemByKey,
} from './helpers'
import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { TransitionMotion, spring, presets } from 'react-motion'
import GridItem from './GridItem'

// const SPRING_CONF = { stiffness: 300, damping: 35 }
const SPRING_CONF = presets.stiff

let gridConfig
let gridItems
let prevGridItems

export default class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemToExpand: null,
      scrollTop: 0,
    }

    gridItems = []
    prevGridItems = []

    this.getStyles = this.getStyles.bind(this)
    this.willEnter = this.willEnter.bind(this)
    this.willLeave = this.willLeave.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.toggleItem = this.toggleItem.bind(this)
    this.renderItems = this.renderItems.bind(this)
  }

  getStyles() {
    return gridItems
      .filter(item => !item.hidden && this.gridItemInView({
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
      }))
      .map(item => ({
        key: item.key,
        data: item.data,
        style: {
          x: spring(item.x, SPRING_CONF),
          y: spring(item.y, SPRING_CONF),
          width: spring(item.width, SPRING_CONF),
          height: spring(item.height, SPRING_CONF),
          opacity: spring(1, SPRING_CONF),
        },
      }))
  }

  willEnter({ key, style, data }) {
    const item = findItemByKey(
      key,
      prevGridItems.length ?
        prevGridItems : gridItems
    )

    if (!item) {
      return {}
    }

    return {
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.height,
      opacity: 0,
    }
  }

  willLeave({ key }) {
    const item = findItemByKey(key, gridItems)

    if (!item) {
      return {}
    }

    return {
      x: spring(item.x, SPRING_CONF),
      y: spring(item.y, SPRING_CONF),
      width: spring(item.width, SPRING_CONF),
      height: spring(item.height, SPRING_CONF),
      opacity: spring(1, SPRING_CONF),
    }
  }

  onScroll(event) {
    this.setState({
      scrollTop: event.nativeEvent.contentOffset.y
    })
  }

  toggleItem(itemToExpand) {
    prevGridItems = gridItems.slice()
    this.setState({itemToExpand})
  }

  gridItemInView(boundingRect) {
    const { padding } = gridConfig
    const { scrollTop } = this.state
    const { width, height, x, y } = boundingRect
    const viewSize = this.props.viewSize
    const offset = (padding + height) * 2

    const result = ((y >= scrollTop - offset || y + height >= scrollTop) &&
      y < scrollTop + viewSize.height + offset) && (x >= 0 && x < viewSize.width)

    return result
  }

  renderItems(animatedStyles) {
    const { width, height } = this.props.viewSize
    const { itemToExpand } = this.state

    return (
      <ScrollView
        scrollEnabled={!itemToExpand}
        style={styles.container}
        onScroll={this.onScroll}
        scrollEventThrottle={50}
        contentContainerStyle={{
          height: getGridHeight(gridItems, gridConfig.padding),
        }}>
        {animatedStyles.map(({ key, style, data }) => {
          return (
            <View
              key={key}
              style={{
                ...styles.card,
                opacity: style.opacity,
                width: style.width,
                height: style.height,
                transform: [
                  { translateX: style.x },
                  { translateY: style.y },
                ],
              }}>
              <GridItem
                data={data}
                boundingRect={style}
                viewSize={{ width, height }}
                toggleItem={this.toggleItem}
                expanded={key === itemToExpand}
                renderItem={gridConfig.renderItem}
                renderExpandedItem={gridConfig.renderExpandedItem} />
            </View>
          )
        })}
      </ScrollView>
    )
  }

  render() {
    const { width, height } = this.props.viewSize
    const { itemToExpand, scrollTop } = this.state
    const config = this.props.config

    gridConfig = getGridConfig(config, width)
    gridItems = getCoordinates({
      width,
      height,
      itemToExpand,
      scrollTop,
      gridConfig,
    })

    return (
      <ScrollView
        scrollEnabled={!itemToExpand}
        style={styles.container}
        onScroll={this.onScroll}
        scrollEventThrottle={50}
        contentContainerStyle={{
          height: getGridHeight(gridItems, gridConfig.padding),
        }}>
        {gridItems.map(item => (
          <GridItem
            key={item.key}
            data={item}
            toggleItem={this.toggleItem}
            expanded={item.key === itemToExpand}
            renderItem={gridConfig.renderItem}
            renderExpandedItem={gridConfig.renderExpandedItem} />
        ))}
      </ScrollView>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
    overflow: 'hidden',
  },

  card: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 2,
  },
}
