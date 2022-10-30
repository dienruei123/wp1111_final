# Web Programming HW#5

###### Author: b10901038 吳典叡

### Run Program

Download node_modules
(Important!! Must add modules in both frontend and backend)

```bash
yarn add
cd hw5/frontend
yarn add
cd hw5/backend
yarn add
```

Run: First `yarn server` then `yarn start`

## Basic features

1. `App.js`: Logic of functions and control of states
   - When pressed "Start game", server will generate a new number
   - Guess a number between the range, and press "Guess", then server will return a suggestion (bigger, smaller).
   - It is legal to input a string or number out of range, though axios will catch the error(406), which doesn't affect the game.
   - Guessing correct number will switch to winning page; press "restart", then user is able to start a new game
2. `axios.js`: Implement {startGame, guess, restart} three functions used to connect with server
3. `getNumber.js`: Manages the hidden number(DB); there are two functions, getNumber() is used to access the hidden number and genNumber() is used to generate a new hidden number by randomization.
4. `guess.js`: Define {"/start", "/guess", "/restart"} three APIs;
   - "/guess": check the correctness of the guessed number, and return a suggestion (Bigger, Smaller, Equal); if there exists invalid input, then return HTTP status 406 (axios will catch it at frontend)
   - "/start": Manage the action of "Start game"(generates a new number, switch to "/guess" page)
   - "/restart": similar to "/start", but need more settings (useStates) to ensure a new guess game

## Advanced features

## Additional features
