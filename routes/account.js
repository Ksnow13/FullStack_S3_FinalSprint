// Router for user account info.

const express = require("express");
const router = express.Router();
const accountDal = require("../services/postgres_logins.dal");

// Homepage for the account router.

router.get("/", async (req, res) => {
  try {
    let aAccount = await accountDal.getAccountById(req.user._id);
    if (aAccount.length === 0) res.render("norecordfound");
    else res.render("account", { aAccount });
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// Router for the account patch page for users to update username. 

router.get("/:id/edit", async (req, res) => {
  res.render("accountPatch.ejs", {
    username: req.query.username,
    theId: req.params.id,
  });
});

// Router.patch to change username.

router.patch("/:id", async (req, res) => {
  try {
    await accountDal.patchAccount(req.params.id, req.body.username);
    res.redirect("/account");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

module.exports = router;
