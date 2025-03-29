import mongoose from 'mongoose';

export enum AssessmentType {
  MOTIVATIONS = 'motivations',
  COMMUNICATION = 'communication',
  STRENGTHS = 'strengths',
  EMOTIONAL = 'emotional',
  CONFLICT = 'conflict',
  REFLECTIVE = 'reflective',
  CREATIVE_KIDS = 'creative_kids',
}

const AssessmentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(AssessmentType),
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isEssential: {
    type: Boolean,
    default: false,
  },
  estimatedTime: {
    type: Number, // in minutes
    required: true,
  },
  questions: [{
    questionText: String,
    questionType: {
      type: String,
      enum: ['multiple-choice', 'slider', 'text', 'drawing', 'interactive'],
      required: true,
    },
    options: [{
      text: String,
      value: mongoose.Schema.Types.Mixed,
    }],
    weight: {
      type: Number,
      default: 1,
    },
  }],
  resultCategories: [{
    name: String,
    description: String,
    animalAvatar: String, // 3D model reference
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Assessment || mongoose.model('Assessment', AssessmentSchema); 