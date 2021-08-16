## Weather app

![weather app](assets/weather-app.png)
[Live Demo]()

### description

weather app built with javascript to exercise loading data from third party apis asynchronously with javascript and displaying weather information about a city

```javascript
fetch(url).then(res=> res.json()).then(data console.log(data)).catch(err=>console.log(err))
```

would love to implement it in ansyc await syntax feel free to play around with this code.

### features

- search weather information of a city
- error handling incase the user query is invalid
- i'm yet to implement local storage to persist user data.

### Built with

- html
- css
- javascript
- [openweather](https://openweathermap.org)