export function convertRawPosts(posts) {
  if (!posts.data) {
    return posts;
  }
  return posts.data.children.map(post => {
    const { data } = post;
    const {
      title,
      score,
      author,
      num_comments,
      id,
      thumbnail,
      url,
      preview,
      permalink
    } = data;

    let aspectRatio;

    if (preview && preview.images && preview.images[0].source) {
      const { width, height } = preview.images[0].source;
      aspectRatio = width / height;
    }

    const newThumbnail =
      thumbnail.match(/^(default|self|spoiler)$/) !== null
        ? undefined
        : thumbnail;

    const isImage = url.match(/(.png|.jpg|.jpeg)/) !== null;

    const newPost = {
      title,
      author,
      score,
      numComments: num_comments,
      id,
      thumbnail: newThumbnail,
      isImage,
      url,
      aspectRatio,
      permalink
    };
    return newPost;
  });
}
