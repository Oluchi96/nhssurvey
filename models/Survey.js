import mongoose from 'mongoose'

const SurveySchema = new mongoose.Schema(
  {
    cmg: { type: String, required: true }, 
    role: { type: String, required: true },
    responses: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.models.Survey || mongoose.model('Survey', SurveySchema)


















// import mongoose from 'mongoose'

// const SurveySchema = new mongoose.Schema(
//   {
//     cmg: {
//       type: String,
//       required: true
//     },
//     role: {
//       type: String,
//       required: true
//     },
//     name: {
//       type: String,
//       required: false,
//       trim: true
//     },
//     email: {
//       type: String,
//       required: false,
//       lowercase: true
//     },
//     responses: {
//       type: Map,
//       of: mongoose.Schema.Types.Mixed,
//       required: true
//     }
//   },
//   { timestamps: true }
// )

// export default mongoose.models.Survey || mongoose.model('Survey', SurveySchema)
