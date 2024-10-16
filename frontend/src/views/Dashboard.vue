<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Food Items Dashboard</h2>
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-2">{{ editMode ? 'Edit' : 'Add' }} Food Item</h3>
        <FoodItemForm 
          :editItem="editItem" 
          @itemAdded="handleItemAdded" 
          @itemUpdated="handleItemUpdated"
        />
      </div>
      <div>
        <h3 class="text-xl font-semibold mb-2">Food Items List</h3>
        <FoodItemList :items="foodItems" @edit="handleEdit" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useFoodItemsStore } from '../stores/foodItems'
  import FoodItemForm from '../components/FoodItemForm.vue'
  import FoodItemList from '../components/FoodItemList.vue'
  
  const foodItemsStore = useFoodItemsStore()
  const editItem = ref(null)
  
  const editMode = computed(() => !!editItem.value)
  
  const foodItems = computed(() => foodItemsStore.items)
  
  onMounted(async () => {
    await foodItemsStore.fetchItems()
  })
  
  const handleItemAdded = () => {
    // Refresh the list or update the store as needed
  }
  
  const handleItemUpdated = () => {
    editItem.value = null
    // Refresh the list or update the store as needed
  }
  
  const handleEdit = (item: null) => {
    editItem.value = item
  }
  </script>
  