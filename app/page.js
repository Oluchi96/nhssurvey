'use client'
import { useAppContext } from "./context/AppContext"
import { useState } from 'react'

export default function HomePage() {
  const { surveys, setSurveys, selectedSurvey, setSelectedSurvey } = useAppContext()
  const [formData, setFormData] = useState({
    clinicalGroup: '',
    role: '',
    voiceListened: '',
    sharedDecisionMaking: '',
    involvedInChanges: '',
    multiProfCollab: '',
    supportedByLineManager: '',
    confidentToRaiseConcern: '',
    feedbackFromIncidents: '',
    cultureInclusion: '',
    safeFromAbuse: '',
    treatedWithRespect: '',
    patientFeedbackOpportunities: '',
    offDutyRosterSupport: '',
    supportForBreaks: '',
    awareMentalWellbeingSupport: '',
    feelValued: '',
    awareRecognitionSchemes: '',
    welcomedIfMoved: '',
    supportedCareerDevelopment: '',
    comments: ''
  })

  const [status, setStatus] = useState({ success: null, message: '' })
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus({ success: null, message: '' })

    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setStatus({ success: true, message: 'Survey submitted successfully!' })
        setFormData({
          clinicalGroup: '',
          role: '',
          voiceListened: '',
          sharedDecisionMaking: '',
          involvedInChanges: '',
          multiProfCollab: '',
          supportedByLineManager: '',
          confidentToRaiseConcern: '',
          feedbackFromIncidents: '',
          cultureInclusion: '',
          safeFromAbuse: '',
          treatedWithRespect: '',
          patientFeedbackOpportunities: '',
          offDutyRosterSupport: '', 
          supportForBreaks: '',
          awareMentalWellbeingSupport: '',
          feelValued: '',
          awareRecognitionSchemes: '',
          welcomedIfMoved: '',
          supportedCareerDevelopment: '',
          comments: ''
        })
      } else {
        setStatus({ success: false, message: data.error || 'Failed to submit survey' })
      }
    } catch (error) {
      setStatus({ success: false, message: error.message || 'Error submitting survey' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>Health Care Team Survey LGH</h1>

      <form onSubmit={handleSubmit}>

         {/* 1 */}
        <label>
          1. Can you tell us which Clinical Management Group (CMG) you work in? *
          <select name="clinicalGroup" value={formData.clinicalGroup} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="RRCV">RRCV</option>
            <option value="ITAPS">ITAPS</option>
            <option value="CHUGGS">CHUGGS</option>
            <option value="MSS">MSS</option>
            <option value="CSI">CSI</option>
            <option value="Corporate">Corporate</option>
            <option value="SM">SM</option>
            <option value="Women&apos;s">Women&apos;s</option>
            <option value="Estates and facilities">Estates and facilities</option>
          </select>
        </label>

        {/* 2 */}
        <label>
          2. Please tell us which role you work in? *
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select...</option>
            <option>Ward Clerk</option>
            <option>Housekeeper</option>
            <option>Health/Maternity Care Support Worker</option>
            <option>Discharge Support</option>
            <option>AHP and Therapy Support Workers</option>
            <option>ODP</option>
            <option>Medical Team</option>
            <option>Estates and Facilities</option>
            <option>Student</option>
            <option>Trainee Nurse Associate</option>
            <option>Other</option>
          </select>
        </label>

        {/* Questions 3 - 20: Yes/No */}
        {[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(num => (
          <fieldset key={num}>
            <legend>
              {num}. {questions[num]}
            </legend>
            <label>
              <input
                type="radio"
                name={`q${num}`}
                value="Yes"
                checked={formData[`q${num}`] === 'Yes'}
                onChange={handleChange}
                required
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name={`q${num}`}
                value="No"
                checked={formData[`q${num}`] === 'No'}
                onChange={handleChange}
                required
              /> No
            </label>
          </fieldset>
        ))}

        {/* Continue*/}
        <label>
          Comments:
          <textarea name="comments" value={formData.comments} onChange={handleChange} rows={4} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>

      </form>

      {status.success === true && <p style={{ color: 'green' }}>{status.message}</p>}
      {status.success === false && <p style={{ color: 'red' }}>{status.message}</p>}
    </main>
  )
}

const questions = {
  3: 'Do you have a voice and feel listened to in your clinical area?',
  4: 'Have you had the opportunity to be involved in Shared Decision Making Councils in your area?',
  5: 'Do you have opportunities to be involved in changes within your area?',
  6: 'Does the organisation encourage multi-professional collaboration within the clinical environment?',
  7: 'Do you feel supported by your Line Manager to develop your knowledge and skills?',
  8: 'If you had a concern about a patient, would you feel confident and supported to raise it?',
  9: 'Do you receive feedback from patient safety incidents to allow learning to take place which could influence future care?',
  10: 'Does the organisation foster a culture of inclusion and belonging?',
  11: 'Does the organisation keep you safe from verbal and physical abuse from patients and families?',
  12: 'Do your colleagues treat you with respect and kindness when communicating with you?',
  13: 'Does your area give patients/families opportunities to leave feedback, and if so, are these actioned and shared with you?',
  14: 'Does your off duty roster support your work life balance and well being?',
  15: 'Does the organisation support colleagues to take scheduled breaks?',
  16: 'Are you aware of strategies/initiatives that the organisation offers to support you and your colleagues mental wellbeing?',
  17: 'Do you feel valued and recognised within your clinical area?',
  18: 'Are you aware of recognition schemes within the organisation to celebrate colleagues?',
  19: 'If you are moved to another area do you feel welcomed and offered support and guidance?',
  20: 'Are you aware and supported by your line manager to undertake career development/educational opportunities in the organisation?',
}
