<template>
  <div class="container">
    <h1>Projects</h1>
    <hr />
    <div class="row">
      <router-link to="/new-project" class="col s12 waves-effect waves-light btn amber darken-3">
        <i class="material-icons">add</i>
      </router-link>
    </div>
    <div class="container">
      <Container />
    </div>
  </div>
</template>

<script>
import Container from '@/components/Container.vue';
export default {
  components: { Container }
};
</script>