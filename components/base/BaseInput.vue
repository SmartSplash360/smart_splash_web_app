<template>
  <div class="input-group">
    <label :for="name" class="custom-lbael"></label>
    <input
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeHolder"
      class="custom-input"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  placeHolder: String,
  type: String,
  name: String,
  id: String,
});
</script>
