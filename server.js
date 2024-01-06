const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

const app = express();

// Load env vars
dotenv.config({ path: "./config/config.env" });
