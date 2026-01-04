import mongoose from 'mongoose';
import slugify from 'slugify';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, unique: true },
  },
  { timestamps: true },
);

Course.pre('save', async function () {
  if (this.name) {
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1; // Kiểm tra trùng slug trong DB
    while (await mongoose.models.Course.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }
    this.slug = slug;
  }
});

Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

export default mongoose.model('Course', Course);
