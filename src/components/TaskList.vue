<template>
  <div class="container mt-3">
    <div class="row">
      <div v-for="task in tasks" :key=task.id class="col-md-4">
        <TaskCard class="task" :task=task />
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard'

export default {
  name: 'task-list',
  components: {
    TaskCard,
  },

  data() {
    return {
      tasks: [
        {
          id: 0,
          title: 'Do the dishes',
          desc: 'Before 10 AM!',
        },
        {
          id: 1,
          title: 'Do the laundry',
          desc: 'Before 11 AM!',
        },
        {
          id: 2,
          title: 'Vacuum the apartment',
          desc: 'Before 12 AM!',
        },
        {
          id: 3,
          title: 'Cook lunch',
          desc: 'By 1 PM!',
        },
        {
          id: 4,
          title: 'Workout Time!',
          desc: '100 pushups, 100 situps, 100 squats and a 10 km jog.',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.task {
  &:hover {
    box-shadow: 0 4px 4px 0 rgba(0, 162, 255, 0.445),
      0 6px 10px 0 rgba(0, 255, 85, 0.19);
  }
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.445), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>
