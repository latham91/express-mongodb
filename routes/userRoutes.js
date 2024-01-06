const router = require("express").Router();
const { createUser, loginUser, getAllUsers } = require("../controllers/user");

router.route("/").get(getAllUsers);
router.route("/signup").post(createUser);
router.route("/login").post(loginUser);

module.exports = router;
