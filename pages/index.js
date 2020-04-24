// import { NextPage } from "next";
import cookies from "next-cookies";
import fetch from "isomorphic-unfetch";
import { useState, useContext, useEffect } from "react";
import { LocationContext } from "../components/providers/location";
import { Header, Grid, Image } from "semantic-ui-react";
import Layout from "../components/layout";
import Temp from "../components/Temp";

/**
 *
 * @type {import('next').NextPage<{API_KEY: string}>}
 */
const Home = ({ API_KEY, initialWeather }) => {
  const { lat, lon } = useContext(LocationContext);
  const [weather, setWeather] = useState(initialWeather);

  useEffect(() => {
    getWeather();
  }, [lon, lat]);

  const getWeather = async () => {
    if (lat !== Number.MAX_SAFE_INTEGER && lon !== Number.MAX_SAFE_INTEGER) {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setWeather(await data.json());
    }
  };

  return (
    <Layout title="Home">
      <Grid centered>
        <Grid.Row columns={2} divided>
          <Grid.Column textAlign="center">
            <Image
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
          </Grid.Column>
          <Grid.Column>
            <Header size="huge">{weather.weather[0].main}</Header>
            <Header size="large">{weather.weather[0].description}</Header>
            <Header size="medium">
              {weather.name}, {weather.sys.country}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Temp main={weather.main} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

Home.getInitialProps = async ctx => {
  const API_KEY = process.env.OPEN_WEATHER_API_KEY;
  const { lat, lon } = cookies(ctx);
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat ||
      0}&lon=${lon || 0}&appid=${API_KEY}`
  );
  const initialWeather = await data.json();
  return { API_KEY, initialWeather };
};

export default Home;
