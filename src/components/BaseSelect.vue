<template>
  <label v-if="label">{{ label }}</label>
  <select
    class="field"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onChange: ($patient) => {
        $emit('update:modelValue', $patient.target.value)
      }
    }"
  >
    <option
      v-for="option in options"
      :value="option.id"
      :key="option.id"
      :selected="option.id === modelValue.id"
    >
      {{ option.doctor_name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number, Object],
      default: ''
    },
    options: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped>
label {
  margin-right: 5px;
  margin-left: 5px;
  font-weight: 300;
}
</style>
