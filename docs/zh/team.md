---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/akinoccc.png',
    name: 'Akino',
    title: '开发者',
    org: '柚子星云',
    orgLink: 'https://github.com/uozi-tech',
    links: [
        { icon: 'github', link: 'https://github.com/akinoccc' },
        { icon: 'blogger', link: 'https://akino.icu' }
    ]
  },
  {
    avatar: 'https://www.github.com/0xJacky.png',
    name: '0xJacky',
    title: '开发者',
    org: '柚子星云',
    orgLink: 'https://github.com/uozi-tech',
    links: [
      { icon: 'github', link: 'https://github.com/0xJacky' },
      { icon: 'blogger', link: 'https://jackyu.cn' }
    ]
  },
  {
    avatar: 'https://www.github.com/thahao.png',
    name: 'Thahao',
    title: '开发者',
    org: '柚子星云',
    orgLink: 'https://github.com/uozi-tech',
    links: [
      { icon: 'github', link: 'https://github.com/thahao' }
    ]
  }
]

const projects = [
  {
    title: 'Nginx UI',
    desc: 'Nginx UI 是一个全新的 Nginx 网络管理界面，旨在简化 Nginx 服务器的管理和配置。',
    link: 'https://github.com/0xJacky/nginx-ui',
    icon: 'https://nginxui.com/assets/logo.svg',
  },
  {
    title: 'Cosy',
    desc: 'Cosy 是一个方便的工具，基于泛型，面相对象，旨在简化基于 Gin 框架并使用 Gorm 作为 ORM 的 Web API 的 CURD 的过程。',
    link: 'https://github.com/uozi-tech/cosy',
    icon: '🛠️',
  }
]

function isLink(link) {
  return link.startsWith('http') || link.startsWith('https')
}
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      核心团队
    </template>
    <template #lead>
      我们是一群热爱技术的开发者，致力于打造更优秀的开发工具。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>

<div class="container">
  <h2 class="title">我们的其他开源项目</h2>
  <div class="projects">
    <a v-for="project in projects"
       :key="project.title"
       :href="project.link"
       target="_blank"
       class="project-card"
    >
      <div class="header">
        <img v-if="isLink(project.icon)" class="icon" :src="project.icon" alt="项目图标" />
        <span v-else class="icon">{{ project.icon }}</span>
        <h3>{{ project.title }}</h3>
      </div>
      <p>{{ project.desc }}</p>
    </a>
  </div>
</div>

<style scoped>
.VPTeamPage {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}

.VPTeamPageTitle {
  padding-top: 20px !important;
  padding-bottom: 40px !important;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  margin-bottom: 100px;
  padding: 40px 24px;
}

.icon {
  width: 28px;
  height: 28px;
}

.title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--vp-c-text-1);
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.project-card {
  display: block;
  padding: 24px;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
  text-decoration: none;
}

.project-card:hover {
  border: 1px solid var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft-up);
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.icon {
  display: block;
  font-size: 24px;
  line-height: 24px;
}

.project-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 24px;
}

.project-card p {
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 20px;
}
</style>
