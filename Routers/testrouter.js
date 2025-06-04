const {Router} = require('express')
const { protect } = require('../Middlewares/authMiddleware')
const { createTest, getTestsWithQuestions, updateTest, deleteTest } = require('../Controllers/testcontroller');
const route = Router()

route.post('/test', protect,createTest);
route.get('/tests', protect,getTestsWithQuestions);
route.delete('/tests/:testId', protect,deleteTest);
route.put('/tests/:testId', protect,updateTest);

module.exports = route
