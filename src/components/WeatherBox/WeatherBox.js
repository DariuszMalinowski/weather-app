import { useState, useCallback } from 'react';
import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {

  const [weather, setWeather] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {

    // reset błędu
    setError(false);

    // start requestu
    setPending(true);

    // chowamy stare dane
    setWeather(null);

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=85ece2943b222cc09fbeabbace82fd8c&units=metric`)
      .then(res => {

        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('City not found');
        }

      })
      .then(data => {

        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        };

        setWeather(weatherData);
        setPending(false);

      })
      .catch(() => {
        setError(true);
        setPending(false);
      });

  }, []);

  return (
    <section>

      <PickCity onSubmit={handleCityChange} />

      {pending && <Loader />}

      {!pending && error && <ErrorBox />}

      {!pending && weather && !error && (
        <WeatherSummary weather={weather} />
      )}

    </section>
  );
};

export default WeatherBox;
