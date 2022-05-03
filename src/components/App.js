//Fichero App.js

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// api
import getWordFromApi from "../services/api";
// styles
import "../styles/App.scss";
import "../styles/Dummy.scss";
import "../styles/Letters.scss";
import "../styles/Form.scss";
import "../styles/Header.scss";

//components
import Header from "../components/Header";
import Dummy from "./Dummy";
import SolutionLetters from "./SolutionLetters";
import ErrorLetters from "./ErrorLetters";
import Form from "./Form";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Options from "./Options";

function App() {
  const [word, setWord] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState("");
  // const maxNumberOfErrors = 13;

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

  const handleChange = (inputLetter) => {
    let re = /[a-zA-Z]/; //add regular pattern - lesson 3.3 exercise 2
    if (re.test(inputLetter)) {
      handleLastLetter(inputLetter);
    }
  };

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const renderSolutionLetters = () => {
    const wordLetters = word.split("");
    return wordLetters.map((letter, index) => {
      const exists = userLetters.includes(letter.toLocaleLowerCase());
      return (
        <li key={index} className="letter">
          {exists ? letter : ""}
        </li>
      );
    });
  };

  const renderErrorLetters = () => {
    const errorLetters = userLetters.filter(
      (letter) =>
        word.toLocaleLowerCase().includes(letter.toLocaleLowerCase()) === false
    );
    return errorLetters.map((letter, index) => {
      return (
        <li key={index} className="letter">
          {letter}
        </li>
      );
    });
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    userLetters.push(value);
    setUserLetters([...userLetters]);
  };

  return (
    <div className="page">
      <Header text="Juego del ahorcado" className="header__title" />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <SolutionLetters
                  renderSolutionLetters={renderSolutionLetters()}
                />
                <ErrorLetters renderErrorLetters={renderErrorLetters()} />
                <Form lastLetter={lastLetter} handleChange={handleChange} />
              </section>
            }
          ></Route>
          <Route path="/instructions" element={<Instructions />}></Route>
          <Route path="/options" element={<Options />}></Route>
          <Route
            path="/"
            element={<Dummy getNumberOfErrors={getNumberOfErrors()} />}
          ></Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
