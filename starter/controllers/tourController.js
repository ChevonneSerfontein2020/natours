const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// GET request to fetch all tours
exports. getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

// GET request to fetch tour by ID
exports. getTour = (req, res) => {
  const id = req.params.id * 1; // convert string to number
  const tour = tours.find(el => el.id === id);

  if (id > tours.length || id < 1 || !tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour // return the single tour
    }
  });
};

// POST request to create a new tour
exports. createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

// PATCH request to update a tour by ID
exports. updateTour = (req, res) => {
  const id = req.params.id * 1; // convert string to number
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  // Update the tour with new data from req.body
  Object.assign(tour, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

// DELETE request to delete a tour by ID
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex(el => el.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  tours.splice(tourIndex, 1);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(204).json({
        status: 'success',
        data: null
      });
    }
  );
};