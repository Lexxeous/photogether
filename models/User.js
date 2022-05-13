"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// Decimal128
// Map
// Schema

const userSchema = new Schema({
	first_name: {type: String},
	last_name: {type: String},
	username: {type: String},
	email: {type: String},
	address: {type: String},
	state: {type: String},
	account_type: {type: String},
	phone: {type: Number},
	age: {type: Number},
	gender: {type: String},
	password: {type: String},
	rating: {type: Number},
	rating_reviews: {type: Array},
}, {timestamps: true}); // automatically handle created_at and updated_at columns

const User = mongoose.model("User", userSchema);
module.exports = User;