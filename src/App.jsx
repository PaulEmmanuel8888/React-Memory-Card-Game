import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader";

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  //Function for shuffling the cards
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    ///Shuffle Cards
    const shuffled = shuffleArray(cardValues);

    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);

    //Reset score and moves
    setScore(0);
    setMoves(0);
    setIsLocked(false);
    setMatchedCards([]);
    setFlippedCards([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);
  const handleCardClick = (card) => {
    //Ignore click if card is already clicked or matched

    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    ) {
      return;
    }

    //Else, update card flipped state
    const newCards = cards.map((c) => {
      if (c.id == card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    //Checking for match when two cards are flipped
    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];
      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 1);
          //For setting the isMatched boolean

          setCards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            }),
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        //Flip back both cards

        setTimeout(() => {
          const flippedBackCards = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });

          setCards(flippedBackCards);
          setIsLocked(false);
          setFlippedCards([]);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  };
  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
