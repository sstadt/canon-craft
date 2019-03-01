
export const endpoint = 'https://api-useast.graphcms.com/v1/cjskvtcwb0imb01fjc8whf0g8/master'

export const allPostsQuery = `{
  posts(where: {status: PUBLISHED}) {
    id
    title
    date
    createdAt
    updatedAt
    image {
      url
    }
    content {
      html
    }
  }
}`
