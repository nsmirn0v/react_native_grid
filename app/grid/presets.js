export function cardsLayout({ items, renderItem, renderExpandedItem, options = {} }) {
  return {
    xs: {
      dimensions: { rows: items.length, cols: 1 },
      items: generateCardConfig(1, items, options),
      padding: options.padding || 0,
      renderItem,
      renderExpandedItem,
    },
    sm: {
      dimensions: { rows: Math.ceil(items.length / 2), cols: 2 },
      items: generateCardConfig(2, items, options),
      padding: options.padding || 0,
      renderItem,
      renderExpandedItem,
    },
    md: {
      dimensions: { rows: Math.ceil(items.length / 3), cols: 3 },
      items: generateCardConfig(3, items, options),
      padding: options.padding || 0,
      renderItem,
      renderExpandedItem,
    },
    lg: {
      dimensions: { rows: Math.ceil(items.length / 3), cols: 3 },
      items: generateCardConfig(3, items, options),
      padding: options.padding || 0,
      renderItem,
      renderExpandedItem,
    },
  }
}

function generateCardConfig(cols, items, options) {
  const rows = Math.ceil(items.length / cols)
  const result = []

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (items[((i - 1) * cols) + (j - 1)]) {
        result.push({
          key: items[(i - 1) * cols + (j - 1)].id,
          row: i,
          col: j,
          growX: 1,
          growY: 1,
          data: items[(i - 1) * cols + (j - 1)],
          ...options,
        })
      }
    }
  }

  return result
}
