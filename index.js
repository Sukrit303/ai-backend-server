require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 8000;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("mongo connection successful");
    })
    .catch((err) => {
        console.log("mongo connection failed", err);
    });

app.get("/", async (res, resp) => {
    resp.send("AI FACE RECOGNITION MERN APP");
});
app.listen(port, () => {
    console.log(`server started at ${port}`);
});
