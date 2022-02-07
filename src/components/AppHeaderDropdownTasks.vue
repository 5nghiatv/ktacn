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
        <div class="small mb-1" @click="thongtin(1)">
          Thông tin người dùng
          <span class="float-right"><strong></strong></span>
        </div>
        <CProgress thin color="info-gradient" />
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="small mb-1" @click="thongtin(2)">
          Sửa thông tin người dùng
          <span class="float-right"><strong></strong></span>
        </div>
        <CProgress thin color="danger-gradient" :value="25" />
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="small mb-1" @click="thongtin(3)">
          Thông tin tác giả
          <span class="float-right"><strong>50%</strong></span>
        </div>
        <CProgress thin color="warning-gradient" :value="50" />
      </CDropdownItem>
      <CDropdownItem class="d-block" @click="thongtin(4)">
        <div class="small mb-1">
          CoreUI Vue Pro <span class="float-right"><strong>75%</strong></span>
        </div>
        <CProgress thin color="info-gradient" :value="75" />
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="small mb-1">
          Angular 2 Cli
          <span class="float-right"><strong>100%</strong></span>
        </div>
        <CProgress thin color="success-gradient" :value="100" />
      </CDropdownItem>
      <CDropdownItem class="text-center border-top" @click="thongtin(3)">
        <strong>Ketoan.ACN</strong>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
<script>
export default {
  name: 'TheHeaderDropdownTasks',
  data() {
    return { itemsCount: 15 }
  },
  setup() {
    const thongtin = (opt) => {
      alert(opt)
    }
    return {
      thongtin,
    }
  },
}
</script>
