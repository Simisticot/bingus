# Bingus
A simple bingo card maker to play immediately in the browser.  
Built as a side project to learn React and have good fun time :)

## Current Features
- Write text into any cell to create your custom card.  
- Use the shuffle button to shuffle cells around the card.  
- Use the lock button to stop editing and start playing.
- Play by clicking a cell to check or uncheck it.
- Completed lines change color to indicate you've won.
- Use the unlock button to return to go back to editing any time you want.
- Use the card size selector to pick your card's layout.
- Use the "Copy link" button to get a link to your custom card.

## Known bugs/issues
- Links created with the "Copy link" button are unreasonably long, 5x5 grids can break past discord's message length limit and some browser's url length limit. As you can probably tell this is because the entirety of the grid's text is contained within the link's get parameters, this ensures that I don't have to store anything. I have already started looking into ways to compress the text to offer shorter links and hope to ship this feature with release 1.1.

## Planned features
- More card sizes
- Shorter links

## Contact/Feedback
I would really appreciate you adding issues to this repository to report bugs as well as request changes or features.
Email me at simi.pra@gmail.com for other inquiries.