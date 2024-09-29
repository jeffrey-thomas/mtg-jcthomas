# Overview

This is a Magic: the Gathering deck organization app. Users able to create, name, rename, and delete decks of cards,  as well as add, remove, and change quantities of different cards within those decks.

I made it to learn and practice making a single page application in React and connecting it to a database. The database I chose to use was Firestore by Google.

To start a test server:  
    - navigate to the project directory in a console
    - run the command 'npm run dev'
    - open http://localhost:5173/ in a browser

# Web Pages

There are three pages for this app: Home, About, and Dashboard. Links in a navigation menu at the top of the page allow the user to navigate between them. They are actually three components rendered in a Single Page Application. If the user has not signed in then the link to the Dashboard is not displayed but is replaced with a signin button. If the user is signed in then there is a sign out link.

Home - is a basic landing page with a simple logo. If the user has signed in then there is a link to the dashboard under the logo. If they are not signed in then the link is replaced with a sign in button.

About - This page contains a basic description of the App and the technologies used.

Dashboard - This is the main page of the app. It displays the decks that the user has created and controls to edit them.

# Development Environment

Visual Studio Code 1.93.1

Languages and Libraries:

Typescript
Vite
React
React-Router-Dom
React-Tooltip
Firebase Authentication
Firestore Database

Scryfall API

# Useful Websites

* [Scryfall](https://scryfall.com/)
* [Firebase Documentation](https://firebase.google.com/docs/)
* [React Documentation](https://react.dev/learn)
* [React-Tooltip Docs](https://react-tooltip.com/docs/getting-started)
* [React-Router-Dom](https://reactrouter.com/en/main/start/tutorial)

# Future Work

In the future I would like to make the following changes:
* Come up with a better name and logo
* Add confirmation dialogs for deleting decks or removing cards from a deck
* Improve the CSS styling.
* Add the ability for it to enforce the rules for different types of Magic games.