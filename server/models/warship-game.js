import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const player = new Schema({
	name: {
		type: String,
		required: true
	}
})

const schema = new Schema({
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
})

export default model('WarshipGame', schema);