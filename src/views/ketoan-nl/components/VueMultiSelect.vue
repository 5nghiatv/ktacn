<template>
  <div class="flex">
    <CRow class="multiselect" style="padding-left: 15px">
      <multiselect
        required
        @input="getCurrentList()"
        v-model="modelValue"
        :preserve-search="true"
        :preselect-first="true"
        placeholder="Select list.."
        :label="selectOpt.code"
        :track-by="selectOpt.code"
        :options="selectOpt.options"
        :custom-label="customLabel"
      >
        <template v-slot:option="props">
          <span class="option__title">{{ props.option[selectOpt.code] }}</span>
          <div class="option__desc">
            <span class="option__small">{{
              props.option[selectOpt.name]
            }}</span>
          </div>
        </template>
      </multiselect>
      <!-- <pre class="language-json"><code>{{ company.connect_id  }}</code></pre> -->
    </CRow>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'MultiSelect',
  components: {
    Multiselect,
  },
  props: ['currentOpt', 'modelOpt', 'reloadList', 'titleOpt'],
  data() {
    return {
      optKetoan: ['Tài khoản', 'Khách hàng', 'Hàng hóa', 'Kho hàng'],
      taikhoan: [],
      khachhang: [],
      hanghoa: [],
      khohang: [],
      selectOpt: {
        options: [],
        code: '',
        name: '',
      },
      modelValue: null,
    }
  },
  updated() {
    this.modelValue = this.modelOpt // Phải ở đây mới OK
    //console.log(221,this.modelOpt, this.currentOpt, this.titleOpt);
  },
  mounted() {
    this.resetDanhmuc()
    this.setupOptions(this.currentOpt)
    //this.modelValue = this.modelOpt;
  },
  created() {
    // Phải khởi động mới được
  },
  methods: {
    ...mapMutations('myDocument', []),
    ...mapActions('myDocument', []),

    customLabel(selectOpt) {
      if (this.titleOpt) {
        if (this.currentOpt == 0)
          return `${selectOpt.sotk} - ${selectOpt.tentk}`
        if (this.currentOpt == 1)
          return `${selectOpt.maso} - ${selectOpt.company}`
        if (this.currentOpt == 2)
          return `${selectOpt.mahang} - ${selectOpt.tenhang}`
        if (this.currentOpt == 3)
          return `${selectOpt.makho} - ${selectOpt.tengoi}`
      } else {
        if (this.currentOpt == 0) return `${selectOpt.sotk}`
        if (this.currentOpt == 1) return `${selectOpt.maso}`
        if (this.currentOpt == 2) return `${selectOpt.mahang}`
        if (this.currentOpt == 3) return `${selectOpt.makho}`
      }
    },

    getCurrentList() {
      if (!this.modelValue) return // Phải có
      this.resetDanhmuc()
      switch (this.currentOpt) {
        case 1:
          this.khachhang = {
            masoId: this.modelValue.id,
            company: this.modelValue.company,
            address: this.modelValue.address,
            maso: this.modelValue.maso,
            ghichu: this.modelValue.ghichu,
          }
          break
        // return this.$emit("getCurrentList",this.khachhang);
        case 2:
          this.hanghoa = {
            mahangId: this.modelValue.id,
            mahang: this.modelValue.mahang,
            tenhang: this.modelValue.tenhang,
            donvi: this.modelValue.donvi,
          }
          break
        // return this.$emit("getCurrentList",this.hanghoa);
        case 3:
          this.khohang = {
            makhoId: this.modelValue.id,
            makho: this.modelValue.makho,
            tengoi: this.modelValue.tengoi,
            diachi: this.modelValue.diachi,
          }
          break
        // return this.$emit("getCurrentList",this.khohang);
        default:
          this.taikhoan = {
            sotkId: this.modelValue.id,
            sotk: this.modelValue.sotk,
            tentk: this.modelValue.tentk,
          }
          break
        // return this.$emit("getCurrentList",this.taikhoan);
      }
      return this.$emit('getCurrentList', {
        taikhoan: this.taikhoan,
        khachhang: this.khachhang,
        hanghoa: this.hanghoa,
        khohang: this.khohang,
      })
    },
    resetDanhmuc() {
      this.taikhoan = {
        sotk: null,
        tentk: null,
      }
      this.khachhang = {
        company: null,
        address: null,
        maso: null,
        ghichu: null,
      }
      this.hanghoa = {
        mahang: null,
        tenhang: null,
        donvi: null,
      }
      this.khohang = {
        makho: null,
        tengoi: null,
        diachi: null,
      }
    },
    setupOptions() {
      switch (this.currentOpt) {
        case 1:
          this.selectOpt = {
            options: this.danhmucCustomer,
            code: 'maso',
            name: 'company',
          }
          break
        case 2:
          this.selectOpt = {
            options: this.danhmucTenhang,
            code: 'mahang',
            name: 'tenhang',
          }
          break
        case 3:
          this.selectOpt = {
            options: this.danhmucKhohang,
            code: 'makho',
            name: 'tengoi',
          }
          break
        default:
          this.selectOpt = {
            options: this.danhmucTaikhoan,
            code: 'sotk',
            name: 'tentk',
          }
          break
      }
    },
  },
  computed: {
    ...mapState('myDocument', [
      'danhmucKhohang',
      'danhmucTenhang',
      'danhmucCustomer',
      'danhmucTaikhoan',
    ]),
  },

  watch: {
    reloadList() {
      // reloadList oncly
      this.modelValue = null
      this.setupOptions()
    },
    currentOpt() {
      this.modelValue = null
      this.setupOptions()
    },
  },
}
</script>
