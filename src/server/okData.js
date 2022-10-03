const puppeteer = require('puppeteer');

async function scrapeProduct(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const getProducts = await page.evaluate(() => {

    const productContainers= document.querySelectorAll('.card');

    let productsArr = [];
    productContainers.forEach(element => {

        var dealLoc = element.querySelector('.selectedProvince'); //Find deal location
        if (dealLoc == null) {
            dealLoc = 'Province'
        }

        var dealValid = element.querySelector('.offerValidDate'); //Find deal time validation
        if (dealValid == null) {
            dealValid = 'Time'
        }

        var dealLink = element.querySelector('.viewButton'); //Find deal link
        if (dealLink == null) {
            dealLink = 'Link'
        }
        else{
            dealLink = dealLink.getAttribute('onclick');
        }

        var dealSrc = element.querySelector('.leaflet-image img'); //Find image
        if (dealSrc == null) {
            dealSrc = ''
        }
        else{
            dealSrc = dealSrc.getAttribute('src');
        }

        productsArr.push({
            location: dealLoc.innerHTML,
            timeValid: dealValid.innerHTML,
            link: dealLink,
            src: dealSrc
              
          })
    });

    return productsArr;
  })

  await browser.close();
  return getProducts;
}

module.exports = {
  scrapeProduct
}