import Course from '../models/Course.js';

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}).lean(), Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.render('me/stored-courses', {
          courses: courses,
          deletedCount: deletedCount,
        });
      })
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .lean()
      .then((courses) => {
        res.render('me/trash-courses', {
          courses: courses,
        });
      })
      .catch(next);
  }
}

export default new MeController();
