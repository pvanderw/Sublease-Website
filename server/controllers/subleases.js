var mongoose = require("mongoose");
var User = mongoose.model("User");
var Sublease = mongoose.model("Sublease");

module.exports = (function()
{
	return {

		show: function(req, res)
		{
			Sublease.find({}, function(err, results)
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
		}
	}
})();