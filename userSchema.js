
import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    number: {type: Number, require: true},
    name:{type: String},
    service: {type: String},
    booking: {type: Boolean}
});

export const userModel= mongoose.model("user", userSchema);