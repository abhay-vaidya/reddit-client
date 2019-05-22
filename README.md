# (WIP) React Native Reddit Client

Used as a playground to learn React Native.

Currently using anonymous Reddit API meaning user can browse content, but not interact with it (upvote, comment, post, etc.). Hoping to integrate the actual API at some point in the near future.

## Development

```
git clone https://github.com/abhay-vaidya/reddit-client.git

npm install -g expo-cli

cd reddit-client

npm install

npm start
```

## Compatibility

It has only been tested on iOS (X series) so far, not sure how well it works on Android yet.

## Features

- Browse posts with infinite scrolling
- Search and change subreddits
- View images (needs more work)
  - Tapping thumbnail opens lightbox
- View external links
  - Tapping thumbnail opens web view
- Tap post to view self post text

## What's Missing

A lot...

- As mentioned before, any sort of interactions with Reddit itself
- Viewing comments
- Viewing gifs/videos
- Changing post sorting
- Testing
- Likely any other feature of your favourite Reddit client 😅
