const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth.js");

// API Routes
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

// // If no API routes are hit, send the React app
// router.use(function(req, res) {
// 	console.log(
// 		"using routes/index.js fallback for routing to " +
// 			path.join(__dirname, "../client/build/index.html")
// 	);
// 	res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
