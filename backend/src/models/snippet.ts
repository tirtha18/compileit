import e from "express";
import mongoose from "mongoose";
const { Schema } = mongoose;

const snippetSchema = new Schema({
    name: { type: String, required: true },
    sourceCode: { type: String, required: true },
}, { timestamps: true });  

export const Snippet = mongoose.model("Snippet", snippetSchema);