var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema(
{
	name: String,
	email: String,
	phone: String,
	password: String,
	_subleases: [{type: Schema.Types.ObjectId, ref: 'Sublease'}],
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

mongoose.model('User', UserSchema);