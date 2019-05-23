export function convertRawPosts(posts) {
  if (!posts) {
    return [];
  }

  return posts.map(post => {
    const { data } = post;
    const {
      title,
      score,
      author,
      num_comments,
      id,
      thumbnail,
      url,
      permalink,
      is_self,
      subreddit,
      selftext_html,
      name
    } = data;

    const isImage = url.match(/(.png|.jpg|.jpeg)/) !== null;

    const postType = isImage ? "pic" : is_self ? "self" : "link";

    const newThumbnail =
      thumbnail.match(/^(default|self|spoiler)$/) !== null
        ? undefined
        : thumbnail;

    const newPost = {
      title,
      author,
      score,
      numComments: num_comments,
      id,
      thumbnail: newThumbnail,
      url,
      permalink,
      postType,
      subreddit,
      name,
      selftext: selftext_html
    };
    return newPost;
  });
}
