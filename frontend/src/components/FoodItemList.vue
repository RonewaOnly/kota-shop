<template>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in items" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.quantity }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.price.toFixed(2) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="$emit('edit', item)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
              <button @click="handleDelete(item.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useFoodItemsStore } from '../stores/foodItems'
  
  const props = defineProps<{
    items: Array<{
      id: number;
      name: string;
      quantity: number;
      price: number;
    }>;
  }>()
  
  const emit = defineEmits(['edit'])
  
  const foodItemsStore = useFoodItemsStore()
  
  const handleDelete = async (id: number) => {
    try {
      await foodItemsStore.deleteItem(id)
    } catch (error) {
      console.error('Failed to delete food item:', error)
    }
  }
  </script>
  