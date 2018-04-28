<template>
  <div>
    <b-card>
      <b-card-body bg-variant="light" text-variant="dark" :title=task.title>
        <hr>
        <p class="card-text ">{{ task.desc }}</p>
      </b-card-body>

      <b-button variant="link" id="btn" @click="clear()">
        <i class="fa fa-check" style="color: green;" />
      </b-button>

      <b-button v-b-modal.edit-task variant="link" id="btn">
        <i class="fa fa-cog" style="color: grey;" />
      </b-button>

      <b-modal id="edit-task" />

    </b-card>

  </div>
</template>

<script>
export default {
  name: 'task-card',
  props: ['task'],
  data() {
    return this.task
  },

  methods: {
    click() {},
  },
}
</script>

<style lang="scss" scoped>
#btn {
  position: relative;
  left: 10px;
  margin: -5px;
}
</style>

