const axios = require("axios");

const generateSitemap = async (req, res) => {
  try {
    const baseUrl = "https://maa-doyamoyee.com";

    // ⚡ Fast parallel fetch
    const [postsRes, eventsRes] = await Promise.all([
      axios.get("https://api.maa-doyamoyee.com/api/v1/posts"),
      axios.get("https://api.maa-doyamoyee.com/api/v1/events"),
    ]);

    // ✅ Safe data extraction
    const posts = postsRes.data?.data || postsRes.data || [];
    const events = eventsRes.data?.data || eventsRes.data?.events || [];

    // 🌐 Static pages (SEO optimized)
    const staticPages = [
      { url: "/", priority: "1.0", freq: "daily" },
      { url: "/history", priority: "0.8", freq: "monthly" },
      { url: "/events", priority: "0.9", freq: "weekly" },
      { url: "/gallery", priority: "0.8", freq: "weekly" },
      { url: "/videos", priority: "0.7", freq: "monthly" },
      { url: "/purohit", priority: "0.7", freq: "monthly" },
      { url: "/committee", priority: "0.7", freq: "monthly" },
      { url: "/members", priority: "0.7", freq: "monthly" },
      { url: "/advisors", priority: "0.7", freq: "monthly" },
      { url: "/blogs", priority: "0.9", freq: "weekly" },
      { url: "/notices", priority: "0.8", freq: "weekly" },
      { url: "/contact", priority: "0.6", freq: "yearly" },
      { url: "/donation", priority: "1.0", freq: "weekly" },
      { url: "/signin", priority: "0.3", freq: "yearly" },
      { url: "/signup", priority: "0.3", freq: "yearly" },
      { url: "/forgot-password", priority: "0.2", freq: "yearly" },
    ];

    let urls = [];

    // 🏠 STATIC PAGES
    staticPages.forEach((page) => {
      urls.push(`
<url>
  <loc>${baseUrl}${page.url}</loc>
  <lastmod>2026-04-12T00:00:00.000Z</lastmod>
  <changefreq>${page.freq}</changefreq>
  <priority>${page.priority}</priority>
</url>`);
    });

    // 📝 BLOG POSTS (DYNAMIC)
    posts.forEach((post) => {
      if (!post?._id) return;

      urls.push(`
<url>
  <loc>${baseUrl}/blogs/${post._id}</loc>
  <lastmod>${new Date(post.updatedAt || post.createdAt || Date.now()).toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>`);
    });

    // 📅 EVENTS (DYNAMIC)
    events.forEach((event) => {
      if (!event?._id) return;

      urls.push(`
<url>
  <loc>${baseUrl}/events/${event._id}</loc>
  <lastmod>${new Date(event.updatedAt || event.createdAt || Date.now()).toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>`);
    });

    // 📦 FINAL XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.send(sitemap.trim());
  } catch (error) {
    console.error("Sitemap Error:", error.message);
    res.status(500).send("Error generating sitemap");
  }
};

module.exports = generateSitemap;
