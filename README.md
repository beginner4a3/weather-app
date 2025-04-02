# Weather App

A React-based weather application that provides current weather and 5-day forecast information using the OpenWeatherMap API. The app features a clean, modern UI with responsive design and supports searching by city name, ZIP code, or coordinates.

## About the Developer

**Name:** Sweekar Sonti  
**Email:** sontisweekar9@gmail.com  
**LinkedIn:** [Sweekar Sonti](https://www.linkedin.com/in/sweekarsonti)

## About PM Accelerator

**Overview:**  
Hiring and getting hired for product management roles is hard. In the short timeframe of an interview, it is difficult to precisely assess and display the necessary, complex skills.

Product Managers play key roles in a company. Hiring for those positions shouldn't be a guessing game.

It is our vision, to make it simple and beneficial for Product Managers to accurately display their skills and empower hiring companies to choose the right Product Manager every time.

**Sign up now:** [PM Accelerator](https://pm-accelerator.webflow.io/)

## Features

- Current weather display with temperature, conditions, and wind speed
- 5-day weather forecast
- Search by city name, ZIP code, or coordinates
- Automatic location detection (requires HTTPS in production)
- Responsive design for all devices
- Error handling and user feedback
- Environment variable configuration for API key

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- OpenWeatherMap API key (get one at [OpenWeatherMap](https://openweathermap.org/api))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/beginner4a3/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## Important Notes

### Geolocation API Requirements

The "Use My Location" feature requires a secure context (HTTPS) to work in production environments. This is a browser security requirement for accessing sensitive APIs like geolocation. The feature will work in the following scenarios:

- On localhost (development environment)
- On HTTPS-enabled domains (production environment)

If you're deploying to a hosting service that doesn't provide HTTPS by default, you'll need to configure it to use HTTPS for the geolocation feature to work.

## Project Structure

```
weather-app/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   ├── services/        # API services
│   ├── utils/          # Utility functions
│   ├── App.js          # Main application component
│   └── index.js        # Application entry point
├── .env.example        # Example environment variables
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## Dependencies

- React 18.2.0
- Axios 1.6.7
- React Scripts 5.0.1

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for proper routing and build settings.

### Vercel Deployment

Vercel provides HTTPS by default, so the geolocation feature should work correctly when deployed there. If you're experiencing issues with the "Use My Location" feature on Vercel, please check:

1. That your browser is allowing location access for the site
2. That you're accessing the site via HTTPS
3. That your browser supports the Geolocation API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

**Sweekar Sonti** - [LinkedIn](https://www.linkedin.com/in/sweekarsonti)  
Project Link: [https://github.com/beginner4a3/weather-app](https://github.com/beginner4a3/weather-app)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
