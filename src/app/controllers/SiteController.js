import Course from '../models/Course.js';
import { multipleMongooseToObject } from '../../util/mongoose.js';

class SiteController {
  // [GET] /news
  async index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render('home', {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  search(req, res) {
    res.render('search');
  }
}

export default new SiteController();
