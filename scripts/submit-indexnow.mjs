// Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Naver).
// Run manually after publishing new content: `npm run indexnow`
// Key file must stay in sync with public/<key>.txt.

const HOST = "klarq.eu";
const KEY = "1825d2e77e4c53d01b6b1bc9bc045b93";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  const sitemapRes = await fetch(`https://${HOST}/sitemap.xml`);
  const xml = await sitemapRes.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urlList.length === 0) {
    console.error("No URLs found in sitemap — aborting.");
    process.exit(1);
  }

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  console.log(`IndexNow responded: ${res.status} ${res.statusText}`);
  if (!res.ok) {
    const text = await res.text();
    console.error(text);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
