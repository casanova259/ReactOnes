import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StarRating from './components/StarRating.jsx'
import App from './App.jsx'


// function Test(){

//   const [movieRating,setmovieRating]=useState(0);
//   return <div>
//     <StarRating maxRating={10} color='blue' defaultRating={1} onSetRating={setmovieRating}/>
//     <h1>THis Movie has been rated {movieRating}</h1>
//   </div>
// }
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <StarRating /> */}
    {/* <StarRating maxRating={5} color='red' message={["chutiya","ghatiya","thik thak","aAcha","maal"]}/>
    <StarRating maxRating={10} />
    <Test/> */}
    <App/>
  </StrictMode>,
)
