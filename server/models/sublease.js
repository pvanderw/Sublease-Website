var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SubleaseSchema = new mongoose.Schema(
{
	_user: {type: Schema.ObjectId, ref: 'User'},
	num_rooms: Number,
	num_bathrooms: Number,
	address: String,
	price: Number,
	start_date: {type: Date},
	end_date: {type: Date},
	description: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

mongoose.model('Sublease', SubleaseSchema);