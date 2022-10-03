const puppeteer = require('puppeteer');

async function scrapeProduct(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const getProducts = await page.evaluate(() => {

    const productContainers= document.querySelectorAll('.wrapper');

    let productsArr = [];
    productContainers.forEach(element => {
      var productSrc = element.querySelector('.item-image img');
      if (productSrc == null || productSrc == '') {
        console.log('Empty pic found');
      }
      else{
        productSrc = productSrc.getAttribute('src');
        productSrc = 'https://www.spar.co.za' + productSrc;

        productsArr.push({
          src: productSrc 
        })
      }
    });

    return productsArr;
  })

  await browser.close();
  return getProducts;
}

module.exports = {
  scrapeProduct
}
