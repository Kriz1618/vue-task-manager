<template>
  <div class="container">
    <div class="row">
      <router-link to="/projects" class="col s12 waves-effect waves-light btn amber darken-3">
        <i class="material-icons">arrow_back</i>
      </router-link>
    </div>
    <div class="row">
      <form @submit.prevent="submitForm" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input id="name" type="text" :placeholder="id ? 'Project Name' : ''" v-model="project.name"
              class="validate">
            <label v-if="!id" for="name">Project Name</label>
          </div>
          <div class="input-field col s12">
            <input id="description" type="text" :placeholder="id ? 'Description' : ''" v-model="project.description"
              class="validate">
            <label v-if="!id" for="description">Description</label>
          </div>
        </div>

        <p>
          <label>
            <input type="checkbox" v-model="project.langs" value="html" checked="checked" />
            <span>HTML</span>
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" v-model="project.langs" value="css" checked="checked" />
            <span>CSS</span>
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" v-model="project.langs" value="js" checked="checked" />
            <span>Javascript</span>
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" v-model="project.langs" value="vue" checked="checked" />
            <span>Vue</span>
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" v-model="project.langs" value="react" checked="checked" />
            <span>React</span>
          </label>
        </p>

        <button class="btn waves-effect waves-light col s12" type="submit" name="action">
          {{ id? 'Edit': 'Save' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        name: '',
        description: '',
        langs: [],
        status: true,
      },
      id: null,
      token: null,
      userId: null,
    }
  },
  mounted() {
    this.id = this.$route.params?.id;
    if (this.id) {
      this.getProject();
    }
  },
  beforeMount() {
    let user = localStorage.getItem('user');
    this.token = user ? JSON.parse(user).idToken : null;
    this.userId = user ? JSON.parse(user).localId : null;
  },
  methods: {
    async submitForm() {
      if (this.id) {
        await this.updateProject();
      } else {
        await this.createProject();
      }
      this.$router.push(this.project.status ? '/projects' : '/deleted');
    },
    async createProject() {
      await fetch(
        `https://crud-vue-af68d-default-rtdb.firebaseio.com/projects/${this.userId}.json?auth=${this.token}`,
        {
          method: 'POST',
          body: JSON.stringify(this.project),
        }
      );
      this.confirmCreation();
    },
    async updateProject() {
      await fetch(
        `https://crud-vue-af68d-default-rtdb.firebaseio.com/projects/${this.userId}/${this.id}.json?auth=${this.token}`,
        {
          method: 'PATCH',
          body: JSON.stringify(this.project),
        }
      );
    },
    async getProject() {
      this.$route
      const res = await fetch(
        `https://crud-vue-af68d-default-rtdb.firebaseio.com/projects/${this.userId}/${this.id}.json?auth=${this.token}`
      );
      this.project = await res.json();
    },
    confirmCreation() {
      M.toast({
        html: `Project ${this.project.name} was ${this.id ? 'updated' : 'created'}!`,
        displayeLaength: 1500,
        classes: 'rounded teal accent-4'
      });
    }
  }
}
</script>