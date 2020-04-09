# TIC - TAC - DOH

Game <a href="https://cumulusground.github.io/Tic-Tac-Doh/">here</a>
> just open the link and you'll be ready to play

## Technology used
This game is writing in HTML, CSS and Javascript.

- The animation come from animate.css
- The font is from Google Fonts, named "Gochi Hand", designed by Huerta Tipográfica
- The images / icons were retrieved through various Google Search

## The process
### Starting
I found myself needed to start by a basic HTML and CSS frame.
As I'm think of myself as quite a visual person, having a rough representation of what I'm working on helps.

I built the title and rough game board, roughly positioned on the page and then I turned myself to Javascript.

I lay out how I though the code should go on a piece of paper.

### Retrieving all DOM element needed
Self-explanatory, I retrieved all the elements needed through querySelectors and getElement methods.

### Functions and game logic
#### working out how to alternate players
My first step once to figure out how to handle turns. I ended going with a mix of Intervals Timers and IF statements. 
I like the Interval method because it made me think of chess and I figure out I could display the player timer in the future for added informations.

#### Working out how to make player one win
    Working out the game logic was definitaly the toughest part for me. At the time of submition of this project, the game works but I'm not happy with the logic. I really struggle for a while as I felt I was subject to: 1) following to many solutions at once. b) wanting to make it perfect the first time around. c) thinking about future problems instead of focusing on the simplest building block.
    After some time, reflexation and a walk in the outside world, I decided to solve it for the time being using "dirty" code.
    This solved it and allowed me to move on for now.

#### Extrapolate so both player can win as well as draw
    This was a matter of turning some part of the code into functions so that the passed argument could be the current player. Therefor not having to right the lengthy code twice (or more)

#### Moving from the console (dev) to the UI.
    Using DOM manipulation, I now could transfer my results to display on-screen for the user

### Event Listenner
    Used to make the page interactive

### Styling
Once I finally worked out the game logic, I decided to return to CSS. Step one was to retrieve all the bits and pieces, such as possible images, fonts, color theme. 
Once I felt like I had a good picture in min, I sketched the layout once again, keeping in mind I was gonna rely on grid for my positionning.

Once the sketche once done, I attack the HTML/CSS methodically, styling each layer as I went.

Then I added bells and whistles once I was happy with the overall result


## things to further improve
- The game logic!!
- Web audio API
- Curve the text on the start screen.
- improve the design of Marge's hair (blue section)
- Winning-text-to-gamer-point animation => the winning text transforms and transitions to become the winner player score
- Choice of different characters
- Adding round timers and total game timers
- possible addition of customizable options, time limits, board size, game rounds, name & profiles etc
- Research LocalStorage or SessionStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity


### This is for educational purposes (school-project)

