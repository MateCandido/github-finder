import styles from './SearchBar.module.css'
import type { Dispatch, SetStateAction } from 'react'

interface SearchBarProps {
    searchTerm: string
    setSearchTerm: Dispatch<SetStateAction<string>>
    onSearch: () => Promise<void>
  }

export const SearchBar = ({ searchTerm, setSearchTerm, onSearch }: SearchBarProps) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        onSearch()
      }
    }
  return (
    <div className={styles.container}>
    <input
        className={styles.input}
        type="text"
        placeholder="Type username and press Enter......"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
