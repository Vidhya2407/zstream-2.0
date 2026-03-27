import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: 160,
    },
    description: {
      type: String,
      default: '',
      maxlength: 4000,
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    audioUrl: {
      type: String,
      default: '',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    contentType: {
      type: String,
      enum: ['video', 'live', 'music', 'minis'],
      default: 'video',
      index: true,
    },
    source: {
      type: String,
      enum: ['seed', 'catalog', 'cms', 'upload'],
      default: 'seed',
      index: true,
    },
    locale: {
      type: String,
      enum: ['en', 'de'],
      default: 'en',
      index: true,
    },
    externalKey: {
      type: String,
      default: '',
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      default: '',
      index: true,
    },
    duration: {
      type: String,
      default: '',
    },
    carbonFootprint: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

VideoSchema.index({ contentType: 1, locale: 1, status: 1, publishedAt: -1 });
VideoSchema.index({ category: 1, contentType: 1, status: 1 });
VideoSchema.index({ source: 1, contentType: 1, publishedAt: -1 });
VideoSchema.index({ externalKey: 1, locale: 1 }, { unique: true, partialFilterExpression: { externalKey: { $type: 'string', $ne: '' } } });

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
