import Course from '../models/Course.js';

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Course.find({})
      .lean()
      .then((courses) => {
        res.render('me/stored-courses', {
          courses: courses,
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
