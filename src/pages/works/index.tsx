import Link from 'next/link'
import { Page, PageMeta } from '../../components/page'
import { PostCollector, PostCollectorProps } from '../../lib/post-collector'

const meta: PageMeta = {
  title: '作品',
  description: 'Works of TUATMCC',
}

// posts will be populated at build time by getStaticProps()
const Works = ({ posts }: PostCollectorProps) => {
  return (
    <Page meta={meta}>
      {posts.map((post) => (
        <li key={0}>
          <h3>
            <Link href={post.filePath}>{post.filename}</Link>
          </h3>
        </li>
      ))}
    </Page>
  )
}

// This function gets called at build time on server-side.
export const getStaticProps = new PostCollector('works').getStaticProps

export default Works
