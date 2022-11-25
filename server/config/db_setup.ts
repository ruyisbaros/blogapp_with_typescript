import mongoose from "mongoose";

mongoose
    .connect(`${process.env.DB_URL}`)
    .then(() => {
        console.log("Db connection done")
    })
    .catch((e) => {
        console.log("Something went wrong with error:" + e)
    })