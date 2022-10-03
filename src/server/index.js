const mysql=require("mysql")
const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const scrapers = require('./pnpData');
const scrapersWoolies = require('./wooliesData');
const scrapersSpar = require('./sparData');
const scrapersMakro = require('./macroData');
const scrapersSportsman = require('./sportsmanData');
const scrapersBuilders = require('./builders');

app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/products', async (req, res) => {
  var products = await scrapers.scrapeProductCardDeals("https://www.pnp.co.za/pnpstorefront/pnp/en/All-Products/c/pnpbase?pageSize=72&q=%3Arelevance%3AisOnPromotion%3AOn%2BPromotion&show=Page#")

  
  res.send(products);
})


app.get('/productsWoolies', async (req, res) => {
  var productsWoolies = await scrapersWoolies.scrapeProduct("https://www.woolworths.co.za/cat/Food/_/N-1z13sk5Zxtznwk?No=0&Nrpp=9")
  
  //for (let i = 9; i < 90; i+= 9){
    //var productsWoolies = productsWoolies.concat(await scrapersWoolies.scrapeProduct('https://www.woolworths.co.za/cat/Food/_/N-1z13sk5Zxtznwk?No=' + i + '&Nrpp=9'))
  //}

  res.send(productsWoolies);
})

app.get('/productsSpar', async (req, res) => {
  const productsSpar = await scrapersSpar.scrapeProduct("https://www.spar.co.za/Home")
  
  res.send(productsSpar);
})

app.get('/productsMakro', async (req, res) => {
  const productsMakro = await scrapersMakro.scrapeProduct("https://www.makro.co.za/birthday")
  
  res.send(productsMakro);
})

app.get('/productsSportsman', async (req, res) => {
  const productsSportsman = await scrapersSportsman.scrapeProduct("https://www.sportsmanswarehouse.co.za/deals/listings/?sortBy=was_price&sortOrder=desc")
  
  res.send(productsSportsman);
})

app.get('/productsBuilders', async (req, res) => {
  const productsBuilders = await scrapersBuilders.scrapeProduct("https://www.builders.co.za/Deals/Shop-All-Appliances-Deals/c/Shop%20All%20Appliances%20Deals")
  
  res.send(productsBuilders);
})


app.listen(port, () => console.log(`Deal Finder SA listening on port ${port}!`))


