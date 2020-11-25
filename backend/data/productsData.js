

// NOTE: Requires at least 1 Store created
// NOTE: Requires at least 1 Category created
const products = [
  {
    name: 'ENGRANAJE BATIDORA B&D MX45',
    brand: 'B&D',
    tags: ['batidoras', 'engranaje', 'b&d', 'mx45'],
    description: '',
    // store: [],
    // categories: [],
    prices: [
      {
        ref: 'unique',
        unityPrice: 1.02,
        sellPrice: 1.73,
        countInStock: 100
      }
    ]
  },
  {
    name: 'ENGRANAJE BATIDORA OSTER 2171',
    brand: 'OSTER',
    tags: ['batidoras', 'engranaje', 'oster', '2171'],
    description: '',
    // store: [],
    // categories: [],
    prices: [
      {
        ref: 'unique',
        unityPrice: 1.02,
        sellPrice: 1.73,
        countInStock: 100
      }
    ]
  },
]

export default products
