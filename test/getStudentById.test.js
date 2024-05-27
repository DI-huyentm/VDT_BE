const { getStudentById } = require('../controllers/studentController.js'); // Adjust the path accordingly
const { Student } = require('../models/index');

jest.mock('../models/index', () => ({
  Student: {
    findOne: jest.fn(),
  },
}));

describe('getStudentById', () => {
  it('should return a student successfully when found', async () => {
    const mockStudent = { id: 1, name: 'John Doe' };

    Student.findOne.mockResolvedValueOnce(mockStudent);

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getStudentById(req, res);

    expect(Student.findOne).toHaveBeenCalledWith({
      where: { id: req.params.id },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: { student: mockStudent },
    });
  });

  it('should return a failure message when student is not found', async () => {
    Student.findOne.mockResolvedValueOnce(null);

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getStudentById(req, res);

    expect(Student.findOne).toHaveBeenCalledWith({
      where: { id: req.params.id },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'No student found with that ID',
    });
  });


});
