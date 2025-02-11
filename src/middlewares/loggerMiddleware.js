import moment from "moment"; // Import moment to format the time (optional)

const logRequestDuration = (req, res, next) => {
  const startTime = Date.now(); // Start time of the request

  // Log the request method and URL
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${req.method} ${
      req.originalUrl
    } - Started`
  );

  // Capture the end time after the response is sent
  res.on("finish", () => {
    const endTime = Date.now(); // End time of the request
    const duration = endTime - startTime; // Duration in milliseconds

    // Log the method, URL, status code, and duration
    console.log(
      `[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${req.method} ${
        req.originalUrl
      } - ${res.statusCode} - Duration: ${duration}ms`
    );
  });

  next(); // Pass the request to the next middleware or route handler
};

export default logRequestDuration;
