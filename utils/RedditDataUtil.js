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
      permalink,
      is_self,
      subreddit
    } = data;

    const isImage = url.match(/(.png|.jpg|.jpeg)/) !== null;

    const postType = isImage ? "pic" : is_self ? "self" : "link";

    // let postType;
    // switch (thumbnail) {
    //   case ("default", "self", "spoiler"):
    //     postType = "text";
    //     break;
    //   default:
    //     postType = isImage ? "pic" : "link";
    // }

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
      subreddit
    };
    return newPost;
  });
}
