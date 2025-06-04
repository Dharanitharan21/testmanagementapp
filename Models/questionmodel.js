const {model , Schema} = require('mongoose');

const questionSchema = new Schema({
  testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  questionText: { type: String, required: true },
  options: { type: [String], required: true },  
  correctAnswer: { type: String, required: true },
});

module.exports = model('Question', questionSchema);
