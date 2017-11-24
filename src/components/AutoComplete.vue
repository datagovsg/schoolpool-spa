<template>
  <div class="control is-expanded has-icons-left">
    <input id="input-box" class="input" autocomplete="off" type="text" :placeholder="placeholder" :value="value" @input="updateValue($event.target.value)" @keydown.enter='enter'
      @keydown.down='down' @keydown.up='up' @blur="onBlur">
    <span class="icon is-small is-left">
      <i class="fa fa-graduation-cap" aria-hidden="true"></i>
    </span>
    <ul class="menu-list dropdown-list" :class="{'hide':!openSuggestion}">
      <li v-for="(match, index) in matches" :key="match.index" @click="suggestionClick(index)">
        <a :class="{'is-active': isActive(index)}">{{ match.school_name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    // Reference: http://fareez.info/blog/vuejs/create-your-own-autocomplete-using-vuejs-2/
    props: {
      value: {
        type: String,
        required: true,
      },
      suggestions: {
        type: Array,
        required: true,
      },
      placeholder: {
        type: String,
        required: false,
      },
    },

    data() {
      return {
        open: false,
        current: 0,
      }
    },

    computed: {
      // Filtering the suggestion based on the input
      matches() {
        return this.suggestions
      },

      openSuggestion() {
        return this.open === true
      },
    },

    methods: {
      // Triggered the input event to cascade the updates to
      // parent component
      updateValue(value) {
        if (this.open === false) {
          this.open = true
          this.current = 0
        }
        this.$emit('interface', value.trim() === '' ? null : this.matches[this.current])
        this.$emit('input', value)
      },
      // When enter key pressed on the input
      enter() {
        if (this.matches.length !== 0) {
          this.$emit('input', this.matches[this.current].school_name)
          this.$emit('interface', this.matches[this.current])
          this.open = false
        }
      },

      // When up arrow pressed while suggestions are open
      up() {
        if (this.current > 0) {
          this.current -= 1
        }
      },

      // When down arrow pressed while suggestions are open
      down() {
        if (this.current < this.matches.length - 1) {
          this.current += 1
        }
      },

      onBlur() {
        this.$emit('blur')
      },

      // For highlighting element
      isActive(index) {
        return index === this.current
      },

      // When one of the suggestion is clicked
      suggestionClick(index) {
        this.$emit('input', this.matches[index].school_name)
        this.$emit('interface', this.matches[this.current])
        this.open = false
      },
    },
  }

</script>

<style lang="sass" scoped>

  .hide
    visibility: hidden
  .dropdown-list
    z-index: 10
    width: 100%
    max-height: 90px
    position: absolute
    background-color: white
    overflow: hidden
    overflow-y: scroll
  .dropdown-list li
    border-bottom: 0.2px solid rgb(230, 230, 230)
    line-height: 20px
  .dropdown-list li a
    font-size: 0.7em !important
    font-weight: 500

</style>
