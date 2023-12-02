const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
	{
		title: { type: String, required: true },
		imageUrl: { type: String, required: true },
		content: { type: String, required: true },
		creator: { type: Object, required: true }
	},
	{ timestamps: true }
)

// creates a collection called posts in the mongodb database
module.exports = mongoose.model('Post', postSchema)
