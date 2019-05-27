export function transformRawPosts(rawPosts) {
  if (!rawPosts) {
    return [];
  }

  return rawPosts.map(post => {
    const {
      title,
      score,
      author,
      num_comments,
      id,
      created,
      thumbnail,
      url,
      permalink,
      is_self,
      subreddit,
      selftext_html,
      name
    } = post.data;

    const isImage = url.match(/(.png|.jpg|.jpeg)/) !== null;

    const postType = isImage ? "pic" : is_self ? "self" : "link";

    const newThumbnail =
      thumbnail.match(/^(default|self|spoiler|nsfw)$/) !== null
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
      created,
      permalink,
      postType,
      subreddit,
      name,
      selftext: selftext_html
    };
    return newPost;
  });
}

export function transformRawComments(rawComments) {
  if (!rawComments) {
    return [];
  }

  const filteredComments = rawComments.filter(comment => {
    return comment.kind !== "more";
  });

  return filteredComments.map(comment => {
    const {
      author,
      body_html,
      score,
      replies,
      depth,
      id,
      created
    } = comment.data;
    const newReplies = replies
      ? transformRawComments(replies.data.children)
      : [];
    return {
      author,
      body: body_html,
      score,
      replies: newReplies,
      depth,
      id,
      created
    };
  });
}
