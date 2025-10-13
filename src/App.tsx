import { useState } from 'react'
import styles from './App.module.css'
import { ProfileCard } from './components/ProfileCard'
import { SearchBar } from './components/SearchBar'
import type { GithubUser } from './interfaces/User'
import { fetchGithubUser } from './services/api'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm) return

    setIsLoading(true)
    setUser(null)
    setError(null)

    try {
      const userData = await fetchGithubUser(searchTerm);
      setUser(userData)
    }catch(err){
      setError('User not found')
    }
  }

  return (
    <div className={styles.container}>
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onSearch={handleSearch}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {user && <ProfileCard user={user} />}
    </div>
  )
}

export default App