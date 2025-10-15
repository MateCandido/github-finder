import type { GithubRepo } from '../interfaces/Repo'
import styles from './RepoCard.module.css'

interface RepoCardProps {
  repo: GithubRepo
}

export const RepoCard = ({ repo }: RepoCardProps) => {
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <h3 className={styles.repoName}>{repo.name}</h3>
      <p className={styles.repoDescription}>{repo.description || "Sem descrição."}</p>
      <div className={styles.repoStats}>
        <span>⭐ {repo.stargazers_count}</span>
        <span>{repo.language}</span>
      </div>
    </a>
  )
}