var mongoose = require("mongoose");
var User = mongoose.model("User");
var Sublease = mongoose.model("Sublease");

module.exports = (function()
{
	return {

		show: function(req, res)
		{
			Sublease.find({}).populate('_user').exec(function(err, results)
			{
				if (err)
				{
					console.log("Error occurred while retrieving sublease");
				}
				else
				{
					res.json(results);
				}
			});
		},

		addSublease: function(req,res)
		{
			// console.log("Sublease: ", req.body);
			new_sublease = new Sublease(
				{
					_user: req.body.author_info._id,
					num_rooms: req.body.sublease_info.num_rooms, 
					num_bathrooms: req.body.sublease_info.num_bathrooms, 
					address: req.body.sublease_info.address, 
					price: req.body.sublease_info.price, 
					start_date: req.body.sublease_info.start_date, 
					end_date: req.body.sublease_info.end_date,
					description: req.body.sublease_info.description
				});

			new_sublease.save(function(err)
			{
				if (err)
				{
					console.log("Error occurred while adding sublease to database");
				}
				else
				{
					console.log("Sublease successfully added to database");
					res.json(true);
				}

			});
		}
	}
})();