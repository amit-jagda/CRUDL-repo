function giveResponse(status, res, msg = { msg: "No Message handling" }) {
  return res.status(status).json(msg);
}

module.exports = giveResponse;
