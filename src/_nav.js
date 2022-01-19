export default [
  {
    component: 'CNavItem',
    name: 'ACN',
    to: '/dashboard',
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
    to: '/base',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: 'CNavItem',
        name: 'Breadcrumbs',
        to: '/base/breadcrumbs',
      },
      {
        component: 'CNavItem',
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: 'CNavItem',
        name: 'Tooltips',
        to: '/base/tooltips',
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
  {
    component: 'CNavGroup',
    name: 'Games',
    to: '/games',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: 'Peek-a-vue-main',
        to: '/games/peek-a-vue-main',
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
        icon: 'cil-bolt-circle',
      },
      {
        component: 'CNavItem',
        name: 'Sao lưu bảng dữ liệu',
        to: '/users/ACCOUNT-backupTable',
        icon: 'cil-bolt-circle',
      },
      {
        component: 'CNavItem',
        name: 'Phục hồi dữ liệu',
        to: '/users/ACCOUNT-restoreData',
        icon: 'cil-bolt-circle',
        isAdmin: true,
        badge: {
          color: 'info',
          text: 'ad',
        },
      },
      {
        component: 'CNavItem',
        name: 'Nâng cấp Kế toán Vfp',
        to: '/users/ACCOUNT-vfpupload',
        isAdmin: true,
        badge: {
          color: 'warning',
          text: 'ad',
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

  // ========================
  {
    component: 'CNavTitle',
    name: 'Theme',
  },
  {
    component: 'CNavItem',
    name: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavTitle',
    name: 'Components',
  },
  {
    component: 'CNavGroup',
    name: 'Base',
    to: '/base',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: 'CNavItem',
        name: 'Breadcrumbs',
        to: '/base/breadcrumbs',
      },
      {
        component: 'CNavItem',
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: 'CNavItem',
        name: 'Carousels',
        to: '/base/carousels',
      },
      {
        component: 'CNavItem',
        name: 'Collapses',
        to: '/base/collapses',
      },
      {
        component: 'CNavItem',
        name: 'List Groups',
        to: '/base/list-groups',
      },
      {
        component: 'CNavItem',
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: 'CNavItem',
        name: 'Paginations',
        to: '/base/paginations',
      },
      {
        component: 'CNavItem',
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: 'CNavItem',
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: 'CNavItem',
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: 'CNavItem',
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: 'CNavItem',
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: 'CNavItem',
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Buttons',
    to: '/buttons',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: 'Buttons',
        to: '/buttons/standard-buttons',
      },
      {
        component: 'CNavItem',
        name: 'Button Groups',
        to: '/buttons/button-groups',
      },
      {
        component: 'CNavItem',
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Forms',
    to: '/forms',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: 'CNavItem',
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: 'CNavItem',
        name: 'Multi Select',
        to: '/forms/multi-select',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: 'CNavItem',
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: 'CNavItem',
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: 'CNavItem',
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: 'CNavItem',
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: 'CNavItem',
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: 'CNavItem',
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Icons',
    to: '/icons',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'CoreUI Icons',
        to: '/icons/coreui-icons',
        badge: {
          color: 'info',
          text: 'NEW',
        },
      },
      {
        component: 'CNavItem',
        name: 'Brands',
        to: '/icons/brands',
      },
      {
        component: 'CNavItem',
        name: 'Flags',
        to: '/icons/flags',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Notifications',
    to: '/notifications',
    icon: 'cil-bell',
    items: [
      {
        component: 'CNavItem',
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: 'CNavItem',
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: 'CNavItem',
        name: 'Modals',
        to: '/notifications/modals',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Widgets',
    to: '/widgets',
    icon: 'cil-calculator',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Smart Table',
    to: '/smart-table',
    icon: 'cil-grid',
    badge: {
      color: 'danger',
      text: 'PRO',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Plugins',
  },
  {
    component: 'CNavItem',
    name: 'Calendar',
    to: '/calendar',
    icon: 'cil-calendar',
    badge: {
      color: 'danger',
      text: 'PRO',
    },
  },
  {
    component: 'CNavItem',
    name: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie',
  },
  {
    component: 'CNavTitle',
    name: 'Extras',
  },
  {
    component: 'CNavGroup',
    name: 'Pages',
    to: '/pages',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'Login',
        to: '/pages/login',
      },
      {
        component: 'CNavItem',
        name: 'Register',
        to: '/pages/register',
      },
      {
        component: 'CNavItem',
        name: 'Error 404',
        to: '/pages/404',
      },
      {
        component: 'CNavItem',
        name: 'Error 500',
        to: '/pages/500',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Apps',
    to: '/apps',
    icon: 'cil-layers',
    items: [
      {
        component: 'CNavGroup',
        name: 'Invoicing',
        to: '/apps/invoicing',
        icon: 'cil-spreadsheet',
        items: [
          {
            component: 'CNavItem',
            name: 'Invoice',
            to: '/apps/invoicing/invoice',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
        ],
      },
      {
        component: 'CNavGroup',
        name: 'Email',
        to: '/apps/email',
        icon: 'cil-envelope-closed',
        items: [
          {
            component: 'CNavItem',
            name: 'Inbox',
            to: '/apps/email/inbox',
            icon: 'cil-envelope-closed',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
          {
            component: 'CNavItem',
            name: 'Message',
            to: '/apps/email/message',
            icon: 'cil-envelope-open',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
          {
            component: 'CNavItem',
            name: 'Compose',
            to: '/apps/email/compose',
            icon: 'cil-envelope-letter',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
        ],
      },
    ],
  },
]
