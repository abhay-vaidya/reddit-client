# Reddit Client

###### ⚠️ Work in Progress!

Used as a playground to learn React Native.

Currently using anonymous Reddit API meaning user can browse content, but not interact with it (upvote, comment, post, etc.). Hoping to integrate the actual API at some point in the near future.

It's always changing, but here's what it looks like as of May 27:

<p float="left">
  <img src="https://user-images.githubusercontent.com/2274254/58435823-70586d00-8090-11e9-9f93-189daf9abed6.png" width="45%" />
  <img src="https://user-images.githubusercontent.com/2274254/58437780-861e6000-8099-11e9-958e-ba7977c01eda.png" width="45%" /> 
</p>

## Development

```
git clone https://github.com/abhay-vaidya/reddit-client.git

npm install -g expo-cli

cd reddit-client

npm install

npm start
```

## Compatibility

It has only been tested on iOS (X series) so far, not sure how well it works on Android or other iPhones yet.

## Features

- Browse posts with infinite scrolling
- Pull to refresh
- Search and change subreddits
- View images (needs more work)
  - Tapping thumbnail opens lightbox (double tap and pinch to zoom)
- View external links
  - Tapping thumbnail opens web view
- Tap post to view self post text
- Dark/Light mode toggle
- Changing post sorting

## What's Missing

A lot...

- As mentioned before, any sort of interactions with Reddit itself
- Viewing comments
- Viewing gifs/videos
- Testing
- App icon and other assets
- Error handling
- Likely any other feature of your favourite Reddit client 😅
