let xs = 480
let sm = 768
let md = 992
let lg = 1200

export function getCoordinates(params) {
  const {
    width,
    height,
    itemToExpand,
    scrollTop,
    gridConfig: {
      padding,
      items,
      dimensions: {
        rows,
        cols,
      },
    },
  } = params

  const cardWidth = (width - padding * (cols + 1)) / cols
  let cardHeight = (height - padding * (rows + 1)) / rows
  const expandedItem = findItemByKey(itemToExpand, items)

  const newItems = items.map((item, i) => {
    let w
    let h
    let x
    let y

    if (item.minHeight && cardHeight < item.minHeight) {
      cardHeight = item.minHeight
    } else if (item.maxHeight && cardHeight > item.maxHeight) {
      cardHeight = item.maxHeight
    }

    if (itemToExpand === item.data.id) {
      w = width
      h = height
      x = 0
      y = scrollTop
    } else if (expandedItem) {
      w = cardWidth * item.growX + padding * (item.growX - 1)
      h = cardHeight * item.growY + padding * (item.growY - 1)

      if (item.row < expandedItem.row) {
        x = cardWidth * (item.col - 1) + padding * item.col
        y = -cardHeight * (expandedItem.row - item.row) -
          padding * (expandedItem.row - item.row) + scrollTop
      } else if (item.row === expandedItem.row) {
        if (item.col < expandedItem.col) {
          x = -cardWidth * (expandedItem.col - item.col) -
            padding * (expandedItem.col - item.col)
          y = scrollTop + padding
        } else {
          x = cardWidth * (item.col - 1) + padding * (item.col + 1) +
            (cardWidth + padding) * (cols - expandedItem.col)
          y = scrollTop + padding
        }
      } else {
        x = cardWidth * (item.col - 1) + padding * item.col
        y = height + cardHeight * (item.row - expandedItem.row - 1) +
          padding * (item.row - expandedItem.row) + scrollTop
      }
    } else {
      w = cardWidth * item.growX + padding * (item.growX - 1)
      h = cardHeight * item.growY + padding * (item.growY - 1)
      x = cardWidth * (item.col - 1) + padding * item.col
      y = cardHeight * (item.row - 1) + padding * item.row
    }
    return {
      data: item.data,
      row: item.row,
      col: item.col,
      hidden: itemToExpand && itemToExpand !== item.data.id,
      key: item.data.id,
      width: w,
      height: h,
      x,
      y,
    }
  })

  return newItems
}

export function getGridConfig(config, width) {
  if (width <= xs) {
    return config.xs
  } else if (width <= sm) {
    return config.sm
  } else if (width <= md) {
    return config.md
  }
  return config.lg
}

export function findItemByKey(key, items) {
  let result

  for (let i = 0; i < items.length; i++) {
    if (items[i].key === key) {
      result = items[i]
      break
    }
  }

  return result
}

export function getGridHeight(items, padding) {
  if (!items || !items.length) {
    return 0
  }

  const lastItem = items[items.length - 1]
  return lastItem.y + lastItem.height + padding
}
