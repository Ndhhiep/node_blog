import mongoose from 'mongoose';

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

export default { connect };
