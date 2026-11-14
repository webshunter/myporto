import HomeComponent from '@/component/homeComponent'
import {
  getPortfolio,
  getRecentPosts,
  getFeaturedProjects,
} from '@/lib/sanity'

export default async function Home() {
  const [portfolio, blogPosts, projectList] = await Promise.all([
    getPortfolio(),
    getRecentPosts(3),
    getFeaturedProjects(4),
  ])

  return (
    <HomeComponent
      data={portfolio}
      blogPosts={blogPosts}
      projectList={projectList}
    />
  )
}
