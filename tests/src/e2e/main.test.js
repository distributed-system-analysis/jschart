const puppeteer = require('puppeteer')

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  }
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

let browser
let page
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })
  page.setViewport({ width: 500, height: 2400 })

})

describe('on page load', () => {
  test('h1 loads correctly', async () => {

    const html = await page.$eval('.App-title', e =>
      e.innerHTML)

    expect(html).toBe('JSChart Demos')

  }, 16000)

  test('dataset selection', async () => {
    await page.waitForSelector('div > h3 > select');
    const availDataset = ['Null', 'Dataset 1', 'Dataset 2']
    let datasetNo = await page.$eval('div > h3 > select', node => node.innerText);
    datasetNo = datasetNo.split('\n')
    expect(datasetNo).toEqual(availDataset);
  });
  test(
    'should show SVGs', async () => {
      const divisions = ['jschart_dynamic', 'jschart_json', 'jschart_histogram', 'jschart_timeseries',
        'jschart_xy', 'jschart_jitter', 'jschart_jitter_scatter'];

      for (let divLocation of divisions) {
        await page.waitForSelector(`#${divLocation} > table `, { visible: true });
        await page.waitForSelector(`#${divLocation} > table > tr > td > svg  `, { visible: true });
      }
    },
    30000
  );
  test('should download CSV on click', async () => {
    await page.waitForSelector('text[id="csvdown"]', { visible: true });
    await page.click('text[id="csvdown"]');
  })
  test('should download PNG on click', async () => {
    await page.$$eval('.savePNG', elem => {
      if (elem.innerText === 'Save as PNG') {
        return elem.click();
      }
      return elem;
    });
  })
  test('should show graph', async () => {
    await page.$$eval('.showGraph', elem => {
      if (elem.innerText === 'Show') {
        return elem.click();
      }
      return elem;
    });
  })
  test('should hide graph', async () => {
    await page.$$eval('.hideGraph', elem => {
      if (elem.innerText === 'Hide') {
        return elem.click();
      }
      return elem;
    });
  })
  test('should reset Zoom/Pan of graph', async () => {
    await page.$$eval('.reset', elem => {
      if (elem.innerText === 'Reset Zoom/Pan') {
        return elem.click();
      }
      return elem;
    });
  })
})
afterAll(() => {
  if (isDebugging()) {
    browser.close()
  }
})