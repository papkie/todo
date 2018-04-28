<template>
  <div>
    <div class="container mt-3">
      <h4>Todo List</h4>

      <hr class="my-2">

      <b-button v-b-modal.new-task variant="primary" class="mt-2">New Task</b-button>

      <b-modal hide-footer id="new-task" title="New Task">
        <NewTask />
      </b-modal>

    </div>
    <TaskList />

  </div>
</template>

<script>
import TaskList from '@/components/TaskList'
import NewTask from '@/components/NewTask'

export default {
  name: 'home',
  components: {
    TaskList,
    NewTask,
  },
}
</script>
