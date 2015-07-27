var mongoose = require('mongoose');
// create our friendSchema
var UserSchema = new mongoose.Schema(
{
	name: String,
	email: String,
	phone: Number,
	password: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});
// use the schema to create the model
// Note that creating a model CREATES the collection in the database (makes the collection plural)
mongoose.model('User', UserSchema);