
const { nav1 } = require('./src/_nav1.js')
let nav = [...nav1]

console.log(nav)

// ======== New add
// this.infoketoan = this.$jwtAcn.getKetoan()
// this.$i18n.locale = this.infoketoan.locale
// this.$store.state.locale = this.infoketoan.locale

// var obj = nav
// var item = []
// var isAdmin = this.$jwtAcn.getUser('admin') // Lỗi this.$store.getters.isAdmin reset Khi reload trangweb
// loop1: for (let index = 0; index < obj.length; index++) {
//   // if (index < itemCount) {
//     if (
//       typeof obj[index].items != 'undefined' &&
//       obj[index].items.length > 0
//     ) {
//       obj[index].name = this.$t('navRight.' + obj[index].name0)
//       obj[index].items.forEach((element) => {
//         if (
//           typeof element.isAdmin != 'undefined' &&
//           element.isAdmin &&
//           !isAdmin
//         ) {
//           element.to = 'EXCLUDE'
//         }
//         if (element.name in this.$t('navRight'))
//           element.name = this.$t('navRight.' + element.name0)
//       })
//     } else {
//       if (typeof obj[index]._children != 'undefined') {
//         obj[index]._children[0] = this.$t(
//           'navRight.' + obj[index]._children[0],
//         )
//       } else {
//         obj[index].name = this.$t('navRight.' + obj[index].name0)
//       }
//     }
//     item.push(obj[index])
//   }
// }
// nav = item
// console.log(111, nav)
