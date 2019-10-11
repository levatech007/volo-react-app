# VOLO - the app for plane spotters

Volo (Italian for flight) is an app for plane spotters. You can find information about plane spotting locations with user reviews of each location. The app also lets you create an account, check weather forecast for chosen location as well as add a select day to your calendar. You can select an aircraft and see when your chose aircraft can be seen at selected airport.

Spotting a specific aircraft is a plane spotter’s most important goal. As an avid plane spotter, myself, that information was not always so easy to find if you wanted to plan your sighting trips ahead of time. That’s why I decided to build VOLO - the world’s first application meant for plane spotters. It helps users plan their sighting trips ahead of time. Users can search for aircraft landings and take-offs at select airports by aircraft type up to a week ahead.

This is the MVP of the application. Flight search is limited to Star Alliance flights and aircraft filtering includes only wide body jets. The search dates include today + 6 days


![Wireframes](/src/images/readme-images/volo-homepage.png)

### Technologies:
The following technologies made it possible:

Front end:
- ReactJS
- Bootstrap 4.0
- jQuery
- J-toker (for authentication)
- React Stars
- React Google Map
- Netlify

Front end mobile app (Coming soon!):
- React Native
- React Navigation

Back end:
- Rails
- Redis
- Sidekiq
- RestClient
- PostgreSQL
- Devise Token Auth
- CarrierWave
- Heroku

Volo Public API:
- Rack
- Roda Routing Tree
- Sequel
- Redis
- Nokogiri
- Heroku

3rd Party APIs:
- Openweathermap
- Mailchimp
- Lufthansa

### Links:

- Front end app [Github](https://github.com/levatech007/volo-react-app-example)
- Front end app [Live Site](https://www.spotvolo.com)
- Front end mobile app [Github](https://github.com/levatech007/volo-react-native)(W.I.P)

- Back end app [Github](https://github.com/levatech007/volo-rails-api-example)
- Back end app [Heroku](https://volo-rails-api.herokuapp.com)

- Volo Public API [Github](https://github.com/levatech007/aviation-api-sample)

## Installation:

To install dependencies on the front end, run:
`npm install`

To install dependencies on the back end, run:
`bundle install`

## User Stories:
- Users can create an account and login.

![Wireframes](/src/images/readme-images/login-page.png)

![Wireframes](/src/images/readme-images/signup-page.png)

![Wireframes](/src/images/readme-images/profile-page.png)

- Users can select a plane spotting location and see information about that locations, including a map.
- Users can read other users reviews of the location as well as post their own review.

![Wireframes](/src/images/readme-images/location-menu-page.png)

![Wireframes](/src/images/readme-images/location-page.png)

![Wireframes](/src/images/readme-images/location-review-page.png)
- Users can select a location and see weather forecast for the next 4 days.
- Users can add a day to their calendar with weather information as well as add notes prior to saving their selection.

![Wireframes](/src/images/readme-images/calendar-page.png)

- Users can select the aircraft they want to see and get the aircrafts landing/take-off times for selected airport.

![Wireframes](/src/images/readme-images/select-aircraft.png)

![Wireframes](/src/images/readme-images/flight-schedule.png)

- Users can get access to the Volo Public API via documentation page.

![Wireframes](/src/images/readme-images/api-page.png)

## Wireframes
![Wireframes](/src/images/wireframes.JPG)

## ERD
![Wireframes](/src/images/ERD.png)

## Unsolved Problems:
- There may be routes that don’t have authorization.
- Profile image upload not yet functional in back-end.
- OAuth login (BE functionality via Devise not redirecting users to password reset page).

## Future Features:
- Add more airline APIs to expand flight coverage.
- Airport information with flight schedules.
- Nearby flights on map, real time.
- Selecting locations based on type of plane user wants to see as well as by busiest times at given airport.
- More detailed location info (parking, nearby amenities).
- Schedules of airshows.
