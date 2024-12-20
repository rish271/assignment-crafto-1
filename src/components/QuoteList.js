import React, {useState, useEffect} from 'react'
import {useAuth} from './AuthContext'
import {fetchQuotes} from '../utils/api'
import '../styles/QuoteStyles.css'

const QuoteList = () => {
  const {authToken} = useAuth()
  const [quotes, setQuotes] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const loadQuotes = async () => {
    try {
      const data = await fetchQuotes(authToken, 20, offset)
      if (data.length === 0) setHasMore(false)
      setQuotes((prev) => [...prev, ...data])
      setOffset((prev) => prev + 20)
    } catch (error) {
      alert('Error fetching quotes')
    }
  }

  useEffect(() => {
    loadQuotes()
  }, [])

  return (
    <div className="quote-list-container">
      <h2>Quotes</h2>
      {quotes.map((quote) => (
        <div key={quote.id} className="quote-card">
          <div
            className="quote-image"
            style={{backgroundImage: `url(${quote.mediaUrl})`}}
          >
            <div className="quote-overlay">{quote.text}</div>
          </div>
          <div className="quote-footer">
            <p>{quote.username}</p>
            <p>{quote.created_at}</p>
          </div>
        </div>
      ))}
      {hasMore && <button onClick={loadQuotes}>Load More</button>}
    </div>
  )
}

export default QuoteList
