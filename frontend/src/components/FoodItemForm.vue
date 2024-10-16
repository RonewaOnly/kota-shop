<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="form.name" type="text" id="name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
        <input v-model.number="form.quantity" type="number" id="quantity" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
        <input v-model.number="form.price" type="number" step="0.01" id="price" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {{ editMode ? 'Update' : 'Add' }} Food Item
      </button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useFoodItemsStore } from '../stores/foodItems'
  
  const props = defineProps<{
    editItem?: {
      id: number;
      name: string;
      quantity: number;
      price: number;
    } | null;
  }>()
  
  const emit = defineEmits(['itemAdded', 'itemUpdated'])
  
  const foodItemsStore = useFoodItemsStore()
  
  const form = ref({
    name: props.editItem?.name ?? '',
    quantity: props.editItem?.quantity ?? 0,
    price: props.editItem?.price ?? 0,
  })
  
  const editMode = computed(() => !!props.editItem)
  
  const handleSubmit = async () => {
    try {
      if (editMode.value) {
        await foodItemsStore.updateItem({ ...form.value, id: props.editItem!.id })
        emit('itemUpdated')
      } else {
        await foodItemsStore.addItem(form.value)
        emit('itemAdded')
      }
      form.value = { name: '', quantity: 0, price: 0 }
    } catch (error) {
      console.error('Failed to submit food item:', error)
    }
  }
  </script>