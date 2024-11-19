  const puppeteer = require('puppeteer');

  async function getExchangeRateTaptap() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
      await page.goto('https://www.taptapsend.com/', { waitUntil: 'networkidle0', timeout: 120000 });
      await page.waitForSelector('#fxRateText', { timeout: 120000 });
      const exchangeRate = await page.$eval('#fxRateText', (el) => el.innerText);
      return exchangeRate ? `Taux de change Taptap : ${exchangeRate}` : 'Taux Taptap non trouvé';
    } catch (error) {
      return `Erreur Taptap : ${error.message}`;
    } finally {
      await browser.close();
    }
  }
  
  async function getExchangeRateGratis() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
      await page.goto('https://transfergratis.com/', { waitUntil: 'networkidle0', timeout: 120000 });
      await page.waitForSelector('.form_row p', { timeout: 120000 });
      const exchangeRate = await page.$eval('.form_row p', (el) => el.innerText);
      return exchangeRate ? `Taux de change Gratis : ${exchangeRate}` : 'Taux Gratis non trouvé';
    } catch (error) {
      return `Erreur Gratis : ${error.message}`;
    } finally {
      await browser.close();
    }
  }
  
  async function getExchangeRateGandyam() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
      await page.goto('https://gandyampay.com/', { waitUntil: 'networkidle0', timeout: 120000 });
      await page.waitForSelector('div[style*="justify-content: space-between;"]', { timeout: 120000 });
      const exchangeRate = await page.$eval('div[style*="justify-content: space-between;"]', (el) => el.innerText);
      const exchangeRates = exchangeRate.replace(/\s+/g, ' ').trim();
      return exchangeRates ? `Taux de change Gandyam : ${exchangeRates}` : 'Taux Gandyam non trouvé';
    } catch (error) {
      return `Erreur Gandyam : ${error.message}`;
    } finally {
      await browser.close();
    }
  }
  
  async function getAllExchangeRates() {
    const results = [];

  
  const taptapRate = await getExchangeRateTaptap();
  results.push({ site: "Taptap Send", rate: taptapRate });

 
  const gratisRate = await getExchangeRateGratis();
  results.push({ site: "Transfer Gratis", rate: gratisRate });


  const gandyamRate = await getExchangeRateGandyam();
  results.push({ site: "Gandyam Pay", rate: gandyamRate });

  return results;
  }
  
  module.exports = getAllExchangeRates;



