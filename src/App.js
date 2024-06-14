import { useState } from "react";

const initialFriends = [
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
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showSplitForm, setShowSplitForm] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function handleAddFriendButton() {
    setShowAddFriend(!showAddFriend);
  }

  function handleAddNameButton(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      name: friendName,
      image: imageUrl,
      balance: 0,
    };

    setFriendList([...friendList, newItem]);
  }

  function handleSelect() {
    setShowSplitForm(!showSplitForm);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friendList={friendList} onClick={handleSelect} />

        {showAddFriend && (
          <FormAddFriend
            onAddNameButton={handleAddNameButton}
            friendName={friendName}
            setFriendName={setFriendName}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        )}

        <Button onClick={handleAddFriendButton}>
          {!showAddFriend ? "Add Friend" : "Close"}
        </Button>
      </div>
      {showSplitForm && <FormSplitBill />}
    </div>
  );
}

function FriendsList({ friendList, onClick }) {
  return (
    <ul>
      {friendList.map((friend) => (
        <Friend onClick={onClick} friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend, onClick }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}

      <Button onClick={onClick}>Select</Button>
    </li>
  );
}

function FormAddFriend({
  onAddNameButton,
  friendName,
  setFriendName,
  imageUrl,
  setImageUrl,
}) {
  return (
    <form className="form-add-friend" onSubmit={onAddNameButton}>
      <label>Friend name</label>
      <input
        type="text"
        placeholder="Enter friend name"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>Image URL</label>
      <input
        type="text"
        placeholder="Enter friend name"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <Button type="submit">Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>Bill value</label>
      <input type="text" />

      <label>Your expense</label>
      <input type="text" />

      <label>X's expense</label>
      <input type="text" disabled />

      <label>Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
