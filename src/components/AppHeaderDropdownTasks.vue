<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" :caret="false">
      <CIcon class="my-1 mx-2" icon="cil-list" size="lg" />
      <CBadge
        class="position-absolute top-0 end-0"
        color="warning-gradient"
        shape="rounded-pill"
        >{{ itemsCount }}</CBadge
      >
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader class="bg-light" style="text-align: center">
        <strong>Account</strong>
      </CDropdownHeader>
      <CDropdownItem class="d-block">
        <div class="small mb-1" @click="calRouter('/users/0')">
          Thông tin người dùng
          <span class="float-right"><strong></strong></span>
        </div>
        <CProgress thin color="info-gradient" />
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="small mb-1" @click="calRouter('/ketoan/user_kt')">
          Sửa thông tin người dùng
          <span class="float-right"><strong></strong></span>
        </div>
        <CProgress thin color="danger-gradient" :value="25" />
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="small mb-1" @click="calRouter('/ketoan/contact')">
          Thông tin tác giả
          <span class="float-right"><strong>50%</strong></span>
        </div>
        <CProgress thin color="warning-gradient" :value="50" />
      </CDropdownItem>
      <CDropdownItem
        class="d-block"
        href="https://coreui.io/demo/4.0/index.html"
        target="_blank"
      >
        <div class="small mb-1">
          CoreUI Vue Pro <span class="float-right"><strong>75%</strong></span>
        </div>
        <CProgress thin color="info-gradient" :value="75" />
      </CDropdownItem>
      <CDropdownItem
        class="d-block"
        href="https://v3.vuejs.org/guide/introduction.html"
        target="_blank"
      >
        <!-- target="_blank"  Mở trang mới -->
        <div class="small mb-1">
          VueJS 3.x
          <span class="float-right"><strong>100%</strong></span>
        </div>
        <CProgress thin color="success-gradient" :value="100" />
      </CDropdownItem>
      <CDropdownItem class="text-center border-top">
        <strong>Ketoan.ACN</strong>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TheHeaderDropdownTasks',
  data() {
    return { itemsCount: 15 }
  },
  setup() {
    const router = useRouter()
    const calRouter = (query) => {
      router.push(query)
    }
    return {
      calRouter,
    }
  },
}
</script>
