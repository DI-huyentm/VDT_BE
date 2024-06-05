const { Student} = require("../models/index");
const { Op } = require('sequelize');
  

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    
    return res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Get all students fail...",
      error
    });
  }
};

  
exports.getStudentById = async (req, res) => {
    try {
        console.log(req);
        const student = await Student.findOne({
            where: { id: req.params.id }
        });

        if (!student) {
            return res.status(404).json({
                status: "fail",
                message: "No student found with that ID",
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                student,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            error: error.errors[0].message, 
        });
    }
};


exports.createStudent = async (req, res) => {
  try {
    const { name, gender, school } = req.body;
    // Tạo sinh viên mới
    const newStudent = await Student.create({
      name,
      gender,
      school
    });

    return res.status(201).json({
      status: "success",
      data: {
        student: newStudent,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      error: error.errors[0].message,
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { name, gender, school } = req.body;
    // Tìm sinh viên cần cập nhật
    const student = await Student.findOne({ where: { id: req.params.id } });
    if (!student) {
      return res.status(404).json({
        status: "fail",
        message: "No student found with that ID",
      });
    }
    // Cập nhật thông tin sinh viên
    await student.update({
      name,
      gender,
      school,
    });

    return res.status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      error: error.errors[0].message,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ where: { id: req.params.id } });
    if (!student) {
      return res.status(404).json({
        status: "fail",
        message: "No student found with that ID",
      });
    }
    await student.destroy();
    return res.status(200).json({
      status: "success",
      message: "Student deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      error: error.errors[0].message,
    });
  }
};

exports.getStudentsByName = async (req, res) => {
  try {
    const { name } = req.query;

    const students = await Student.findAll({ 
      where: { 
        name: { [Op.like]: `%${name}%` } 
      },
    });
    
    if (!students || students.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No students found with that name",
      });
    }
    
    return res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      error: error.errors[0].message,
    });
  }
};

  