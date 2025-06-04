const {Router} = require('express')
const route = Router()

const { protect } = require('../Middlewares/authMiddleware')
const upload = require('../Middlewares/multerMiddleware')
const { addQuestion, getQuestionsForTest, uploadCSV, deleteQuestion, updateQuestion, getAllQuestions } = require('../Controllers/questionController')

route.post('/test/:testId/question', protect, addQuestion)
route.get('/test/:testId/questions', protect, getQuestionsForTest)
route.get('/questions', getAllQuestions);
route.delete('/questions/delete/:questionId',protect, deleteQuestion);
route.put('/questions/update/:questionId',protect, updateQuestion);
// CSV upload
route.post(
  '/test/:testId/upload',
  protect,
  upload.single('file'),
  uploadCSV
);

module.exports = route;
