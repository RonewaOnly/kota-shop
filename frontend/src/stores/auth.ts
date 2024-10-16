import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', { email, password })
        console.log('Registration response:', response.data); // Log the response
        this.token = response.data.token
        localStorage.setItem('token', this.token?this.token:'')
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async register(email: string, password: string) {
      try {
         const response= axios.post('http://localhost:3000/auth/register', { email, password })
        console.log('Registration response:', (await response).data); // Log the response

      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
  },
})
