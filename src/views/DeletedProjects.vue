<template>
  <div class="container">
    <h1>Deleted Projects</h1>
    <hr />
    
    <div class="container" >
      <Container :status=false />
    </div>
  </div>
</template>

<script>
import Container from '@/components/Container.vue';
export default {
  components: { Container }
};
</script>