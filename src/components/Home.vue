<template>
  <div class="container mt-3">
    <h4>Todo List</h4>
    <hr class="my-2">

    <b-button variant="primary" class="mt-2">New Task</b-button>
    <TaskList />
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'

export default {
  name: 'home',
  components: {
    TaskList,
  },
}
</script>
