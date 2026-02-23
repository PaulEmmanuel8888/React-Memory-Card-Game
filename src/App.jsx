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

  const initializeGame = () => {
    ///Shuffle Cards
    console.log(cardValues);

    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    console.log(finalCards);
    setCards(finalCards);
  };

  useEffect(() => {
    initializeGame();
  }, []);
  const handleCardClick = (card) => {
    //Ignore click if card is already clicked or matched
    if (card.isFlipped || card.isMatched) {
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
      const firstCard = cards[flippedCards[0]];
      if (firstCard.value === card.value) {
        alert("Match");
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

          setFlippedCards([]);
        }, 1000);
      }
    }
  };
  return (
    <div className="app">
      <GameHeader score={3} moves={10} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
