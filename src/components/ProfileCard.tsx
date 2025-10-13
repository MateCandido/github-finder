import styles from './ProfileCard.module.css'
import type { GithubUser } from '../interfaces/User'

interface ProfileCardProps {
    user: GithubUser
  }

  export const ProfileCard = ({ user }: ProfileCardProps) => {

  return (
    <div className={styles.card}>
      <img src={user.avatar_url} alt={`Avatar of ${user.name}`} className={styles.avatar} />
      
      <h2 className={styles.name}>{user.name || user.login}</h2> 
      <p className={styles.login}>@{user.login}</p>
      
      <p className={styles.bio}>{user.bio || 'This user has no bio.'}</p>
      
      <div className={styles.stats}>
        <div>
          <p className={styles.statsLabel}>Repositories</p>
          <p className={styles.statsValue}>{user.public_repos}</p>
        </div>
        <div>
          <p className={styles.statsLabel}>Followers</p>
          <p className={styles.statsValue}>{user.followers}</p>
        </div>
      </div>
    </div>
  )
}
