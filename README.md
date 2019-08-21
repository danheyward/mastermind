# Mastermind
The classic code-breaking game, this iteration developed by your favorite misanthrope, [Dan H.](https://danheyward.github.io/danheyward-portfolio/)
***
## Gameplay
The goal of the game is to decipher the hidden code that is set at the beginning of each round. The player can make up to 10 guesses by selecting the colors for each of the 4 slots. Once a full row is complete, the computer will tell you how many spots are correct and how many colors are correct but in the wrong spot; however, it will not tell you the locations or colors of these spots. The player must use process of elimination to determine what the exact combination of colors is the secret code in 10 turns or less. Achieve this, and you win!
***
## Backstory
Back in the winter of 2018, I signed on to do a coding bootcamp through General Assembly. The goal in mind was to increase my marketing appeal to the tech-hungry job market of Seattle. Luckily for me, things went as planned and I ended up snagging a digital marketing role directly after graduating the program. The unfortunate part was that I did not get to flex my newly-found development muscles as much as anticipated in the new role.

After a year and change of letting my chops get rusty, I've hopped back into the coding world. This game is my first project that I've undertaken since the bootcamp. Although this is long overdue, I'm excited to pick back up where I left off.
***
## Ideation
I love puzzles. I have a Mastermind app on my phone. Using the app as a rough template, recreating a simplistic game with easy parameters (1 player, 8 colors, 10 turns) seemed a good project to acclimate back to regular development work.
***
## Project Log
#### Everything So Far — 08.16.19
The lion's share of the work done up to this point was done on my local machine, disconnected from GitHub (and the prying eyes of my ex-cohort mates.) Whether this was to avoid the digital stress of digital eyes peering over my digital shoulder, or because I was potentially quite rusty at the command line (I'll neither confirm nor deny such rumors), the end result is I did not put much effort into tracking my progress. However, I've distilled my general roadmap into a convenient bulleted list below and will start from this point on to make structured updates moving forward.

1. Built general game board consisting of...
  * Game title and subheader
  * Answer row
  * 10 row elements that hold...
    * Row Number
    * Row Spots
    * Row Checkers
  * Color row
  * Game buttons
2. Added placeholder styles to see HTML elements
3. Set initial game variables and click events
4. Built game functions
5. Added in styling + removed unused HTML elements
6. Annotated JS code and edited for semantic readability

#### I feel pretty (and I'm finally functional!) — 08.21.19
Thanks to some lovely stylings from [CSS3 Patterns Gallery](https://leaverou.github.io/css3patterns/), as well as simple transition animations, the styling of the game looks much nicer. I also reinserted the row numbers and guess 'checkers' (better name coming...maybe...). Now you can play the game without looking at the console!

***
## Current Hurdles + Next Steps
**RESOLVED** `I'm mentally stuck on how I want the game 'checker' to be displayed. The game I've used for inspiration has a set of 4 'pegs' in-line with each row that, after a guess has been placed, fill in with either black dots (right color, right place), white dots (right color, wrong place), or remain blank (incorrect color). There's no concern about functionality, I just need to pick a design direction and go for it.`

One feature that I'd like to add is the ability to select specific dots to edit without having to clear the entire guess. This will involve adding a click event on each individual spot that allows the user to edit that spot in the guess. More to come on this, as of now it is a stretch goal for after the MVP of gameplay is met.
