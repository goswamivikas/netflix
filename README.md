## netflix-clone

This is minimal replication of the Netflix web application, made for learning purposes. [WIP]

##### live url - http://netflix-21.herokuapp.com

### Features

- Responsive design
- Authentication
- Latest information on Series and Movie Titles
- Previews on Web
- No dummy data
- All the lists, like Trending, Movies/Series in a genre are created dynamically on each data sync with TMDB Org. _server/utils/scheduler/tmdbSync.js_

### Tech stack

- #### Client
  - React + Typescript
  - Tailwindcss
- #### Server
  - Node.js
  - Database - Mongodb with Mongoose
  - JWT for auth

##### Data Source:

All the movies, series titles, images and related info has been used from and belongs to https://www.themoviedb.org.

#### disclaimer

All the Movie, Series previews are shown from their respective trailers/teasers available on YouTube. I do not have any of these videos on my server and no copyright violation is intended. Thank you.
