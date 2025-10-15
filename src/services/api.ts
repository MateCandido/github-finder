import axios from "axios"
import type { GithubUser } from "../interfaces/User"
import type { GithubRepo } from '../interfaces/Repo'

const GITHUB_API_URL = 'https://api.github.com/users/'

export const fetchGithubUser  = async (username: string): Promise<GithubUser> => {
    try{
        const response = await axios.get<GithubUser>(`${GITHUB_API_URL}${username}`)
        return response.data
    } catch (error){
        console.error('Error searching for user', error)
        throw new Error('User not found or error in API')
    }
}

export const fetchGithubUserRepos = async (username: string): Promise<GithubRepo[]> => {
    try {
      const response = await axios.get<GithubRepo[]>(`${GITHUB_API_URL}${username}/repos?per_page=100`)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar repositórios do usuário:", error)
      throw new Error("Repositórios não encontrados ou erro na API.")
    }
  }