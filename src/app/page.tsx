"use client";

import { useState } from "react";
interface Weather {
  description: string;
  temperature: number;
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      ).then((res) => res.json());
      const weatherData = response.data;
      setWeather({
        description: weatherData.weather[0].description,
        temperature: weatherData.main.temp,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <input
          className="bg-slate-600 text-white"
          type="text"
          value={city}
          onChange={handleChange}
        />
        <button type="submit">Procurar</button>
      </form>

      {weather && (
        <div>
          <h1>Descrição: {weather.description}</h1>
          <h1>Temperatura: {weather.temperature}</h1>
        </div>
      )}
    </div>
  );
}
