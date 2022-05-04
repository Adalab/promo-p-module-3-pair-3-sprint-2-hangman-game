//Fichero App.js
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// api
import getWordFromApi from "../services/api";
// styles
import "../styles/App.scss";

//components
import Header from "../components/Header";
import Dummy from "./Dummy";
import SolutionLetters from "./SolutionLetters";
import ErrorLetters from "./ErrorLetters";
import Form from "./Form";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Options from "./Options";
import Loading from "../components/Loading";

function App() {
  const [word, setWord] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const maxNumberOfErrors = 13;

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
      setIsLoading(false);
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

  const handleChangeLetter = (value) => {
    setWord(value);
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
                <Loading />
                <SolutionLetters
                  renderSolutionLetters={renderSolutionLetters()}
                />
                <ErrorLetters renderErrorLetters={renderErrorLetters()} />
                <Form lastLetter={lastLetter} handleChange={handleChange} />

                <Dummy getNumberOfErrors={getNumberOfErrors()} />
              </section>
            }
          ></Route>
          <Route path="/instructions" element={<Instructions />}></Route>
          <Route
            path="/options"
            element={<Options handleChangeLetter={handleChangeLetter} />}
          ></Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
