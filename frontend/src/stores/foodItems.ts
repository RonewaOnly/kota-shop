import { defineStore } from 'pinia'
import axios from 'axios'

interface FoodItem {
  id: number
  name: string
  quantity: number
  price: number
}

export const useFoodItemsStore = defineStore('foodItems', {
  state: () => ({
    items: [
      { id: 1, name: 'Kota', quantity: 50, price: 25.99 },
      { id: 2, name: 'Chips', quantity: 100, price: 15.50 },
      { id: 3, name: 'Soda', quantity: 75, price: 10.00 },
      { id: 4, name: 'Russian', quantity: 30, price: 12.99 },
      { id: 5, name: 'Cheese', quantity: 60, price: 8.50 },
    ] as FoodItem[]
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:3000/api/food-items')
        this.items = response.data
      } catch (error) {
        console.error('Failed to fetch food items:', error)
        // Fallback to dummy data if API call fails
      }
    },
    async addItem(item: Omit<FoodItem, 'id'>) {
      try {
        const response = await axios.post('http://localhost:3000/api/food-items', item)
        this.items.push(response.data)
      } catch (error) {
        console.error('Failed to add food item:', error)
        // For demonstration, add to local state even if API call fails
        this.items.push({ ...item, id: this.items.length + 1 })
      }
    },
    async updateItem(item: FoodItem) {
      try {
        const response = await axios.put(`http://localhost:3000/api/food-items/${item.id}`, item)
        const index = this.items.findIndex(i => i.id === item.id)
        if (index !== -1) {
          this.items[index] = response.data
        }
      } catch (error) {
        console.error('Failed to update food item:', error)
        // For demonstration, update local state even if API call fails
        const index = this.items.findIndex(i => i.id === item.id)
        if (index !== -1) {
          this.items[index] = item
        }
      }
    },
    async deleteItem(id: number) {
      try {
        await axios.delete(`http://localhost:3000/api/food-items/${id}`)
        this.items = this.items.filter(item => item.id !== id)
      } catch (error) {
        console.error('Failed to delete food item:', error)
        // For demonstration, remove from local state even if API call fails
        this.items = this.items.filter(item => item.id !== id)
      }
    },
  },
})