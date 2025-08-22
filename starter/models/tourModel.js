const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    min: [1, 'Price must be above 0'],
    max: [10000, 'Price must be below 10000']
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;