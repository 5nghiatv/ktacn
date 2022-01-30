<template>
  <router-view />
</template>
<script>
import { watch } from 'vue'
import { useStore, mapState, mapMutations } from 'vuex'
import { isLoggedIn, getLoggedInUser } from '@/common/authService'

export default {
  data() {
    return {
      cartValue: 0,
    }
  },
  created() {
    // Phục hồi biến trong store khi refresh trang web , Nếu không sẽ mất hết
    //====================================================================
    this.getSettings()
    this.getLocalProducts()
    const loggedUser = getLoggedInUser()
    this.ADD_LOGGED_USER(loggedUser)
  },
  beforeCreate: function () {
    // var info = this.$jwtAcn.getKetoan()
    // console.log(
    //   1,
    //   'Change language: ',
    //   this.$i18n.locale,
    //   ' Replace = ',
    //   info.locale,
    // )
    // this.$i18n.locate = info.locate // Cho bên bên trái & hệ thống ( this.$i18n.locate)
    // this.$store.state.locale = info.locate // Dành cho bên trên & phải (this.$store.state.locale)
  },
  // watch: {
  //   items: {
  //     handler(val, oldVal) {
  //       console.log(oldVal + ' --> ' + val)
  //     },
  //     deep: true,
  //   },
  // },
  computed: {
    ...mapState(['cartProducts', 'loggedUser', 'settings']),
    CheckCreate: function () {
      // Chạy khi thực hiện router
      if (!this.$route.path.includes('/reports/')) {
        // eslint-disable-next-line
        this.$store.state.isPrinting = false
      } // Không in luôn faLse
      // if (this.$i18n.locale != this.$store.state.locale) {
      //   {
      //     this.$i18n.locale = this.$store.state.locale
      //   } // Cho bên trên & bên phải - Khi thay router-view
      // }
      return true
    },
  },
  methods: {
    /* Initially loading the cart products from local storage */
    ...mapMutations(['SET_CART_PRODUCTS', 'ADD_LOGGED_USER', 'REP_SETTINGS']),
    getSettings() {
      const settings = JSON.parse(localStorage.getItem('setting_acn'))
      if (settings) this.REP_SETTINGS(settings)
    },

    getLocalProducts() {
      const products = JSON.parse(localStorage.getItem('iki-cart'))

      if (products) {
        this.SET_CART_PRODUCTS(products)
      }
    },

    isLogged() {
      return isLoggedIn()
    },

    loc_logout() {
      localStorage.removeItem('_auth')
      this.$router.push('/')
      location.reload()
    },
  },
  setup() {
    const store = useStore()
    //console.log(111, 'setup:', store.state.loggedUser)
    watch(store.state, () => {
      store.state.theme === 'dark'
        ? document.body.classList.add('dark-theme')
        : document.body.classList.remove('dark-theme')
    })

    store.state.theme === 'dark'
      ? document.body.classList.add('dark-theme')
      : document.body.classList.remove('dark-theme')
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
.container-xl,
.container-lg,
.container-md,
.container-sm,
.container {
  max-width: 1440px !important;
}
// @import 'toastr/toastr.scss';
</style>
<style src="@/assets/css/toastr.min.css"></style>
<style src="@vueform/multiselect/themes/default.css"></style>
