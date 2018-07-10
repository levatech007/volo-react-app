# VOLO - the app for plane spotters

Volo (Italian for flight) is an app for plane spotters. You can find information about plane spotting locations around the world with user reviews of each location. The app also lets you create an account, check weather forecast for chosen location as well as add a select day to your calendar.

![Wireframes](/src/images/volo-homepage.png)

### Technologies:
The following technologies made it possible:
Front end:
- React.js
- Bootstrap 4.0
- Popper.js 1.12.9
- jQuery
- J-toker (for authentication)
- React Stars
- React Google Map

Back end:
- Rails
- Redis
- Sidekiq
- RestClient
- PostgreSQL
- Devise Token Auth

### Links:

- Front end app [Github](https://github.com/levatech007/volo-react-app)
- Front end app [Heroku](https://volo-app.herokuapp.com)

- Back end app [Github](https://github.com/levatech007/volo_rails_api)
- Back end app [Heroku](https://volo-rails-api.herokuapp.com)

## Installation:

To install dependencies on the front end, run:
`npm install`

To install dependencies on the back end, run:
`bundle install`

## User Stories:
- Users can create an account and login.

![Wireframes](/src/images/login-page.png)

- Users can select a plane spotting location and see information about that locations, including a map.
- Users can read other users reviews of the location as well as post their own review.

![Wireframes](/src/images/locations-menu-page.png)

![Wireframes](/src/images/location-page.png)

![Wireframes](/src/images/location-review-page.png)
- Users can select a location and see weather forecast for the next 4 days.
- Users can add a day to their calendar with weather information as well as add notes prior to saving their selection.

![Wireframes](/src/images/calendar-page.png)

## Wireframes

![Wireframes](/src/images/wireframes.JPG)

## ERD
![Wireframes](/src/images/ERD.png)

![ERD](/src/images/ERD.png)

## Unsolved Problems:
- Routes don’t have authorization.
- Weather API worker does not save data on Heroku.


## Future Features:
- Airport information with flight schedules.
- Nearby flights on map, real time.
- Selecting locations based on type of plane user wants to see as well as by busiest times at given airport.
- More detailed location info (parking, nearby amenities).
- Schedules of airshows.
