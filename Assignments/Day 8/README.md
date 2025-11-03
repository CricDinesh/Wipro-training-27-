
Project Title

Smart Energy Monitoring using MongoDB for GreenPulse Energy

<!--Objective

The main goal of this project is to design and analyze a time-series database in MongoDB that captures real-time energy consumption readings from smart meters across multiple locations. It focuses on handling time-based data, performing aggregations, and optimizing performance using indexes.-->

<!--Project Overview

GreenPulse Energy monitors electricity usage from IoT-based smart meters installed in different buildings.
Each meter records readings every minute, including timestamp, energy consumed in kWh, and temperature in Celsius.
The data is stored in a MongoDB collection named Energy_readings.-->

<!--Steps Performed

Created a MongoDB database named GreenPulseDB.

Created a time-series collection named Energy_readings.

Inserted multiple readings from smart meters with details like meterId, location, timestamp, energy_kWh, and temperature_C.

Executed MongoDB queries and aggregations to analyze the data.-->

<!--Queries and Aggregations

Retrieve all readings for a specific meter (example meter MTR001).

Find readings between two timestamps.

Calculate total energy consumption per meter.

Find the average temperature by location.

Analyze hourly energy consumption trend.

Compare average energy usage across all meters.

Detect high usage hours where consumption exceeds 6 kWh.

Indexing and Optimization

Created an index on the timestamp field to speed up time-based queries.

Created a compound index on meterId and timestamp to improve filtering and sorting performance.-->

<!--Folder Structure

MongoDB_TimeSeries_Demo
│-- data
│ └── energy_readings.json
│-- queries
│ ├── basic_queries.js
│ ├── aggregations.js
│ ├── index_optimization.js
│-- screenshots
│ ├── Query1.png
│ ├── Query2.png
│ ├── Query3.png
│ ├── Query4.png
│ ├── Query5.png
│ ├── Query6.png
│ ├── Query7.png
│ ├── Indexes Output.png
│-- README.md-->

<!--Sample Outputs

Each query was successfully executed and verified in MongoDB Compass.
The screenshots folder contains the query results and index views for reference.

Best Practices Used

Used ISODate format for timestamps to support time-series operations.

Indexed timestamp fields for faster time-based filtering.

Used aggregation pipelines for grouped analysis and performance improvement.

Applied compound indexing for combined meter and time-based queries.-->

Conclusion

This project demonstrates how MongoDB can effectively handle time-series data for real-time monitoring of smart energy systems.
It highlights how aggregations and indexing improve query performance and help in energy trend analysis for different locations.