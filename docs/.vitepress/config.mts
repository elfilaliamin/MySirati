import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/docs/',
  title: 'MySirati Documentation',
  description: 'AI-ready career data platform, cryptographic share links, and JSON Resume API.',
  lang: 'en-US',
  lastUpdated: false,
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/docs/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/docs/favicon.png' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/docs/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/docs/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#2563EB' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ],

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'MySirati',

    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },

    nav: [
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'AI Integration', link: '/ai/overview', activeMatch: '/ai/' },
      { text: 'Architecture', link: '/architecture/system-design', activeMatch: '/architecture/' },
      { text: 'Operations', link: '/operations/docker-deployment', activeMatch: '/operations/' },
      { text: 'API Reference', link: '/api/overview', activeMatch: '/api/' },
      {
        text: 'Platform',
        items: [
          { text: 'Launch Web App', link: 'https://mysirati.elfilaiamin.online', target: '_self' },
          { text: 'GitHub Repository', link: 'https://github.com/elfilaliamin/MySirati' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'User Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Profile & Headline', link: '/guide/profile-management' },
            { text: 'Career Sections', link: '/guide/sections-guide' },
            { text: 'Account Settings & Export', link: '/guide/account-settings' },
          ],
        },
      ],
      '/ai/': [
        {
          text: 'AI Integration',
          items: [
            { text: 'AI Resume Overview', link: '/ai/overview' },
            { text: 'JSON Resume Specification', link: '/ai/json-resume-spec' },
            { text: 'Prompts & LLM Workflows', link: '/ai/prompts-and-workflows' },
            { text: 'Privacy & Cherry-Picking', link: '/ai/privacy-and-filtering' },
          ],
        },
      ],
      '/architecture/': [
        {
          text: 'System Architecture',
          items: [
            { text: 'System Design & Topologies', link: '/architecture/system-design' },
            { text: 'Security & Cryptography', link: '/architecture/security-and-cryptography' },
            { text: 'Database Schema', link: '/architecture/database-schema' },
            { text: 'Admin 404 Obscurity', link: '/architecture/admin-obscurity' },
          ],
        },
      ],
      '/operations/': [
        {
          text: 'Deployment & Ops',
          items: [
            { text: 'Docker Compose Deployment', link: '/operations/docker-deployment' },
            { text: 'Cloudflare Tunnel Integration', link: '/operations/cloudflare-tunnel' },
            { text: 'Database Backups & Restore', link: '/operations/backup-and-restore' },
            { text: 'Environment Variables', link: '/operations/environment-variables' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview & Conventions', link: '/api/overview' },
            { text: 'Authentication API', link: '/api/authentication' },
            { text: 'Profile API', link: '/api/profile' },
            { text: 'Sections API', link: '/api/sections' },
            { text: 'Share Links API', link: '/api/share-links' },
            { text: 'Public AI Resume Endpoint', link: '/api/public-endpoint' },
            { text: 'Admin & Audit Log API', link: '/api/admin' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/elfilaliamin/MySirati' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 MySirati. AI-ready career profile platform.',
    },
  },
});
