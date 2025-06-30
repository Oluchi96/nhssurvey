import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/mongoose'
import Survey from '../../../../models/Survey'

export async function GET(request, { params }) {
  await dbConnect()

  try {
    const survey = await Survey.findById(params.id)
    if (!survey) {
      return NextResponse.json({ success: false, error: 'Survey not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, survey }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
  return NextResponse.json({ success: false, error: 'Invalid survey ID' }, { status: 400 })
}

}



// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'

// export default function SurveyDetail() {
//   const params = useParams()
//   const { id } = params
//   const [survey, setSurvey] = useState(null)
//   const [error, setError] = useState('')
//   const router = useRouter()

//   useEffect(() => {
//     const fetchSurvey = async () => {
//       try {
//         const res = await fetch(`/api/survey/${id}`)
//         const data = await res.json()
//         if (!res.ok) throw new Error(data.error || 'Error loading survey')
//         setSurvey(data.survey)
//       } catch (err) {
//         setError(err.message)
//       }
//     }

//     if (id) fetchSurvey()
//   }, [id])

//   if (error) return <p>Error: {error}</p>
//   if (!survey) return <p>Loading survey...</p>

//   return (
//     <main className="survey-detail">
//       <h1>Survey Details</h1>

//       <p><strong>ID:</strong> {survey._id}</p>
//       <p><strong>Submitted:</strong> {new Date(survey.createdAt).toLocaleString()}</p>
//       <p><strong>CMG:</strong> {survey.cmg}</p>
//       <p><strong>Role:</strong> {survey.role}</p>
//       {survey.name && <p><strong>Name:</strong> {survey.name}</p>}
//       {survey.email && <p><strong>Email:</strong> {survey.email}</p>}

//       <h2>Responses</h2>
//       <ul>
//         {Object.entries(survey.responses).map(([question, answer], index) => (
//           <li key={index}>
//             <strong>{question}</strong>: {String(answer)}
//           </li>
//         ))}
//       </ul>

//       <button onClick={() => router.push('/Surveys')}>← Back to Surveys</button>
//     </main>
//   )
// }









// // 'use client'
// // import { NextResponse} from 'next/server'
// //  import dbConnect from '../../../../lib/mongoose'
// // import Survey from '../../../../models/Survey'


// // export async function GET(request, { params }) {
// //   await dbConnect()

// //   try {
// //     const survey = await Survey.findById(params.id)
// //     if (!survey) {
// //       return NextResponse.json({ success: false, error: 'Survey not found' }, { status: 404 })
// //     }
// //     return NextResponse.json({ success: true, survey }, { status: 200 })
// //   } catch (error) {
// //     return NextResponse.json({ success: false, error: error.message }, { status: 500 })
// //   }
// // }

 
