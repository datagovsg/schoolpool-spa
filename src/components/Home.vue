<template>
  <div>
    <section id="top" class="hero is-fullheight is-info is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Schoolpool
          </h1>
          <h2 class="subtitle">
            Facilitates parents sending their children to school by carpooling
          </h2>
        </div>
      </div>
    </section>
    <section id="about" class="section hero is-medium has-text-centered">
      <div class="container">
        <h1 class="title">About</h1>
        <!-- <p class="subtitle">With the mission of reducing traffic around schools and provide an alternative mode of transport for students</p> -->
        <hr class="center-hr">
        <div class="columns features">
          <div class="column is-4">
            <div class="card rounded-div">
              <div class="card-content">
                <div class="content">
                  <h4>Complementary</h4>
                  <p>SchoolPool is completely <strong>free</strong> for you to use with no hidden fees whatsoever.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="card rounded-div">
              <div class="card-content">
                <div class="content">
                  <h4>Simple</h4>
                  <p>SchoolPool is simple and easy to use! With just<br/><strong>3 easy steps</strong>, your child will be carpooling to school in no time.</p>
                  <p>
                    <a href="#how" v-smooth-scroll>Learn more</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="card rounded-div">
              <div class="card-content">
                <div class="content">
                  <h4>Collaborative</h4>
                  <!-- Schoolpool collaborates with schools to ensure that profiles are genuine and to provide parents with an ease of mind. -->
                  <p><i> - Coming soon - </i></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="how" class="section hero is-light is-medium has-text-centered">
      <div class="container">
        <h1 class="title">How does it work?</h1>
        <hr class="center-hr">
        <div class="columns is-centered" id="processColumns">
          <div class="column is-3">
            <div class="image rounded-div">
              <img class="image" src="../assets/login.png" alt="visiting the webpage"/>
            </div>
            <p>Step 1: Login via Google or Facebook.</p>
          </div>
          <div class="column is-3">
            <div class="image rounded-div">
              <img class="image" src="../assets/register.png" alt="visiting the webpage"/>
            </div>
            <p>Step 2: Enter your credentials in the settings page.</p>
          </div>
          <div class="column is-3">
            <div class="image rounded-div">
              <img class="image" src="../assets/notification.png" alt="visiting the webpage"/>
            </div>
            <p>Step 3: Get notified on your paired up parent and start planning your carpooling</p>
          </div>
        </div>
      </div>
    </section>
    <section id="contact" class="section hero is-medium has-text-centered">
      <div class="container">
        <h1 class="title">Feedback</h1>
        <hr class="center-hr">
        <transition name="fade">
        <div v-if="hasSent" :class="[isSuccessful ? 'is-primary' : 'is-danger', 'notification']">
          <button class="delete" v-on:click="hasSent = !hasSent"></button> {{ feedbackResponse }}
        </div>
        </transition>
        <form>
          <div class="field has-addons">
            <p class="control">
              <span class="select is-medium">
                <select>
                  <option>Mr</option>
                  <option>Ms</option>
                  <option>Mrs</option>
                  <option>Dr</option>
                </select>
              </span>
            </p>
            <p class="control is-expanded">
              <input v-validate="'required'" :class="{ 'is-medium': true, 'input': true, 'is-danger': errors.has('name') }" name="name" id="nameInput" type="text" v-model="name" placeholder="Name">
              <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </p>
          </div>
          <div class="field">
            <p :class="{ 'control': true }">
              <input v-validate="'required|email'" :class="{ 'is-medium': true, 'input': true, 'is-danger': errors.has('email') }" name="email" id="emailInput" type="text" v-model="email" placeholder="Email">
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>
          </div>
          <div class="field">
            <div class="control is-expanded">
              <textarea class="textarea" id="feedbackTextArea" v-model="feedback" placeholder="Feedback"></textarea>
            </div>
          </div>
          <div class="control">
            <div class="g-recaptcha" :data-sitekey="siteKey"></div>
            <button id="feedbackBtn" @click="onSubmit" class="button is-primary is-medium" :class="{ 'is-loading': inSubmitProcess }">{{ submitbuttonText }}</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>

import moment from 'moment'
import config from '../specs/config'

export default {
  data() {
    return {
      name: '',
      email: '',
      feedback: '',
      feedbackResponse: '',
      submitbuttonText: 'Submit',
      inSubmitProcess: false,
      isSuccessful: false,
      hasSent: false,
      siteKey: config.gRecaptcha.siteKey,
    }
  },
  created() {
    this.$emailjs.init(config.emailJS.userID)
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$validator.validateAll().then((result) => {
        if (result) {
          // parameters: service_id, template_id, template_parameters
          this.inSubmitProcess = !this.inSubmitProcess
          const emailObject = {
            reply_to: this.email,
            from_name: 'SchoolPool',
            to_name: this.name,
            message_html: this.feedback,
            date: moment().format('MMMM Do YYYY, h:mm:ss a'),
          }
          this.$emailjs.send('gmail', 'template_2It6pSrx', emailObject)
            .then(() => {
              this.isSuccessful = true
              this.hasSent = !this.hasSent
              this.inSubmitProcess = !this.inSubmitProcess
              this.feedbackResponse = 'Feedback has been successfully sent!'
              this.submitbuttonText = 'Sent'
            }, (err) => {
              this.hasSent = !this.hasSent
              this.inSubmitProcess = !this.inSubmitProcess
              const message = JSON.parse(err.text)
              this.feedbackResponse = message.error
            })
          return
        }
        this.feedbackResponse = 'Please ensure that all input fields are filled.'
        this.hasSent = !this.hasSent
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.rounded-div
  border-radius: 3px
.center-hr
  margin: 50px auto
  width: 20%
  max-width: 50%
  #top
  // background-image: url("../assets/cars.png")
  // background-size: cover
  // background-repeat: no-repeat
  // background-position: center center
</style>

