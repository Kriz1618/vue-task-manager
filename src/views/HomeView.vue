<template>
  <div class="home">
    <register />
  </div>
</template>

<script>
// @ is an alias to /src

import Register from '@/components/Register.vue';

export default {
    name: "HomeView",
    components: { Register }
}
</script>
