const url = ''
export const startGame = async (name, matrix) => {
    const url = url + 'orders';
    const result = await getData(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8', 
    },
      body: JSON.stringify({
        name: name, matrix: matrix
      }),
    });
    return result;
  };