import fs from "fs"
import faker from "faker"

function createDummyData()
{
  let counter = 0;
  let products = ""

  while (counter <= 3000)
  {
    let product = `
    {
      name: "${faker.commerce.productName()} - ${counter}",
      sku: "test-${counter}",
      brand: "${faker.company.companyName()}",
      tags: ["${faker.lorem.word()}", "${faker.lorem.word()}", "${faker.company.companyName()}", "default"],
      description: "${faker.commerce.productDescription()}",
      variants: [
        {
          ref: ${counter %2 === 0 ? "\"first\"" : "\"unique\""},
          sellPrice: ${faker.commerce.price()},
          countInStock: ${Math.floor(Math.random() * 100) + 1},
          sold: ${Math.floor(Math.random() * 1000)}
        }
        ${
          counter%2 === 0 ?
          `
          ,
          {
            ref: "second",
            sellPrice: ${faker.commerce.price()},
            countInStock: ${Math.floor(Math.random() * 100) + 1},
            sold: ${Math.floor(Math.random() * 1000)}
          }
          ` : ""
        }
      ],
      store: "",
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

  fs.writeFile("../data/productsData.js", content, function (err){
    if (err) return console.log(err);
    console.log("Data escrita!")
  })
}

createDummyData();
