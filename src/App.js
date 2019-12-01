import React, { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, logIn, logOut } from "./actions";
import { validateLogin } from "./fakeApi";

function App() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);

  const [inputs, setInputs] = useState({
    counter: 0,
    login: "",
    password: ""
  });

  const [modal, setModal] = useState({
    visible: false,
    text: "Text"
  });

  const handleClick = (type, number) => {
    const nr = parseInt(number);
    if (type === "+") {
      dispatch(increment(nr));
    }
    if (type === "-") {
      dispatch(decrement(nr));
    }
  };

  const handleInput = (type, e) => {
    setInputs({
      ...inputs,
      [type]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validated = validateLogin(inputs.login, inputs.password);
    if (validated) {
      dispatch(logIn());
      if (modal.visible) handleModal("close");
    } else {
      handleModal("show", "Your login or password are incorrect");
    }
    setInputs({
      ...inputs,
      login: "",
      password: ""
    });
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleModal = (type, text = "Some error") => {
    if (type === "close") {
      setModal({
        ...modal,
        visible: false
      });
    } else if (type === "show") {
      setModal({
        text,
        visible: true
      });
    }
  };

  return (
    <div className="App">
      {modal.visible && (
        <div>
          {modal.text}
          <br />
          <button onClick={() => handleModal("close")}>Close</button>
        </div>
      )}
      <h1>Counter: {counter}</h1>
      <button onClick={() => handleClick("-", inputs.counter)}>-</button>
      <input
        type="number"
        onChange={e => handleInput("counter", e)}
        value={inputs.counter}
      />
      <button onClick={() => handleClick("+", inputs.counter)}>+</button>
      {isLogged ? (
        <div>
          Logged <button onClick={() => handleLogOut()}>Wyloguj</button>
        </div>
      ) : (
        <div>
          Not logged
          <form>
            <label>
              Login
              <input
                type="text"
                value={inputs.login}
                onChange={e => handleInput("login", e)}
              />
            </label>
            <br />
            <label>
              Password
              <input
                type="password"
                value={inputs.password}
                onChange={e => handleInput("password", e)}
              />
            </label>
            <br />
            <input type="submit" onClick={e => handleSubmit(e)} />
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
