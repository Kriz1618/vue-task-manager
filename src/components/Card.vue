<template>
  <div class="card horizontal">
    <div class="card-stacked">
      <div class="card-content">
        <span class="card-title">{{ data.name }}</span>
        <p>{{ data.description }}</p>
        <p>Tecnhologies: <span v-for="(lang, i) in data.langs" :key="i">{{
          i < data.langs.length - 1 ? `${lang.toUpperCase()}, ` : lang.toUpperCase()
        }}</span></p>
      </div>

      <div class="card-action">
        <div class="row">
          <router-link :to="`/edit-project/${data.id}`" class="col s6 waves-effect waves-light btn amber darken-3">
            <i class="material-icons">edit</i>
          </router-link>
          <button @click="updateProject" v-if="data.status" class="col s6 waves-effect waves-light btn red darken-3">
            <i class="material-icons">delete</i>
          </button>
          <button @click="updateProject" v-if="!data.status" class="col s6 waves-effect waves-light btn blue darken-3">
            <i class="material-icons">check_circle</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  methods: {
    async updateProject() {
      let user = localStorage.getItem('user');
      user = user ? JSON.parse(user) : user;
      const res = await fetch(
        `https://crud-vue-af68d-default-rtdb.firebaseio.com/projects/${user?.localId}/${this.data.id}.json?auth=${user?.idToken}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status: !this.data.status }),
        }
      );
      const data = await res.json();
      this.confirmDeleted();
      this.data.status = data.status;
    },
    confirmDeleted() {
      M.toast({
        html: `Project ${this.data.name} ${this.data.status ? 'deleted' : 'restored'}!`,
        displayeLaength: 1500,
        classes: 'rounded blue'
      });
    }
  }
};
</script>