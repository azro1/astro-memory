import { useState, useEffect } from 'react';
import gif from './giphy.gif';
import './App.css';
import SingleCard from './components/SingleCard';
import Timer from './components/Timer';
import Gameover from './components/Gameover';
 
const cardImages = [
  { src: './images/astro1.png', matched: false },
  { src: './images/astro2.png', matched: false },
  { src: './images/astro3.png', matched: false },
  { src: './images/astro4.png', matched: false },
  { src: './images/astro5.png', matched: false },
  { src: './images/astro6.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [showTimer, setShowTimer] = useState(false)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)


  // end the game
  const endGame = () => {
     setIsPlaying(false)
     setDisabled(true)
  }

  // shuffle cards
  const shufffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

      // reset choices when we start a new game
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
      setShowTimer(true)
  }

  // handle a choice
  const handleChoice = (card) => {
     choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compare 2 selected cards using useEffect
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    } 
  }, [choiceOne, choiceTwo])

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a game automatically
  useEffect(() => {
    shufffleCards()
  }, [])


  return (
    <div className='App'>
      <h1>Astro Match</h1>
      <button onClick={shufffleCards}>New Game</button>

      {showTimer && <Timer seconds={60} endGame={endGame} />}
      {isPlaying && <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            key={card.id}
            disabled={disabled}
          />
        ))}
      </div>}
      {!isPlaying && <Gameover src={gif} alt="game over image" />}

      {isPlaying && <div className="freepik credits">
        <span>Image by <a href="https://www.freepik.com/free-vector/gradient-galaxy-background_14658063.htm#query=purple%20cartoon%20space%20background&position=32&from_view=search&track=ais">Freepik</a></span> 
        <span className="credit">Image by<a href="https://www.freepik.com/free-vector/cute-astronaut-dabbing-cartoon-icon-illustration-space-science-icon-isolated-flat-cartoon-style_13851647.htm#&position=1&from_view=collections">catalyststuff</a> on Freepik</span>
      </div>}
    
      <p>Turns: {turns}</p> 
    </div>
  );
}




export default App;