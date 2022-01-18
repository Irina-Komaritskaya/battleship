const urlApi = "http://127.0.0.1:3000/warship-game/";

const getData = async (url, params) => {
  const res = await fetch(url, params);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  const json = await res.json();
  console.log(json);
  if (json.success === true) {
    return json;
  } else {
    throw new Error(json.error);
  }
};

export const startGame = async (name, matrix) => {
  const url = urlApi + "connect";
  const result = await getData(url, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      player: {
           name,
           matrix
        }
    }),
  });
  return result;
};

export const searchOpponent = async (name) => {
  const url = urlApi + "start";
  const result = await getData(url, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      player: {
           name
        }
    }),
  });
  return result;
};

export const attack = async (name, row, column, gameId) => {
  const url = urlApi + "attack";
  const result = await getData(url, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      gameId: gameId,
      player: {
           name
        },
        column,
        row
    }),
  });
  return result;
};

export const getLastStep = async (gameId) => {
  const url = urlApi + "step-last";
  const result = await getData(url, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      gameId: gameId
    }),
  });
  return result;
};

export const endGame = async (gameId, name) => {
  const url = urlApi + "end";
  const result = await getData(url, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      gameId: gameId,
      player:{
        name
      }
    }),
  });
  return result;
};