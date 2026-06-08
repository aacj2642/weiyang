const fs = require('fs');
const path = require('path');

const memberStorePath = path.join(__dirname, 'stores/memberStore.js');
const newsStorePath = path.join(__dirname, 'stores/newsStore.js');
const sitemapPath = path.join(__dirname, 'public/sitemap.xml');

const memberFileContent = fs.readFileSync(memberStorePath, 'utf8');
const newsFileContent = fs.readFileSync(newsStorePath, 'utf8');

// Match id: "number" or id: 'number'
const idRegex = /id:\s*['"](\d+)['"]/g;

const memberIds = [];
let match;
while ((match = idRegex.exec(memberFileContent)) !== null) {
  const id = match[1];
  if (!memberIds.includes(id)) {
    memberIds.push(id);
  }
}

const newsIds = [];
let matchNews;
const newsIdRegex = /id:\s*['"](\d+)['"]/g;
while ((matchNews = newsIdRegex.exec(newsFileContent)) !== null) {
  const id = matchNews[1];
  if (!newsIds.includes(id)) {
    newsIds.push(id);
  }
}

// Sort IDs for consistent output ordering
memberIds.sort((a, b) => parseInt(a) - parseInt(b));
newsIds.sort((a, b) => parseInt(a) - parseInt(b));

console.log(`[Sitemap] Found ${memberIds.length} member IDs:`, memberIds);
console.log(`[Sitemap] Found ${newsIds.length} news IDs:`, newsIds);

const baseUrl = 'https://aacj2642.github.io/weiyang';
const today = new Date().toISOString().split('T')[0];

const staticPaths = [
  '/',
  '/about/',
  '/member/',
  '/calendar/',
  '/performance/',
  '/sponsored-performances/',
  '/all-news/',
  '/performance-news/',
  '/seminar-news/'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Add static pages
staticPaths.forEach(p => {
  const priority = p === '/' ? '1.0' : '0.8';
  xml += `
  <url>
    <loc>${baseUrl}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

// Add dynamic members
memberIds.forEach(id => {
  xml += `
  <url>
    <loc>${baseUrl}/member/${id}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

// Add dynamic news
newsIds.forEach(id => {
  xml += `
  <url>
    <loc>${baseUrl}/news/${id}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

xml += '\n</urlset>';

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`[Sitemap] Generated sitemap at public/sitemap.xml successfully.`);
