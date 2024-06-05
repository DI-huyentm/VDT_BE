const { updateStudent } = require('../controllers/studentController.js'); // Adjust the path accordingly
const { Student } = require('../models/index');

jest.mock('../models/index', () => ({
  Student: {
    findOne: jest.fn(),
  },
}));

describe('updateStudent', () => {

  it('should return a failure message when student is not found', async () => {
    Student.findOne.mockResolvedValueOnce(null);

    const req = { params: { id: 1 }, body: { name: 'Updated Student', gender: 'male', school: 'Updated School' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateStudent(req, res);

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
