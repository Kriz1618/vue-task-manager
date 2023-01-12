<template>
  <div class="row">
    <!-- <div class="col s12 l3">1</div>
    <div class="col s12 l3">2</div>
    <div class="col s12 l3">3</div>
    <div class="col s12 l3">4</div> -->
    <div class="col s12 m6" v-for="project in filteredProjects"
        :key="project.id">
      <card
        :data="project"
      />
    </div>
    <div class="center col s12 m12" v-if="!filteredProjects.length">
      <h5>No projects were found!</h5>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import store from '@/store/store';
export default {
  props: {
    status: {
      require: false,
      type: Boolean,
      default: true,
    }
  },
  data: () => ({
    projects: [],
  }),
  components: { Card },
  mounted() {
    this.getProjects();
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => project.status === this.status);
    },
  },
  methods: {
    async getProjects() {
      const user = store.getUserData();

      if (!user) {
        store.logout();
        this.$router.push('/login');
      }

      const res = await fetch(
        `https://crud-vue-af68d-default-rtdb.firebaseio.com/projects/${user.localId}.json?auth=${user?.idToken}`
      );

      const data = await res.json();

      if (data.error) {
        localStorage.removeItem('user');
        this.$router.push('/login');
      }

      if (data) {
        for (const id of Object.keys(data)) {
          this.projects.push({ id, ...data[id] });
        }
      }
    },
  }
}
</script>

<style>
.center {
  text-align: center;
}
</style>