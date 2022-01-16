function convertToDoubleDimension(floatMatrix, size) {
	const result = [];
	for (let i = 0; i < size; i++) {
		const row = [];
		for (let j = 0; j < size; j++) {
			row.push(Number(floatMatrix[i * size + j]));
		}
		result.push(row);
	}
	return result;
}

export { convertToDoubleDimension };