
import React, { useState,useEffect } from 'react';
import './index.css';
import LoctionNotFound from './LoctionNotFound';
import { TiLocation } from "react-icons/ti";
import { FaCloud, FaDroplet } from "react-icons/fa6";
import { FiWind} from "react-icons/fi";
import { TbTemperatureCelsius, TbTemperaturePlus, TbTemperatureMinus } from "react-icons/tb";
import { IoPartlySunnySharp } from "react-icons/io5";
import { BsMask,BsWikipedia } from "react-icons/bs";

const App = () => {
  const date = new Date();
  const [newcity,setnewcity] = useState(null);
const [city,setcity] = useState('india');
const [search,setsearch] = useState(null);
const [Main,setMain] = useState('');
const [Weather,setWeather] = useState('');
const [wind,setwind] = useState('');
const [sys ,setsys] = useState('');
const [icon ,seticon] = useState('');
const [isDarkModeOn,setisDarkModeOn] = useState(false);

  async function fetchdata(){
    try {
      

      let apikey = '2c7738a7a87891ca95f71d2bfb30dbb0';
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
      let respone = await fetch(url);
      let json = await  respone.json();
      setsearch(json)
      setnewcity(json.main)
      console.log(json);
      console.log(city);
      
      const {main = '_',weather:[{description,icon}]= '_' ,wind:{speed}= '_',sys= '_' } = json;
      setMain(main)  ;
      setWeather(description)  ; 
      setwind(speed)  ;
      setsys(sys);
      seticon(icon);
    } catch (error) {
      console.error('something wrong');
    }
  }

  const handeledata = (e) => {
    setcity(e.target.value);
  }
  const darkmode = () => {
    setisDarkModeOn(!isDarkModeOn);
  }
  const background = {
backgroundColor : isDarkModeOn ? ' #2f2d2d' : 'white',
color:isDarkModeOn ? 'white' : 'rgba(0, 0, 0, 0.89)'
  }
useEffect(() => {
  fetchdata();
},[city])

  return (
    <>
    <div className="_container container-fluid" style={background}>
    <nav className="navbar " style={background}>
  <div className="container-fluid">
    <span className="navbar-brand mb-0 h1"><BsWikipedia /></span>
  </div>
  <div className='search_box'>
    <input  onChange={handeledata} type="text" placeholder='Search Your Location' id='city' />
  </div>
  <div className='dark_light_mode' onClick={darkmode}>
  <BsMask />
  </div>
</nav>
<div className="main_section row-sm-6 row">

{! newcity ? (
  <LoctionNotFound/>
) :
(
  <>
  <div className="grid_box col-sm-12 col-md-6">
  <div className='content'>
  <div style={{width:'100%'}}>
<h1> <TiLocation /> {city} </h1>
  <p className='date'> {date.toDateString()} </p>
  <div>
  <img src={`http://openweathermap.org/img/w/${icon}.png`}  height="100px" width='100px'/>
</div>
  <h2> {Math.floor(Main.temp)}<TbTemperatureCelsius /> </h2>
  <p> Feels Like {Math.floor(Main.feels_like)}<TbTemperatureCelsius /> </p>
  <p> <FaCloud /> {Weather} </p>
</div>
  </div>
  </div>
  <div className="grid_box col-sm-12 col-md-6">
  <div id='content2' className='content'>
  <div className='other_data'>
  <div>
  <p style={{width:"100%", textAlign:"left", margin:"1% 10% 1% 0%"}}><FaDroplet /> <strong>Humidity</strong></p>
  <p>{Math.floor(Main.humidity)}</p>
  </div>
  <div><p style={{width:"100%", textAlign:"left", margin:"1% 10% 1% 0%"}}><TbTemperaturePlus /> <strong>Maximum Tempreture</strong></p>
  <p>{Math.floor(Main.temp_max)}</p>
  </div>

  <div><p style={{width:"100%", textAlign:"left", margin:"1% 10% 1% 0%"}}><TbTemperatureMinus /><strong>Minimum Tempreture</strong></p>
  <p>{Math.floor(Main.temp_min)}</p>
  </div>

  <div><p style={{width:"100%", textAlign:"left", margin:"1% 10% 1% 0%"}}><FiWind /><strong>Wind Speed</strong></p>
  <p>{Math.floor(wind)} m/sec</p>
  </div>
  
<div><p style={{width:"100%", textAlign:"left", margin:"1% 10% 1% 0%"}}><IoPartlySunnySharp /><strong>Sunrise</strong></p>
  <p>{Math.floor(sys.sunrise)} </p>
  </div>

  <div><p style={{width:"100%", textAlign:"left"}}><IoPartlySunnySharp /><strong>sunset</strong></p>
  <p>{Math.floor(sys.sunset)} </p>
  </div>
  </div>
  
  </div>
  </div>
  </>
)}
</div>
    </div>
    </>
  
  )
}

export default App

