## Shot Clock

### Features
- Sync player JSON data and images
- Presents 2 players on screen with their images, team logo, position and games played.
- User can guess which player has the higher PPG (Points per game)
- Game ends when the user gets 10 correct

### Future work
- Add a countdown timer which would be the "shot clock"
- Give different points depending on speed of answer
- Sync only when new data is available and not every time the app is started as it is now.
- Leaderboard for high scores
- Sounds
- Animations
- Tablet support

### Unit Tests
Jasmine unit test framework was used to test the controllers within the app. Due to time constraints the sync controller is the only code with tests but this shows what can be done.

One of the downsides that I can see from using the unit test framework is that I had to make my functions "public" in a way by prefixing them with the "$" so that jasmine controllers could call the functions.

### Frameworks used
- Knuth-Shuffle
  - Used to randomise the player array properly each time the game is started.
- XHR
  - HTTP Client for titanium to make API calls
- Jasmine
  - Unit test framework for titanium
