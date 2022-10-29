<template>
  <label v-if="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    @input="inputHandler($patient)"
    class="field"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    inputHandler(patient) {
      this.$emit('update:modelValue', patient.target.value)
    }
  }
}
</script>
