import { useState } from "react";

const initialFriends = [
  //this is where our friend list lives
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>
}

export default function App() {

  // poroblem is to on and off the display of the Form to add a friend
  //so it's a change in the ui so we make a state
  const [showAddFriend, setShowAddFriend] = useState(false);

  //add krne ke liye state banai kyunki set it to initial friend array
  const [friends, setFriends] = useState(initialFriends)

  //select friend:first of all we create a state and then an handler then yuse that ahndler then pass it to the compoent below
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShowAddFriend() {
    // {when user clicks on the button it make the value of show add friend as true so the form appears}
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    //this creates a new array using spread operator we open the aaray and add friend object
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitbill(value){
    setFriends(friends=>friends.map(friend=>friend.id===selectedFriend.id ? {...friends,balance:friend.balance+value}:friend))

    setSelectedFriend(null);
  }

  return <div className="app">
    <div className="sidebar">
      {/* this is ou friend List component */}
      <FriendList
        selectedFriend={selectedFriend}
        friends={friends}
        onSelection={handleSelection}
      />
      {/* now here we have to conditionally render that form */}
      {/* {yaha apan us fucntion ko pass krdiye onadd friend m} */}
      {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
      {/* ye button jo add friend ka tha ispe we made a onclick funciton  */}
      <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
      {/* so yaha basically what we r doing is changing the text of the button */}
    </div>
    {selectedFriend && 
    <FormSplitBill 
    key={selectedFriend.id}
    selectedFriend={selectedFriend} 
    onSplitBill={handleSplitbill}
    />}
  </div>
}


function FriendList({ friends, onSelection, selectedFriend }) {
  return <ul>
    {/* basically what we r doing is to render each friend as an element */}
    {friends.map((friend) => {
      return (<Friend
        onSelection={onSelection}
        friend={friend}
        //this is known as prop drilling when an component doesnt need the prop all it does to pass the prop to it's child component we call it prop drilling
        selectedFriend={selectedFriend}
        key={friend.id}
      />)
    })}

  </ul>
}

//We have to make another component for friend
function Friend({ friend, onSelection, selectedFriend }) {


  const isSelected = selectedFriend?.id === friend.id;
  // this is the single friend component
  return <li className={isSelected ? "selected" : ""}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>

    {/* this is basically conditional rendering jisme hum balance ko check krke conditionally render kr rhe h */}
    {friend.balance < 0 && (<p className="red">You Owe {friend.name} {Math.abs(friend.balance)}</p>)}
    {friend.balance > 0 && (<p className="red">{friend.name} Owes You {Math.abs(friend.balance)}</p>)}
    {friend.balance === 0 && (<p>You and {friend.name} are Even </p>)}

    <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
  </li>
}



function FormAddFriend({ onAddFriend }) {
  //here are our two state variable which we made to link to our
  //input field elements
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    //iske andr sbse pehle default reload htaya
    e.preventDefault();

    if (!name || !image) return;
    //thius is a gard condiiton whcih basically doesn't let form submitted if any of them is empty
    const id = crypto.randomUUID();
    //nya friend ka object banaya
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    //jo aaya huya fucntion h na usme obj pass krdo
    onAddFriend(newFriend)

    //after submitting set the state as intial it was
    setName("");
    setImage("https://i.pravatar.cc/48")
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="">🧑‍🤝‍🧑Friend name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="">🖼️Image URL</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

      <Button>Add</Button>
    </form>)
}

function FormSplitBill({ selectedFriend ,onSplitBill }) {

  //now making the controlled elements for the state
  const [bill, setBill] = useState("");
  const [paidByUser, setpaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoisPaying] = useState("user");


  function handleSubmit(e){
    e.preventDefault();

    if(!bill ||!paidByUser) return ;

    onSplitBill(whoIsPaying=='user'?paidByFriend:-paidByUser);

    //split the bill
  }
  return <form action="" className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Split a Bill With {selectedFriend.name} </h2>
    <label htmlFor="">💰 Bill Value</label>
    <input
      value={bill}
      onChange={(e) => setBill(Number(e.target.value))}
      type="text"
    />
    <label htmlFor="">💰 Your Expense</label>
    <input
      value={paidByUser}
      onChange={(e) => setpaidByUser(Number(e.target.value)>bill ? paidByUser:Number(e.target.value))}
      type="text"
    />
    <label htmlFor="">💰 {selectedFriend.name}'s Expense</label>
    <input
      value={paidByFriend}
      type="text"
      disabled
    />

    <label htmlFor="">Who Is paying the bill</label>
    <select 
    value={whoIsPaying}
    onChange={(e) => setWhoisPaying(e.target.value)}
    >
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>


    <Button>Split Bill</Button>
  </form>
}

/*
Lec 6:add a new friend

1.add kaha hoga add hoga friendformadd me hna toh kyu kyunki wahi pe apne input fields h whcih is responsible for the data.So
wer mader these two states one for name and one for img
 const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  then we passed them into the input fields then uski value = state ke and onChange pe change kiya

  now when user submits the form so we made a fucntion which absically adds a FRIEND MAKES  a friend obj and add it and after that set the state to inital values

  ab friend list konsa component ui pe dikha rha h friend lsit whcih is sibling component toh X this is not psossible so we lift up the state to app whcih is mutual parent component
*/