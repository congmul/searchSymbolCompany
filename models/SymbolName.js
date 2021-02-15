const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const symbolNameSchema = new Schema({
    "Company Name": { type: String, required: true },
    "Financial Status": { type: String, required: false },
    "Market Category": { type: String, required: false },
    "Round Lot Size": { type: String, required: false },
    "Security Name": { type: String, required: false },
    "Symbol": { type: String, required: true },
});

const Book = mongoose.model("SymbolName", symbolNameSchema);

module.exports = Book;