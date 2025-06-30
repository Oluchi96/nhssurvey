






'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SurveyDetail({ params }) {
  const { id } = params
  const [survey, setSurvey] = useState(null)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await fetch(`/api/survey/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Error loading survey')
        setSurvey(data.survey)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchSurvey()
  }, [id])

  if (error) return <p>Error: {error}</p>
  if (!survey) return <p>Loading survey...</p>

  return (
    <main className="survey-detail">
      <h1>Survey Details</h1>

      <p><strong>ID:</strong> {survey._id}</p>
      <p><strong>Submitted:</strong> {new Date(survey.createdAt).toLocaleString()}</p>
      <p><strong>CMG:</strong> {survey.cmg}</p>
      <p><strong>Role:</strong> {survey.role}</p>
      {survey.name && <p><strong>Name:</strong> {survey.name}</p>}
      {survey.email && <p><strong>Email:</strong> {survey.email}</p>}

      <h2>Responses</h2>
      <ul>
        {Object.entries(survey.responses).map(([question, answer], index) => (
          <li key={index}>
            <strong>{question}</strong>: {String(answer)}
          </li>
        ))}
      </ul>

      {/* <h2>Responses</h2>
    <ul className="response-list">
  {Object.entries(survey.responses).map(([question, answer], index) => (
    <li key={index} className="response-item">
      <strong className="response-question">{question}:</strong> {String(answer)}
    </li>
  ))}
</ul> */}

      <button onClick={() =>router.push(`/Surveys/${survey._id}`)  }>← Back to Surveys</button>
    </main>
  )
}
// // ✅
// router.push('/Surveys')