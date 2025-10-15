import { useState } from 'react'
import { fetchGithubUser, fetchGithubUserRepos } from './services/api'
import type { GithubUser } from './interfaces/User'
import type { GithubRepo } from './interfaces/Repo'
import { SearchBar } from './components/SearchBar'
import { ProfileCard } from './components/ProfileCard'
import { RepoCard } from './components/RepoCard' 
import styles from './App.module.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState<GithubUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [isLoadingRepos, setIsLoadingRepos] = useState(false)

  const getTopRepos = (repos: GithubRepo[]): GithubRepo[] => {
    return repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
  }

  const handleSearch = async () => {
    if (!searchTerm) return

    setIsLoading(true)
    setUser(null)
    setRepos([]) 
    setError(null)

    try {
      const userData = await fetchGithubUser(searchTerm)
      setUser(userData)

      setIsLoadingRepos(true)
      const userRepos = await fetchGithubUserRepos(searchTerm)

      const topRepos = getTopRepos(userRepos); 

      setRepos(topRepos)

    } catch (err) {
      setError('Utilizador não encontrado.')
    } finally {
      setIsLoading(false)
      setIsLoadingRepos(false)
    }
  }

  return (
    <div className={styles.container}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      {isLoading && <p>A procurar utilizador...</p>}
      {error && <p className={styles.error}>{error}</p>}
      
      {user && <ProfileCard user={user} />}

      {isLoadingRepos && <p>A carregar repositórios...</p>}
      
      {!isLoadingRepos && repos.length > 0 && (
        <div className={styles.reposContainer}>
          <h2>Repositórios Mais Populares</h2>
          <div className={styles.reposGrid}>
            {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default App