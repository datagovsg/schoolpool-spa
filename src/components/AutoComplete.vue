<template>
  <div class="control is-expanded has-icons-left">
    <input class="input" type="text" placeholder="School" :value="value" @input="updateValue($event.target.value)" @keydown.enter='enter'
      @keydown.down='down' @keydown.up='up'>
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

    props: {
      value: {
        type: String,
        required: true,
      },
      suggestions: {
        type: Array,
        required: true,
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
        return this.suggestions.filter(obj =>
          obj.school_name.toLowerCase().includes(this.value.toLowerCase()) >= 0)
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
        this.$emit('input', value)
        this.$emit('interface', value.trim() === '' ? null : this.matches[this.current])
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
    max-height: 150px
    position: absolute
    background-color: white
    overflow: hidden
    overflow-y: scroll
  .dropdown-list li
    border: 1px solid #ccc
  .dropdown-list,
  .dropdown-list li:last-child
    border-radius: 0 0 5px 5px

</style>
