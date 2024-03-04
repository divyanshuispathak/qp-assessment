"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groceryItemController_1 = require("../controllers/groceryItemController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/', groceryItemController_1.getAllItems);
router.post('/', auth_1.auth, auth_1.admin, (req, res) => {
    // Placeholder for creating a new grocery item
    res.send('Create a new grocery item');
});
exports.default = router;
