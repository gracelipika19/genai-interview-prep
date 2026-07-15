import React, { useState, useRef } from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'

const Home = () => {
  const { loading, generateReport, reports } = useInterview()

  const [jobDesc, setJobDesc] = useState('')
  const [selfDesc, setSelfDesc] = useState('')
  const resumeInputRef = useRef()

  const navigate = useNavigate()

  const onJobChange = (e) => setJobDesc(e.target.value)
  const onSelfChange = (e) => setSelfDesc(e.target.value)

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({
      jobDescription: jobDesc,
      selfDescription: selfDesc,
      resumeFile
    })
    navigate(`/interview/${data._id}`)
  }

  if (loading) {
    return (
      <main className='loading-screen'>
        <h1>Loading your interview plan...</h1>
      </main>
    )
  }

  return (
    <main className="home">
      <div className="container">
        <header className="hero">
          <h1>
            Create Your Custom <span className="accent">Interview</span> Plan
          </h1>
          <p className="sub">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
        </header>

        <section className="card">
          <div className="card-body">
            <div className="left-panel">
              <div className="section-header">
                <span className="icon">📋</span>
                <span className="title">Target Job Description</span>
                <span className="pill required">Required</span>
              </div>

              <div className="textarea-wrap">
                <textarea
                  id="jobDescription"
                  value={jobDesc}
                  onChange={onJobChange}
                  maxLength={5000}
                  placeholder="Paste the full job description here... e.g., 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                />
                <div className="char-count">{jobDesc.length} / 5000 chars</div>
              </div>
            </div>

            <div className="right-panel">
              <div className="section-header small">
                <span className="title">Your Profile</span>
              </div>

              <div className="upload-block">
                <div className="upload-label-row">
                  <span className="label">Upload Resume</span>
                  <span className="pill best">Best Results</span>
                </div>

                <input ref={resumeInputRef} type="file" id="resume" hidden accept=".pdf,.doc,.docx" />
                <label htmlFor="resume" className="upload-drop">
                  <span className="upload-icon">📁</span>
                  <span className="upload-text">Click to upload or drag &amp; drop</span>
                  <small className="hint">PDF or DOCX (Max 5MB)</small>
                </label>
              </div>

              <div className="divider">OR</div>

              <div className="self-desc">
                <label className="label" htmlFor="selfDescription">Quick Self-Description</label>
                <textarea
                  id="selfDescription"
                  value={selfDesc}
                  onChange={onSelfChange}
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                />
              </div>

              <div className="info-box">
                <span className="dot">i</span>
                <span className="info-text">
                  Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
                </span>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <span className="left-foot">AI-Powered Strategy Generation · Approx 30s</span>
            <button onClick={handleGenerateReport} className="generate" type="button">
              <span className="star">★</span> Generate My Interview Strategy
            </button>
          </div>
        </section>

        {/* Recent Reports List */}
        {reports && reports.length > 0 && (
          <section className='recent-reports'>
            <h2>My Recent Interview Plans</h2>
            <ul className='reports-list'>
              {reports.map(report => (
                <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                  <h3>{report.title || 'Untitled Position'}</h3>
                  <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                  <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}

export default Home