const Question = require('../Models/questionmodel');
const Test = require('../Models/testmodel');
const csv = require('csv-parser')
const fs = require('fs');

// Add a question to a specific test
exports.addQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswer } = req.body;
    const testId = req.params.testId;

   if (!testId || !questionText || !options || !correctAnswer) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    const question = await Question.create({
      testId,
      questionText,
      options,
      correctAnswer,
    });

    res.status(201).json(question);
  } catch (err) {
 console.error('Add Question Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get questions for a specific test
exports.getQuestionsForTest = async (req, res) => {
  try {
    const testId = req.params.testId;
    const questions = await Question.find({ testId });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Fetching questions failed', error: err.message });
  }
};

// Upload questions via CSV file
exports.uploadCSV = async (req, res) => {
  const testId = req.params.testId;
  const questions = [];

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        const { questionText, option1, option2, option3, option4, correctAnswer } = row;

        const options = [option1, option2, option3, option4];

        // ✅ Validate required fields
        if (!questionText || options.includes(undefined) || !correctAnswer) {
          row._error = 'Missing required fields';
          questions.push(row);
          return;
        }

        // ✅ Validate correctAnswer is among options
        if (!options.includes(correctAnswer)) {
          row._error = 'Correct answer does not match any options';
          questions.push(row);
          return;
        }

        // ✅ All checks passed
        questions.push({
          testId,
          questionText,
          options,
          correctAnswer,
        });
      })
      .on('end', async () => {
        const validQuestions = questions.filter(q => !q._error);
        const invalidRows = questions.filter(q => q._error);

        fs.unlinkSync(req.file.path); // cleanup

        if (invalidRows.length > 0) {
          return res.status(400).json({
            message: 'CSV contains invalid rows',
            errors: invalidRows,
          });
        }

        await Question.insertMany(validQuestions);
        res.status(201).json({ message: 'Questions uploaded successfully' });
      });
  } catch (err) {
    res.status(500).json({ message: 'CSV upload failed', error: err.message });
  }
};

// DELETE /api/questions/:questionId
exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const deleted = await Question.findByIdAndDelete(questionId);
    if (!deleted) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.error('Delete Question Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



// PUT /api/questions/:questionId
exports.updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { questionText, options, correctAnswer } = req.body;

    // Validate input
    if (!questionText || !Array.isArray(options) || options.length !== 4 || !correctAnswer) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ message: 'Correct answer must be one of the options' });
    }

    const updated = await Question.findByIdAndUpdate(
      questionId,
      { questionText, options, correctAnswer },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', question: updated });
  } catch (err) {
    console.error('Update Question Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (err) {
    console.error('Get All Questions Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
