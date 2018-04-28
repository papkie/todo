<template>
  <div>
    <div class="container mt-3">
      <h4>Todo List</h4>

      <hr class="my-2">

      <b-button v-b-modal.new-task variant="primary" class="mt-2" id="newBtn">New Task</b-button>

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

<style lang="scss" scoped>
#newBtn {
  &:hover {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.075),
      0 6px 10px 0 rgba(0, 0, 0, 0.19);
  }
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.445), 0 3px 3px 0 rgba(0, 0, 0, 0.19);
}
</style>
