import fs from 'fs'
import faker from 'faker'

function createDummyData()
{
  let counter = 0;
  let products = ''

  while (counter <= 1000)
  {
    let randomSold = Math.floor(Math.random() * 1000);
    let product = `
    {
      name: '${faker.commerce.productName()} ${counter}',
      brand: 'default',
      tags: ['batidoras', 'engranaje', 'b&d', 'mx45'],
      description: "${faker.commerce.productDescription()}",
      variants: [
        {
          ref: 'unique',
          unityPrice: 1.02,
          sellPrice: ${faker.commerce.price()},
          inStore: [
            {
              countInStock: 100,
              sold: ${randomSold},
            }
          ]
        }
      ]
    },
  `
    products += product
    counter += 1;
  }

  let content = `

    const products = [
      ${products}
    ]

    export default products

  `

  fs.writeFile('../data/productsData.js', content, function (err){
    if (err) return console.log(err);
    console.log('Data escrita!')
  })
}

createDummyData();
