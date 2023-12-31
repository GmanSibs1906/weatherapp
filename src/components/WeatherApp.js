import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { FaCloudSun } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { RiMistFill } from "react-icons/ri";
import { BsSunriseFill } from "react-icons/bs";
import { FaCloudSunRain } from "react-icons/fa";
import { BsCloudSunFill } from "react-icons/bs";
import { BsSnow } from "react-icons/bs";

import clouds from "./images/cloudy.png";
import extreme from "./images/extreme.jpg";
import rain from "./images/rain.jpg";
import clearsky from "./images/clear sky.jpg";
import Mist from "./images/Mist.jpg";
import snow from "./images/snow.jpg";

import Moment from "moment";

function WeatherApp() {
  const madate = Moment().format("h:mma - dddd MMM D");
  const [term, setTerm] = useState("");
  const searchTimeoutRef = useRef(null);
  const [weather, setWeather] = useState("");
  const [unit, setunit] = useState("metric");
  const [loading, setisloading] = useState(true);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${term}&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`;


  function fetchdata() {
    if (!term) {
      console.error("Empty term. Cannot make API request.");
      return;
    }
  
    // Debounce the API request to prevent excessive calls
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  
    searchTimeoutRef.current = setTimeout(() => {
      axios.get(url)
      .then((response) => {
        setWeather(response.data);
        setisloading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, you might want to set an error state or display a message to the user
      });
    
    }, 500); // Set a delay of 500 milliseconds
  }
  
  
  useEffect(() => {
    // Check if the term is not empty before making the API request
    if (term.trim() !== "") {
      fetchdata();
    }
  }, [term, unit]);


  function SearchLocation(e) {
    e.preventDefault();

    if (term.trim() === "") {
      console.error("Empty term. Cannot make API request.");
      return;
    }
// 
    // Clear any existing timeout to debounce the API request
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set a new timeout to make the API request after a short delay
    searchTimeoutRef.current = setTimeout(() => {
      fetchdata();
    }, 500);
  }

  function Clickedunit() {
    setunit(unit === "metric" ? "imperial" : "metric");
  }
  console.log(weather);
  return (
    <>
      <div className="w-full tablet:absolute tablet:h-[129%] phone:h-[170%] bg-primary h-screen">
        {(() => {
          if (!loading && weather.weather[0].main === "Clouds") {
            return (
              <img
                className=" object-cover tablet:opacity-50 opacity-50 w-full h-full"
                src={clouds}
                alt=""
              />
            );
          } else if (loading) {
            return (
              <img
                className="object-cover tablet:opacity-50 opacity-50 w-full h-full"
                src={clouds}
                alt=""
              />
            );
          } else if (!loading && weather.weather[0].main === "Clear") {
            return (
              <img
                className="object-cover tablet:opacity-50 opacity-50 w-full h-full"
                src={clearsky}
                alt=""
              />
            );
          } else if (!loading && weather.weather[0].main === "Rain") {
            return (
              <img
                className=" object-cover tablet:opacity-50 opacity-50 w-full h-full"
                src={rain}
                alt=""
              />
            );
          } else if (!loading && weather.weather[0].main === "Extreme") {
            return (
              <img
                className=" object-cover tablet:opacity-50 opacity-50 w-full h-full"
                src={extreme}
                alt=""
              />
            );
          } else if (!loading && weather.weather[0].main === "Mist") {
            return (
              <img
                className=" object-cover tablet:opacity-50 opacity-50 w-full h-full"
                src={Mist}
                alt=""
              />
            );
          } else if (!loading && weather.weather[0].main === "Snow") {
            return (
              <img
                className=" object-cover tablet:opacity-50 opacity-50 w-full h-full"
                src={snow}
                alt=""
              />
            );
          }
        })()}
      </div>
      
      <div className="grid text-white grid-cols-7 tablet:grid-cols-3 capitalize font-body h-[100%] w-[100%] left-0 top-0 fixed tablet:relative">
        <div className=" col-span-4 phone:justify-center phone:my-0 phone:mx-0 tablet:col-span-0 py-8 ">
          <h1 className="flex justify-center sm:justify-start items-center sm:items-start sm:px-[60px] phone:mb-[200px] tablet:flex tablet:flex-col mt-0 text-2xl">
            The Weather
          </h1>
          <div className="flex mb-10 gap-x-6 mt-[-50%] items-center phone:justify-center phone:flex-wrap py-[550px] tablet:py-[0]  px-[60px]">
            <div className="cursor-pointer">
              {(() => {
                if (unit === "metric" && weather.main) {
                  return (
                    <h2
                      onClick={Clickedunit}
                      className="text-[130px] relative phone:text-[100px] m-0"
                    >
                      {weather.main.temp.toFixed()}°
                      <small className="text-[30px] phone:bottom-[90px]  absolute bottom-[110px]">
                        C
                      </small>
                    </h2>
                  );
                } else if (unit === "imperial" && weather.main) {
                  return (
                    <h2
                      onClick={Clickedunit}
                      className="text-[130px]  relative phone:text-[100px] m-0"
                    >
                      {weather.main.temp.toFixed()}°
                      <small className="text-[30px] absolute phone:bottom-[90px] bottom-[110px]">
                        F
                      </small>
                    </h2>
                  );
                } else {
                  return (
                    <h2 className="text-[130px] phone:text-[100px] m-0">15°</h2>
                  );
                }
              })()}
            </div>




            <div className="flex justify-center gap-x-6 phone:flex-wrap  ">
              <div className="pl-10 phone:pl-0 justify-center">
                {weather.name ? (
                  <h2 className="text-[40px] flex justify-center">
                    {weather.name}
                  </h2>
                ) : (
                  <h2 className="text-[50px] flex justify-center items center">
                    Johannesburg
                  </h2>
                )}
                <div className="flex justify-center items-center text-center">
                  <h2>{madate}</h2>
                </div>
              </div>
              <div className="flex flex-col relative justify-center items-center pl-10 phone:pl-0 tablet:ml-8 phone:ml-0 text-center">
                {(() => {
                  if (!loading && weather.weather[0].main === "Mist") {
                    return (
                      <RiMistFill className="absolute top-[30px] tablet:top-[33px] text-2xl block justify-center items-center" />
                    );
                  } else if (!loading && weather.weather[0].main === "Clear") {
                    return (
                      <BsSunriseFill className="text-yellow-500 absolute top-[34px] tablet:top-[33px] text-2xl block justify-center items-center " />
                    );
                  } else if (loading) {
                    return (
                      <BsSunriseFill className="text-yellow-500 absolute top-[34px] tablet:top-[33px] text-2xl block justify-center items-center " />
                    );
                  } else if (!loading && weather.weather[0].main === "Clouds") {
                    return (
                      <BsCloudSunFill className="text-yellow-500 absolute top-[34px] tablet:top-[33px] text-2xl block justify-center items-center " />
                    );
                  } else if (!loading && weather.weather[0].main === "Rain") {
                    return (
                      <FaCloudSunRain className="text-blue-500 absolute top-[34px] tablet:top-[33px] text-2xl block justify-center items-center " />
                    );
                  } else if (!loading && weather.weather[0].main === "Snow") {
                    return (
                      <BsSnow className="text-blue-200 absolute top-[34px] tablet:top-[33px] text-2xl block justify-center items-center " />
                    );
                  }
                })()}

                {weather.weather ? (
                  <h1 className="mt-[73px] tablet:mt-[70px]">
                    {weather.weather[0].description}
                  </h1>
                ) : (
                  <h1 className="mt-[73px] tablet:mt-[70px]">Clouds</h1>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col phone:px-0 px-16 py-[0px]  backdrop-blur-lg
          border-t-2 border-white border-opacity-10 
         col-span-3
         tablet:col-span-4
        "
        >
          <div className="">
            <form className="w-[100%] h-[100%]" onSubmit={SearchLocation}>
              <input
                className="px-10 py-8  placeholder:text-white placeholder:space-x-80 bg-transparent outline-none text-white w-[100%] h-[114%] border-b-2 border-primary "
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search Location..."
              />
              <button
                className=" absolute top-0 right-0 cursor-pointer text-white bg-primary text-2xl p-10"
                type="submit"
              >
                <BsSearch />
              </button>
            </form>
          </div>
          
          <div className="pt-16  phone:px-10  flex flex-col">
            <hr className=" " />
            <h1 className="pt-16 font-bold text-2xl">Weather Details</h1>
            <div className="flex flex-col">
              <ul className="flex justify-between mt-12">
                <li>Cloudy </li>
                {weather.clouds ? (
                  <li>{weather.clouds.all}%</li>
                ) : (
                  <li>100%</li>
                )}
              </ul>
              <ul className="flex justify-between  mt-12">
                <li>humidity </li>
                {weather.main ? (
                  <li>{weather.main.humidity}%</li>
                ) : (
                  <li>59%</li>
                )}
              </ul>
              <ul className="flex justify-between mt-12">
                <li>wind </li>
                {weather.wind ? (
                  <li>{weather.wind.speed}km/h</li>
                ) : (
                  <li>437km/h</li>
                )}
              </ul>
            </div>
            <hr className=" mt-16  phone:px-10" />
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherApp;
