import { useState } from 'react'
import BillInput from './Components/BillInput'
import Service from './Components/Service'



function App() {
  //ki when u Use state in a app component u pass it to the component that is linked
  //aur responsible h jese yaha bill ka component change ke litye resposible h
  const [bill, setBill] = useState(0);

  //banana h ek state for u and ur friend experience
  const [urexp, seturexp] = useState(0);
  const [frndexp, setfrndexp] = useState(0);

  //calculate avg 
  const avg=(urexp+frndexp)/2;
  const Tip=bill*avg/100;
  const total=bill+Tip;

  function handleReset() {
    setBill(0);
    seturexp(0);
    setfrndexp(0);
  }

  return (
    <div>
      <BillInput
        bill={bill}
        value={bill}
        onChangebill={(e) => setBill(Number(e.target.value))} // string → number
      />

      <Service
        text="How do you like the service?"
        ur_tip={urexp}
        onChangeUrTip={(e) => seturexp(Number(e.target.value))}
      />
      <Service 
      text="How does your friend like the service?" 
      ur_tip={frndexp}
      onChangeUrTip={(e)=>setfrndexp(Number(e.target.value))}
      />

      <h2>You pay: {total}$ where Bill is {bill}$ and Tip is {Tip}$ </h2>

      <button onCliczk={handleReset}>Reset</button>
    </div>)
}

export default App
