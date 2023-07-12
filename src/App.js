import { useState, useEffect, useCallback, useRef } from 'react';
import bender1 from './bender1.gif';
import bender2 from './bender2.gif';
import './App.css';
import SingleCard from './components/SingleCard';
import Timer from './components/Timer';
import Result from './components/Result';
 
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
  const [length, setLength] = useState(0)
  const grid = useRef()

  // remove cards from dom if player finds all 6 matches
  if (length === 6 && isPlaying) {
    grid.current.innerHTML = ""
  }

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
 
  // fire useEffect to count everytime a match is found
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setLength(prevLength => prevLength + 1)
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

  const startGame = useCallback(() => {
    window.location.pathname = './astro-memory'
  }, [])

  useEffect(() => {
   shufffleCards()
  }, [startGame])

  return (
    <div className='App'>
      <h1>Astro Match</h1>
      <button onClick={startGame}>New Game</button>

      {showTimer && <Timer seconds={60} endGame={endGame} length={length} />}
      {isPlaying && <div className='card-grid' ref={grid}>
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
      
      {!isPlaying ? <Result src={bender2} alt="sad bender" /> : <Result src={bender1} alt="happy bender" length={length} /> }

      {isPlaying && <div className="freepik credits">
        <p>Image by <a href="https://www.freepik.com/free-vector/gradient-galaxy-background_14658063.htm#query=purple%20cartoon%20space%20background&position=32&from_view=search&track=ais">Freepik</a></p> 
        <p className="credit">Image by <a href="https://www.freepik.com/free-vector/cute-astronaut-dabbing-cartoon-icon-illustration-space-science-icon-isolated-flat-cartoon-style_13851647.htm#&position=1&from_view=collections">catalyststuff</a> on Freepik</p>
      </div>}
    
      <p>Turns: {turns}</p> 
    </div>
  );
}


export default App;


