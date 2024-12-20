import React, {useState} from 'react'
import {useAuth} from './AuthContext'
import {uploadImage, createQuote} from '../utils/api'
import {useNavigate} from 'react-router-dom'

const QuoteCreation = () => {
  const {authToken} = useAuth()
  const navigate = useNavigate()
  const [quoteText, setQuoteText] = useState('')
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => setFile(e.target.files[0])

  const handleSubmit = async () => {
    try {
      const mediaUrl = await uploadImage(file)
      console.log(mediaUrl, 'url')
      if (mediaUrl) {
        await createQuote(authToken, {text: quoteText, mediaUrl})
        alert('Quote created successfully!')
      }
    } catch (error) {
      console.log(error, 'error')
      alert('Error creating quote')
    }
  }

  const handleList = () => {
    navigate('/quotes')
  }

  return (
    <div className="quote-creation-container">
      <h2>Create Quote</h2>
      <textarea
        placeholder="Enter quote text"
        value={quoteText}
        onChange={(e) => setQuoteText(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit Quote</button>
      <button onClick={handleList}>Quote List</button>
    </div>
  )
}

export default QuoteCreation
