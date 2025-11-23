exports.getCourses = (req, res) => {
  res.status(200).json({
    success: true,
    data: ["Node.js", "Express.js", "React.js"]
  });
};
