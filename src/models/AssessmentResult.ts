import mongoose from 'mongoose';
import { AssessmentType } from './Assessment';

const AssessmentResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true,
  },
  assessmentType: {
    type: String,
    enum: Object.values(AssessmentType),
    required: true,
  },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answer: mongoose.Schema.Types.Mixed,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  results: {
    primaryCategory: {
      name: String,
      score: Number,
      description: String,
      animalAvatar: String,
    },
    detailedScores: mongoose.Schema.Types.Mixed,
    insights: [String],
    recommendations: [String],
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

export default mongoose.models.AssessmentResult || mongoose.model('AssessmentResult', AssessmentResultSchema); 