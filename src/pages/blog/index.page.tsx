import Image from 'next/image';
import Link from 'next/link';

import styles from './style.module.css';

import { Helmet } from '~/components/common/Helmet';
import { Layout } from '~/components/common/Layout';
import { Tag } from '~/components/common/Tag';
import { TagList } from '~/components/common/TagList';
import { PostCollector, PostCollectorProps } from '~/lib/post-collector';
import { MetaData } from '~/types/meta';
import classNames from '~/utilities/classNames';

const meta: MetaData = {
	title: 'Blog',
	description: 'Blog of TUATMCC',
};

// posts will be populated at build time by getStaticProps()
const WorksPage = ({ posts }: PostCollectorProps) => {
	return (
		<>
			<Helmet meta={meta} />
			<Layout>
				<h1 className={styles.pageTitle}>Blog</h1>
				<div className={styles.list}>
					{posts.map((post, index) => {
						return (
							<Link
								href={`blog/${post.slug}`}
								key={post.slug}
								className={classNames(styles.listItem, index % 2 === 1 ? styles._reverse : '')}
							>
								{post.frontmatter.img ? (
									<Image
										className={styles.image}
										src={post.frontmatter.img}
										alt={post.frontmatter.title}
										width={350}
										height={200}
										onError={(e) => {
											e.currentTarget.src = '/mcc-design.jpg';
										}}
									/>
								) : (
									<Image
										className={styles.image}
										src="/mcc-design.jpg"
										alt={post.frontmatter.title}
										width={350}
										height={200}
									/>
								)}
								<div className={styles.text}>
									<h2 className={styles.title}>{post.frontmatter.title}</h2>
									{post.frontmatter.tags && (
										<TagList>
											{post.frontmatter.tags.map((tag) => (
												<Tag key={tag}>{tag}</Tag>
											))}
										</TagList>
									)}
									{post.frontmatter.date && <div>{post.frontmatter.date}</div>}
									{post.frontmatter.description && <div>{post.frontmatter.description}</div>}
								</div>
							</Link>
						);
					})}
				</div>
			</Layout>
		</>
	);
};

// This function gets called at build time on server-side.
export const getStaticProps = new PostCollector('blog').getStaticProps;

export default WorksPage;
