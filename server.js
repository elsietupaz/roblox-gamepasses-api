const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/gamepasses/:userId", async (req, res) => {
    const userId = req.params.userId;
    // AssetTypeId 34 = Game Passes
    const url = `https://inventory.roproxy.com/v2/users/${userId}/inventory/34`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extract only gamepasses
        const passes = data.data.map(item => ({
            id: item.id,
            name: item.name
        }));

        res.json({ success: true, passes });
    } catch (err) {
        console.error(err);
        res.json({ success: false, error: "Failed to fetch" });
    }
});

// ✅ IMPORTANT: use Heroku’s dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
