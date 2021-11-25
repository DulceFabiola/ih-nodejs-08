exports.register = async (req, res) => {
  res.send("Estas en el registro");
};
exports.profile = async (req, res) => {
  res.render("users/profile");
};
