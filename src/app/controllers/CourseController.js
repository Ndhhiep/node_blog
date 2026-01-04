import Course from '../models/Course.js';

class CourseController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        res.render('courses/show', { course });
      })
      .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect('/'))
      .catch(next);
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .lean()
      .then((course) => {
        res.render('courses/edit', { course });
      })
      .catch(next);
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

    Course.updateOne({ _id: req.params.id }, formData)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // [DELETE] /courses/:id/delete
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // [DELETE] /courses/:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('/me/trash/courses'))
      .catch(next);
  }
}

export default new CourseController();
