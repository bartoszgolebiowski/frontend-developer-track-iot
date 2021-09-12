import { createStore } from "https://unpkg.com/redux@4.1.0/es/redux.mjs";

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "INCREMENT_EXTRA":
      return state + action.payload.quantity;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counter);

store.subscribe(() => {
  const valueEl = document.getElementById("value");
  valueEl.innerHTML = store.getState().toString();
});

document.getElementById("increment").addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});

document.getElementById("decrement").addEventListener("click", () => {
  store.dispatch({ type: "DECREMENT" });
});

document.getElementById("increment5").addEventListener("click", () => {
  store.dispatch({
    type: "INCREMENT_EXTRA",
    payload: { quantity: 5 },
  });
});

document.getElementById("incrementAsync").addEventListener("click", () => {
  setTimeout(() => {
    store.dispatch({ type: "INCREMENT" });
  }, 1000);
});
