const urlApi = "http://127.0.0.1:3000/warship-game/";

const getData = async (url, params) => {
  const res = await fetch(url, params);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  const json = await res.json();
  if (json.success === true) {
    return json;
  } else {
    throw new Error(res.statusText);
  }
};

export const startGame = async (name, matrix) => {
  const url = urlApi + "connect";
  const result = await getData(url, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      name: name,
      matrix: matrix,
    }),
  });
  return result;
};
