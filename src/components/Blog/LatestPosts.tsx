import React from "react"
import { useBlog } from "src/data/blog"
import { ContentChild, ContentWrapper } from "../content-wrapper"
import PostTeaser from "./PostTeaser"

const LatestsPosts = () => {
  const { posts } = useBlog({ limit: 2 })

  return (
    <ContentWrapper>
      <h2>Recent member reports</h2>
      <ContentWrapper container>
        {posts.map((post, i) => (
          <ContentChild key={i}>
            <PostTeaser post={post} />
          </ContentChild>
        ))}
      </ContentWrapper>
    </ContentWrapper>
  )
}
export default LatestsPosts
