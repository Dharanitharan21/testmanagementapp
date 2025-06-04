const Test = require('../Models/testmodel');
const Question = require('../Models/questionmodel');

// Create a new test
exports.createTest = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTest = await Test.create({ title, description });
    res.status(201).json(newTest);
  } catch (err) {
    res.status(500).json({ message: 'Test creation failed', error: err.message });
  }
};

// Get list of tests with their questions
exports.getTestsWithQuestions = async (req, res) => {
  try {
    const tests = await Test.find({});
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ message: 'Fetching tests failed', error: err.message });
  }
};



exports.deleteTest = async (req, res) => {
  try {
    const { testId } = req.params;

    const deleted = await Test.findByIdAndDelete(testId);
    if (!deleted) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Delete all questions associated with this test
    await Question.deleteMany({ testId });

    res.status(200).json({ message: 'Test and related questions deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete test', error: err.message });
  }
};



// PUT /api/tests/:testId
exports.updateTest = async (req, res) => {
  try {
    const { testId } = req.params;
    const { title, description } = req.body;

    const updated = await Test.findByIdAndUpdate(
      testId,
      { title, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({ message: 'Test updated successfully', test: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update test', error: err.message });
  }
};
