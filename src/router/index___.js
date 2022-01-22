import Vue from 'vue'
import Router from 'vue-router'

// import LanguageSwitcher from '@/containers/LanguageSwitcher.vue'  //  import from TheHeader.vue

// views/ketoan

// const Homecomerce = () => import('@/views/e-commerce/Homecomerce')
// const Profile = () => import('@/views/e-commerce/Profile')
// const About = () => import('@/views/e-commerce/About')
// const Products = () => import('@/views/e-commerce/Products')
// const Orders = () => import('@/views/e-commerce/Orders')
// const Transaction = () => import('@/views/e-commerce/Transaction')
const Contact = () => import('@/views/ketoan/Contact')
const Connect_kt = () => import('@/views/ketoan/Connect-kt')
const User_kt = () => import('@/views/ketoan/User-kt')

const Inhoadon = () => import('@/views/ketoan/reports/Inhoadon')
const Inphieuketoan = () => import('@/views/ketoan/reports/Inphieuketoan')
const Inphieunhapxuat = () => import('@/views/ketoan/reports/Inphieunhapxuat')
const Inphieuthuchi = () => import('@/views/ketoan/reports/Inphieuthuchi')

const Cdketoan_kt = () => import('@/views/ketoan/bc-ketoan/Cdketoan-kt')
const Ketquakd_kt = () => import('@/views/ketoan/bc-ketoan/Ketquakd-kt')
const Lctiente_kt = () => import('@/views/ketoan/bc-ketoan/Lctiente-kt')

const Chungtu_kt = () => import('@/views/ketoan/Chungtu-kt')

// Containers:[TheSidebar, TheFooter, TheHeader: [TheHeaderDropdownAccnt ,LanguageSwitcher] ]
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'invoice',
          redirect: '/invoice/invoicefb',
          name: 'Invoice',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/invoice/invoicefb',
              name: 'Invoicefb',
              component: () => import('@/views/invoice-fbase/Invoicefb')
            },
            {
              path: "/invoice/:invoiceId",
              name: "InvoiceView",
              component: () => import('@/views/invoice-fbase/views/InvoiceView')
            },
          ],
        },
        {
          path: 'games',
          redirect: '/games/dragonconquer',
          name: 'games',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/games/dragonconquer',
              name: 'dragonconquer',
              component: () => import('@/views/games/dragon-conquer/dragonconquer')
            },
            {
              path: '/games/dicegame',
              name: 'dicegame',
              component: () => import('@/views/games/dice-game/dicegame')
            },
            {
              path: '/games/flipcard',
              name: 'flipcard',
              component: () => import('@/views/games/flip-card/flipcardgame')
            },
          ],
        },
        {
          path: 'ecommerce',
          redirect: '/e-commerce/home',
          name: 'ecommerce',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/e-commerce/home',
              name: 'homecomerce',
              component: () => import('@/views/e-commerce/Homecomerce')
            },
            {
              path: '/e-commerce/products',
              name: 'products',
              component: () => import('@/views/e-commerce/Products')
            },
            {
              path: '/e-commerce/transaction',
              name: 'transaction',
              component: () => import('@/views/e-commerce/Transaction')
            },
            {
              path: '/e-commerce/orders',
              name: 'orders',
              component: () => import('@/views/e-commerce/Orders')
            },
            {
              path: '/e-commerce/about',
              name: 'about',
              component: () => import('@/views/e-commerce/About')
            },
            {
              path: '/e-commerce/products/:id',
              name: 'productDetails',
              component: () => import('@/components/products/ProductDetail.vue')
            },
            {
              path: '/e-commerce/cart',
              name: 'cart',
              component: () => import('@/components/products/cart/CartProducts.vue'),
            },
            {
                path: '/e-commerce/checkout',
                name: 'checkout',
                component: () => import('@/components/products/cart/Checkout.vue'),
            },
            {
              path: '/e-commerce/success',
              name: 'success',
              component: () => import('@/views/e-commerce/Homecomerce')
              // Xử lý thành công ----> created().CardTemplate()
            },
          ]
        },
  // const Dmtkhoan_kt = () => import('@/views/ketoan/dm-ketoan/Dmtkhoan-kt')
  // const Dmtiente_kt = () => import('@/views/ketoan/dm-ketoan/Dmtiente-kt')
  // const Customer_kt = () => import('@/views/ketoan/dm-ketoan/Customer-kt')
  // const Dmsodutk_kt = () => import('@/views/ketoan/dm-ketoan/Dmsodutk-kt')
        {
          path: 'ketoan/dm-ketoan',
          redirect: '/ketoan/dm-ketoan/Dmtkhoan-kt',
          name: 'dm-ketoan',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/ketoan/dm-ketoan/dmtkhoan-kt',
              name: 'Dmtkhoan-kt',
              component: () => import('@/views/ketoan/dm-ketoan/Dmtkhoan-kt')
            },
            {
              path: '/ketoan/dm-ketoan/dmtiente-kt',
              name: 'Dmtiente-kt',
              component: () => import('@/views/ketoan/dm-ketoan/Dmtiente-kt')
            },
            {
              path: '/ketoan/dm-ketoan/customer-kt',
              name: 'Customer-kt',
              component: () => import('@/views/ketoan/dm-ketoan/Customer-kt')
            },
            {
              path: '/ketoan/dm-ketoan/Dmsodutk-kt',
              name: 'Dmsodutk-kt',
              component: () => import('@/views/ketoan/dm-ketoan/Dmsodutk-kt')
            },
          ]
        },
  // const Tenhang_kt = () => import('@/views/ketoan/dm-hanghoa/Tenhang-kt')
  // const Dmkhohang_kt = () => import('@/views/ketoan/dm-hanghoa/Dmkhohang-kt')
  // const Dmtenkho_kt = () => import('@/views/ketoan/dm-hanghoa/Dmtenkho-kt')
        {
          path: 'ketoan/dm-hanghoa',
          redirect: '/ketoan/dm-hanghoa/tenhang-kt',
          name: 'dm-hanghoa',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/ketoan/dm-hanghoa/tenhang-kt',
              name: 'Tenhang-kt',
              component: () => import('@/views/ketoan/dm-hanghoa/Tenhang-kt')
            },
            {
              path: '/ketoan/dm-hanghoa/dmtenkho-kt',
              name: 'dmtenkho-kt',
              component: () => import('@/views/ketoan/dm-hanghoa/Dmtenkho-kt')
            },
            {
              path: '/ketoan/dm-hanghoa/dmkhohang-kt',
              name: 'Dmkhohang-kt',
              component: () => import('@/views/ketoan/dm-hanghoa/Dmkhohang-kt')
            },
          ]
        },
  // const Employee = () => import('@/views/ketoan/dm-khac/Employee')
  // const Customer = () => import('@/views/ketoan/dm-khac/Customer')
  // const Product = () => import('@/views/ketoan/dm-khac/Product')
  // const Complextable = () => import('@/views/ketoan/dm-khac/Complex-table')
  // const Inlinetable = () => import('@/views/ketoan/dm-khac/Inline-table')
        {
          path: 'ketoan/dm-khac',
          redirect: '/ketoan/dm-khac/employee',
          name: 'dm-khac',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/ketoan/dm-khac/employee',
              name: 'Employee',
              component: () => import('@/views/ketoan/dm-khac/Employee')
            },
            {
              path: '/ketoan/dm-khac/customer',
              name: 'Customer',
              component: () => import('@/views/ketoan/dm-khac/Customer')
            },
            {
              path: '/ketoan/dm-khac/product',
              name: 'Product',
              component: () => import('@/views/ketoan/dm-khac/Product')
            },
            {
              path: '/ketoan/dm-khac/complex-table',
              name: 'Complex-table',
              component: () => import('@/views/ketoan/dm-khac/Complex-table')
            },
            {
              path: '/ketoan/dm-khac/inline-table',
              name: 'Inline-table',
              component: () => import('@/views/ketoan/dm-khac/Inline-table')
            },
          ]
        },


            //----------
            {
              path: 'ketoan',
              redirect: '/ketoan/chungtu-kt',
              name: 'Ketoan',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '/ketoan/contact',
                  name: 'contact',
                  component: Contact
                },
                {
                  path: 'reports/inphieuketoan/:ctid',
                  name: 'Inphieuketoan',
                  component: Inphieuketoan
                },
                {
                  path: 'reports/inphieunhapxuat/:ctid',
                  name: 'Inphieunhapxuat',
                  component: Inphieunhapxuat
                },
                {
                  path: 'reports/inphieuthuchi/:ctid',
                  name: 'Inphieuthuchi',
                  component: Inphieuthuchi
                },
                {
                  path: 'reports/inhoadon/:ctid',
                  name: 'Inphoadon',
                  component: Inhoadon
                },
                {
                  path: 'bc-ketoan/cdketoan-kt',
                  name: 'Cdketoan',
                  component: Cdketoan_kt
                },
                {
                  path: 'bc-ketoan/ketquakd-kt',
                  name: 'Ketquakd',
                  component: Ketquakd_kt
                },
                {
                  path: 'bc-ketoan/lctiente-kt',
                  name: 'Lctiente',
                  component: Lctiente_kt
                },
                {
                  path: 'chungtu-kt',
                  name: 'Chungtu',
                  component: Chungtu_kt
                },
                {
                  path: 'connect_kt',
                  name: 'Connect_kt',
                  component: Connect_kt
                },
                {
                  path: 'user_kt',
                  name: 'User_kt',
                  component: User_kt
                },
                {
                  path: '/documents',
                  name: 'Documents',
                  component: () => import('@/views/ketoan-nl/DocumentList')
                },    
              ]
            },
            //-----------------
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users/:file',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Icons library',
              component: CoreUIIcons
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register/:id',
          name: 'Register',
          component: Register
        },
        { path: '*', redirect: '/pages/404' }


      ]
    }
  ]
}


