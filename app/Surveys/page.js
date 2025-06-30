'use client'


import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SurveyDashboard() {
  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await fetch('/api/survey')

         
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response from server')
        }

        const data = await res.json()
        if (data.success === false) throw new Error(data.error || 'Failed to load')
        setSurveys(data.surveys)  
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSurveys()
  }, [])

  if (loading) return <p>Loading surveys...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='dashboard'>
      <h1>Submitted Surveys</h1>
      {surveys.length === 0 ? (
        <p>No surveys submitted yet.</p>
      ) : (
        <ul>
          {surveys.map(survey => (
            <li key={survey._id}>
              <Link href={`/Surveys/${survey._id}`}>
                <div>
                  <strong>ID:</strong> {survey._id} <br />
                  <strong>Date:</strong> {new Date(survey.createdAt).toLocaleString()}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
