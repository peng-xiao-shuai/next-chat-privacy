const paths = ['/', '/setting', '/setting/theme-change', '/setting/size-change', '/setting/lang-change', '/setting/about', '/setting/about/feedback', '/chat-room']
/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalPaths: (config) => {
    const result = []

    paths.forEach(item => {
      const alternateRefs = ['ja-JP', 'zh-TW', '', 'zh-CN'].map(lng => ({
        href: process.env.NEXT_PUBLIC_SITE_URL + '/' + lng,
        hreflang: lng || 'en-US',
      }))

      result.push({
        loc: item,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),

        alternateRefs: alternateRefs
      })
    })

    return result
  }
}