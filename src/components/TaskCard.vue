<template>
  <b-card bg-variant="light" text-variant="dark" :title=task.title @click="click()">
    <hr>
    <p class="card-text">{{ task.desc }}</p>
  </b-card>
</template>

<script>
export default {
  name: 'task-card',
  props: ['task'],
  data() {
    return this.task
  },

  methods: {
    click() {
      console.log(this.task.title)
    },
  },
}
</script>
