const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow requests from any origin
app.use(cors({ origin: "*" }));

// ✅ OR Allow specific domains
// app.use(cors({ origin: ["http://localhost:5173", "https://your-frontend.com"] }));

app.use(express.json());

app.post("/api/A7F3B9D2E8C4G6H1/all/contact", (req, res) => {
    console.log(req.body);
    res.json({ message: "Received!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
