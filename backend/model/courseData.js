const mongoose=require('mongoose');
const courseSchema=mongoose.Schema({
    courseId:String,
    courseName:String,
    courseCategory:String,
    courseDescription:String,
    courseImage:String,
    courseFee:String
})

const courseData=mongoose.model('course',courseSchema)
module.exports=courseData;