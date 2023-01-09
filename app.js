const puppeteer = require("puppeteer");

let pages = [];
async function getData(search) {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  const URL = `https://www.youtube.com/results?search_query=${search}`;

  await page.setDefaultNavigationTimeout(60000);
  await page.goto(URL);
  await page.waitForSelector("#contents > ytd-video-renderer");
  pages = await page.$$eval("#contents > ytd-video-renderer", (nodes) =>
    nodes.map((el) => {
      return {
        title: el.querySelector("a#video-title").textContent.trim(),
        link: el.querySelector("a#video-title").href,
        views: el
          .querySelector("#metadata-line > span:nth-child(3)")
          .textContent.trim(),
        channel: el.querySelector("#text > a").textContent.trim(),
        posted: el
          .querySelector("#metadata-line > span:nth-child(4)")
          .textContent.trim(),
        description: el.querySelector(
          ".metadata-snippet-container > yt-formatted-string"
        )
          ? el
              .querySelector(
                ".metadata-snippet-container > yt-formatted-string"
              )
              ?.textContent.trim()
          : "No Description was given...",
      };
    })
  );

  console.log(pages);
}
