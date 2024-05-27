const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.get("/search", studentController.getStudentsByName);


router.post('/', studentController.createStudent);


router.delete('/:id', studentController.deleteStudent);


router.put('/:id', studentController.updateStudent);


module.exports = router;
