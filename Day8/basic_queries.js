
// Retrieve all readings for a specific meter
db.Energy_readings.find({ meterId: "MTR001" }).sort({ timestamp: 1 });

// Find readings between two timestamps
db.Energy_readings.find({
  timestamp: { 
    $gte: ISODate("2025-10-29T10:00:00Z"), 
    $lte: ISODate("2025-10-29T15:00:00Z") 
  }
});

// Total energy consumption per meter
db.Energy_readings.aggregate([
  { $group: { _id: "$meterId", totalEnergy_kWh: { $sum: "$energy_kWh" } } }
]);


// Average temperature by location
db.Energy_readings.aggregate([
  { $group: { _id: "$location", avgTemperature_C: { $avg: "$temperature_C" } } },
  { $sort: { avgTemperature_C: -1 } }
]);

// Hourly energy consumption trend
db.Energy_readings.aggregate([
  {
    $addFields: {
      hourBucket: {
        $dateTrunc: { date: "$timestamp", unit: "hour", timezone: "UTC" }
      }
    }
  },
  {
    $group: {
      _id: { meterId: "$meterId", hour: "$hourBucket" },
      hourlyEnergy_kWh: { $sum: "$energy_kWh" }
    }
  },
  { $sort: { "_id.meterId": 1, "_id.hour": 1 } }
]);

// Detecting high usage hours (>6 kWh)
db.Energy_readings.aggregate([
  { $match: { energy_kWh: { $gt: 6 } } },
  { $project: { meterId: 1, energy_kWh: 1, timestamp: 1 } }
]);


// Create index on timestamp
db.Energy_readings.createIndex({ timestamp: 1 });

// Compound index on meterId + timestamp
db.Energy_readings.createIndex({ meterId: 1, timestamp: 1 });
