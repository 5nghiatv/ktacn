//export default [
exports.nav1 = [
  {
    component: 'CNavItem',
    name: 'ACN',
    to: '/documents',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Kế toán Doanh Nghiệp',
  },
  {
    component: 'CNavItem',
    name: 'Nhập liệu',
    to: '/ketoan/chungtu-kt',
    icon: 'cil-drop',
  },
  {
    component: 'CNavGroup',
    name: 'In Chứng từ',
    to: '/ketoan/reports/inphieuthuchi/All',
    icon: 'cil-print',
    items: [
      {
        component: 'CNavItem',
        name: 'Phiếu Thu chi',
        to: '/ketoan/reports/inphieuthuchi/All',
      },
      {
        component: 'CNavItem',
        name: 'Phiếu Nhập xuất',
        to: '/ketoan/reports/inphieunhapxuat/All',
      },
      {
        component: 'CNavItem',
        name: 'Phiếu Kế toán',
        to: '/ketoan/reports/inphieuketoan/All',
      },
      {
        component: 'CNavItem',
        name: 'Hóa đơn Bán hàng',
        to: '/ketoan/reports/inhoadon/All',
      },
      {
        component: 'CNavItem',
        name: 'Ủy Nhiệm Chi',
        to: '/users/ACCOUNT-uynhiemchi',
        badge: {
          color: 'info',
          text: 'unc',
        },
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Danh mục Kế toán',
    to: '/ketoan/dm-ketoan/dmtkhoan-kt',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: 'Danh mục Tài khoản',
        to: '/ketoan/dm-ketoan/dmtkhoan-kt',
      },
      {
        component: 'CNavItem',
        name: 'Danh mục Tiền tệ',
        to: '/ketoan/dm-ketoan/dmtiente-kt',
      },
      {
        component: 'CNavItem',
        name: 'Danh mục Khách hàng',
        to: '/ketoan/dm-ketoan/customer-kt',
      },
      {
        component: 'CNavItem',
        name: 'Cân đối phát sinh',
        to: '/ketoan/dm-ketoan/dmsodutk-kt',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Danh mục Hàng hóa',
    to: '/buttons',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: 'Danh mục Hàng hóa',
        to: '/ketoan/dm-hanghoa/tenhang-kt',
      },
      {
        component: 'CNavItem',
        name: 'Danh mục Kho hàng',
        to: '/ketoan/dm-hanghoa/dmtenkho-kt',
      },
      {
        component: 'CNavItem',
        name: 'Nhập xuất tồn kho',
        to: '/ketoan/dm-hanghoa/dmkhohang-kt',
      },
    ],
  },
  //============= Báo cáo Kế toán
  {
    component: 'CNavTitle',
    name: 'Báo cáo Kế toán',
  },
  {
    component: 'CNavItem',
    name: 'Cân đối Kế toán',
    to: '/ketoan/bc-ketoan/cdketoan-kt',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Kết quả Kinh Doanh',
    to: '/ketoan/bc-ketoan/ketquakd-kt',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavItem',
    name: 'Lưu chuyển Tiền tệ',
    to: '/ketoan/bc-ketoan/lctiente-kt',
    icon: 'cil-pencil',
  },
  //============= Khai báo Thuế
  {
    component: 'CNavTitle',
    name: 'Khai báo Thuế',
  },
  {
    component: 'CNavItem',
    name: 'Tờ Khai 01/GTGT',
    to: '/users/KK_01_GTGT.xml',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Báo cáo Hóa đơn BC26',
    to: '/users/KK-HOADON-BC26.xml',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavItem',
    name: 'Báo cáo Tài chính-xml',
    to: '/users/KK-BC-TAICHINH.xml',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavItem',
    name: 'Báo cáo Tài chính-xls',
    to: '/users/TM-BC-TAICHINH.xlsx',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavItem',
    name: 'Tờ Khai 03/TNDN',
    to: '/users/KK-03-TNDN.xml',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavGroup',
    name: 'Bảng kê Hóa đơn',
    to: '/games',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: 'Bảng kê Hóa đơn đầu vào',
        to: '/users/KK-GTGT-10',
        icon: 'cil-arrow-circle-right',
      },
      {
        component: 'CNavItem',
        name: 'Bảng kê Thuế VAT đầu vào',
        to: '/users/KK-GTGT-11',
        icon: 'cil-arrow-circle-right',
      },
      {
        component: 'CNavItem',
        name: 'Bảng kê Hóa đơn đầu ra',
        to: '/users/KK-GTGT-20',
        icon: 'cil-arrow-circle-left',
      },
      {
        component: 'CNavItem',
        name: 'Bảng kê Thuế VAT đầu ra',
        to: '/users/KK-GTGT-21',
        icon: 'cil-arrow-circle-left',
      },
    ],
  },
  // ============= Quản lý Kế toán
  {
    component: 'CNavTitle',
    name: 'Quản lý Kế toán',
  },
  {
    component: 'CNavGroup',
    name: 'Sao lưu - Phục hồi',
    to: '/games',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: 'Sao lưu toàn bộ',
        to: '/users/ACCOUNT-backupData',
      },
      {
        component: 'CNavItem',
        name: 'Sao lưu bảng dữ liệu',
        to: '/users/ACCOUNT-backupTable',
      },
      {
        component: 'CNavItem',
        name: 'Phục hồi dữ liệu',
        to: '/users/ACCOUNT-restoreData',
        meta: { isAdmin: true },
        badge: {
          color: 'danger',
          text: 'ad',
        },
      },
      {
        component: 'CNavItem',
        name: 'Nâng cấp Kế toán-',
        to: '/users/ACCOUNT-vfpupload',
        meta: { isAdmin: true },
        badge: {
          color: 'warning',
          text: 'Vfp',
        },
      },
    ],
  },
  // Quản trị hệ thống
  {
    component: 'CNavGroup',
    name: 'Quản trị hệ thống',
    to: '/games',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: 'Kết nối Dữ liệu',
        to: '/ketoan/connect_kt',
      },
      {
        component: 'CNavItem',
        name: 'Danh sách Người dùng',
        to: '/ketoan/user_kt',
      },
    ],
  },
]
