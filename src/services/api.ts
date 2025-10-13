import axios from "axios"
import type { GithubUser } from "../interfaces/User"

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