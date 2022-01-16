import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const player = new Schema({
	name: {
		type: String,
		required: true
	}
})

const schema = new Schema({
	gameId: {
		type: String,
		required: true
	},
	dateCreate: {
		type: Date,
		required: true
	},
	playerOne: {
		type: player,
		required: true
	},
	playerTwo: {
		type: player,
		required: true
	},
	win: {
		type: String,
		required: true
	}
})

export default model('WarshipGame', schema);