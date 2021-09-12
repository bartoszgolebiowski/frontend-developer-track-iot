const counterSlice = RTK.createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementExtra: (state, action) => {
      state.value += action.payload;
    },
  },
});
const { increment, decrement, incrementExtra } = counterSlice.actions;

const fetchRandomNumber = RTK.createAsyncThunk(
  "number/fetchRandomNumber",
  async (_, thunkAPI) => {
    const response = await fetch(
      "https://www.random.org/integers/?num=1&min=0&max=1000&col=1&base=10&format=plain&rnd=new"
    ).then((res) => res.text());
    return response;
  }
);

const numberSlice = RTK.createSlice({
  name: "number",
  initialState: { number: 0, status: "idle" },
  reducers: {},
  extraReducers: {
    [fetchRandomNumber.rejected]: (state, action) => {
      state.status = "error";
    },
    [fetchRandomNumber.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchRandomNumber.fulfilled]: (state, action) => {
      state.status = "idle";
      state.number = action.payload;
    },
  },
});

const store = RTK.configureStore({
  reducer: {
    counter: counterSlice.reducer,
    number: numberSlice.reducer,
  },
});

const dispatch = store.dispatch;

const valueEl = document.getElementById("value");
const valueNumber = document.getElementById("number");

const render = () => {
  valueEl.innerHTML = store.getState().counter.value.toString();
};

const renderNumber = () => {
  const number = store.getState().number.number.toString();
  const status = store.getState().number.status;
  if (status === "loading") valueNumber.innerHTML = "Loading...";
  if (status === "error") valueNumber.innerHTML = "Error...";
  if (status === "idle") valueNumber.innerHTML = number;
};

store.subscribe(render);
store.subscribe(renderNumber);

document.getElementById("increment").addEventListener("click", () => {
  dispatch(increment());
});

document.getElementById("decrement").addEventListener("click", () => {
  dispatch(decrement());
});

document.getElementById("increment5").addEventListener("click", () => {
  dispatch(incrementExtra(5));
});

document.getElementById("incrementAsync").addEventListener("click", () => {
  setTimeout(() => {
    store.dispatch(increment());
  }, 1000);
});

document.getElementById("refetchNumber").addEventListener("click", () => {
  dispatch(fetchRandomNumber());
});
