<template>
  <b-container id="head">
    <h4>Todo List</h4>
    <hr class="my-2" align="left">
    <b-row class="mt-3">

      <b-button v-b-modal.new-task variant="primary" class="ml-3 shadowEffect">
        New Task
        <i class="fa fa-plus ml-1" />
      </b-button>

      <b-modal hide-footer id="new-task" title="New Task">
        <NewTask :tasks="tasks" @new-task="addTask" />
      </b-modal>

      <b-col sm="4" md="2" id="search">
        <b-form-input type="search" size="md" placeholder="Search" v-model="search" />
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
import NewTask from '@/components/NewTask'

export default {
  name: 'head-view',
  props: ['tasks'],
  components: {
    NewTask,
  },
  data() {
    return {
      search: '',
    }
  },
  watch: {
    search() {
      this.$emit('search', this.search)
    },
  },
  methods: {
    addTask(task) {
      this.$emit('new-task', task)
    },
  },
}
</script>

<style scoped>
@media screen and (min-width: 1920px) {
  hr {
    width: 26.5%;
  }
}

@media screen and (min-width: 1920px) {
  hr {
    width: 26.5%;
  }
}
@media screen and (max-width: 575px) {
  #search {
    position: relative;
    top: 15px;
    padding-bottom: 15px;
  }
}
</style>
