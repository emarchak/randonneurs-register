import React from "react"
import { Post } from "src/data/blog"
import { LinkButton } from "../Buttons"

type PostTeaserProps = {
  post: Post
}

const PostTeaser = ({ post }: PostTeaserProps) => (
  <article>
    <h3>{post.title}</h3>
    <p>
      {post.teaser}
      <br />
    </p>
    <LinkButton secondary block small href={post.link}>
      Continue reading
    </LinkButton>
  </article>
)

export default PostTeaser
