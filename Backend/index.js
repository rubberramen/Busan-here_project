const express = require("./config/express");
const { logger } = require("./config/winston");  // log

const port = 3522;
express().listen(port);  // 실행
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
