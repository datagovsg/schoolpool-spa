<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Policy Statement</p>
        <button @click="modalHandler" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div>
          <h1 class="title">Government Agency</h1>
          <p class="subtitle">Privacy Policy</p>
          <div>
            This Privacy Policy must be read in conjunction with the Terms of Use that accompany the applicable service you are requesting
            from us (the
            <b>“Service”</b>). In this Privacy Policy,
            <b>“Public Sector Entities”</b> means the Government (including its ministries, departments and organs of state)
            and public authorities (such as statutory boards).
          </div>
          <ol>
            <li>Insofar as the Service consists of or is provided to you through a website, please note that:
              <ol>
                <li>We may use "cookies", where a small data file is sent to your browser to store and track information about
                  you when you enter our websites. The cookie is used to track information such as the number of users and
                  their frequency of use, profiles of users and their preferred sites. While this cookie can tell us when
                  you enter our sites and which pages you visit, it cannot read data off your hard disk.</li>
                <li>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can
                  usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking
                  full advantage of the website.</li>
              </ol>
            </li>
            <li>We may request certain types of data from you in connection with your access or use of the Service. The data
              that may be requested include those identified in the Annex herein. Your data may be stored in our servers,
              systems or devices, in the servers, systems or devices of our third party service providers or collaborators,
              or on your device, and may be used by us or our third party service providers or collaborators to facilitate
              your access or use of the Service.
              <li>If you provide us with personally identifiable data:
                <ol>
                  <li>We may share necessary data with other Public Sector Entities, and third party service providers in connection
                    with the Service, so as to provide the Service to you in the most efficient and effective way unless
                    such sharing is prohibited by law.</li>
                  <li>We will NOT share your Personal Data with entities which are not Public Sector Entities, except where such
                    sharing is necessary for such entities to assist us in providing the Service to you.</li>
                  <li>For your convenience, we may also display to you data you had previously supplied us or other Public Sector
                    Entities. This will speed up the transaction and save you the trouble of repeating previous submissions.
                    Should the data be out-of-date, please supply us the latest data.</li>
                </ol>
              </li>
              <li>To safeguard your personal data, all electronic storage and transmission of personal data is secured with appropriate
                security technologies.</li>
              <li>You may withdraw your consent to the use and disclosure of your data by us with reasonable notice and subject
                to any prevailing legal or contractual restrictions; however, doing so may prevent the proper functioning
                of the Service and may also result in the cessation of the Service to you.</li>
              <li>The Service may contain links to non-Public Sector Entity sites whose data protection and privacy practices
                may differ from ours. We are not responsible for the content and privacy practices of these other websites
                and encourage you to consult the privacy notices of those sites.</li>
              <li>Please contact 1800 211 0777 or
                <!--email_off-->qsm@tech.gov.sg
                <!--/email_off-->if you:
                <ol>
                  <li>have any enquires or feedback on our data protection policies and procedures; or</li>
                  <li>need more information on or access to data which you have provided to us in the past.</li>
                </ol>
              </li>
          </ol>
          <center>This version of the Privacy Policy is dated 8 November 2017.</center>
          <center>
            <p class="subtitle">
              <b>ANNEX</b>
            </p>
          </center>
          <ol type="i">
            <li>
              <b>Name of Service:</b> Schoolpool</li>
            <li>
              <b>Types of data requested</b>
              <ol type="a">
                <li>Personal contact details;</li>
                <li>Geolocation information.</li>
              </ol>
            </li>
          </ol>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button @click="modalHandler" class="button">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    modalHandler() {
      this.$emit('visible')
    },
  },
}
</script>


<style lang="sass" scoped>

  .modal
    z-index: 40
    color: #000000

  .subtitle
    margin-top: 24px !important
  
  .modal-card-body,
    padding-left: 30px !important
    
  ol li,
    padding-left: 10px !important 

</style>

