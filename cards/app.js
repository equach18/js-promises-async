const baseURL = "http://deckofcardsapi.com/api/deck";

// 1. Make a request to the [Deck of Cards API](http://deckofcardsapi.com/) to request a single card from a newly shuffled deck. Once you have the card, ***console.log*** the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
async function getCard() {
  let res = await axios.get(`${baseURL}/new/draw/?count=1`);
  let card = res.data.cards[0];
  console.log(`${card.value} of ${card.suit.toLowerCase()}`);
}
getCard();

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.
//     Once you have both cards, ***console.log*** the values and suits of both cards.
async function getTwoCards() {
  // draw first card
  let res1 = await axios.get(`${baseURL}/new/draw/?count=1`);
  const deckId = res1.data.deck_id;
  //   draw second card
  let res2 = await axios.get(`${baseURL}/${deckId}/draw/?count=1`);
  //   log each card/suit
  [res1.data, res2.data].forEach((card) => {
    let { suit, value } = card.cards[0];
    console.log(`${value} of ${suit.toLowerCase()}`);
  });
}
getTwoCards();

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

class CardDeck {
  constructor() {
    this.deckId = null;
  }
  async newDeck() {
    let res = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
    this.deckId = res.data.deck_id;
    console.log(this.deckId);
  }
  async drawCard() {
    let res = await axios.get(`${baseURL}/${this.deckId}/draw/?count=1`);
    if (res.data.remaining == 0) {
      $("button").remove();
    }
    const cardPng = res.data.cards[0].image;
    const randomDeg = Math.floor(Math.random() * 361);
    const randomX = Math.floor(Math.random() * 30 - 15);
    const randomY = Math.floor(Math.random() * 30 - 15);
    //   add img to the container
    let img = $("<img>", {
      src: cardPng,
      css: {
        transform: `translate(${randomX}px, ${randomY}px) rotate(${randomDeg}deg)`,
      },
    });
    $("#card-container").append(img);
  }
}

let cards = new CardDeck();
cards.newDeck();

// when the dom is ready, add an event listener for the button to draw a new card
$(document).ready(function () {
  $("button").on("click", () => {
    cards.drawCard();
  });
});
