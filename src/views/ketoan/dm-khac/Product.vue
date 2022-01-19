<template>

    <div>

    <CRow v-if="updaterec">
      <CCol sm="12">
        <CCard>
          <CCardHeader style= "font-size: 25px;">
           Product Update
          </CCardHeader>
          <CCardBody>
            <CForm>
               <CRow>
                    <CCol col=7>
                        <CInput  v-model="todo.productName" type="text" id="focus_todo" prepend=" Name product">
                        </CInput>
                    </CCol>
                    <CCol col=5>
                        <CInput  v-model="todo.productCategory" type="text" prepend="Category">
                        </CInput>
                    </CCol>
               </CRow>
               <CRow>
                    <CCol col=9>
                        <CInput  v-model="todo.productImage" type="text" prepend="Picture" >
                        </CInput>
                    </CCol>
                    <CCol col=3>
                        <CInput  v-model="todo.productPrice" type="text" prepend="Price">
                        </CInput>
                    </CCol>
               </CRow>
               <CRow>
                    <CCol col=12>
                        <CInput  v-model="todo.productSeller" type="text" prepend="Product Seller" >
                        </CInput>
                    </CCol>
               </CRow>
              <div class="form-group form-actions">
                <CButton class="btn btn-info btn-sm" @click="createTodo()" id="addnew"> Add New </CButton>&nbsp;&nbsp;
                <CButton class="btn btn-info btn-sm" @click="updateTodo()" :disabled="!todo._id" id="update" > Update </CButton>&nbsp;&nbsp;
                <CButton class="btn btn-outline-info btn-sm" @click="restore()" id="restore"> >> Restore </CButton>&nbsp;&nbsp;
                <CButton class="btn btn-outline-warning btn-sm" @click="setAddnew()" id="close"> >> Close </CButton>

              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
     
          <h2 style="font-size: 25px; padding-left: 20px;">Products list
              <a class="btn btn-outline-info btn-sm" style="float:right;" id="createNew" ref="createNew" @click="setAddnew()" > ++ Create New</a>
              <a class="btn btn-outline-info btn-sm" style="float:right;" id="createexcel" ref="createexcel" @click="exportExcel()" > >> Excel</a>
              <a class="btn btn-outline-info btn-sm" style="float:right;" id="createzip" ref="createzip" @click="exportZip()" > >> Zip</a>
          </h2>

     
          <vue-good-table id="tableACN"
            :columns="columns"
            :rows="todos"
            theme=""
            @on-cell-click="onCellClick"
            styleClass="vgt-table condensed bordered striped"
            max-height="20000px"
            :fixed-header="false"
            :line-numbers="this.colchecked"
            :pagination-options="{
              enabled: true,
              mode: 'pages',
              perPage: 15,
              position: 'top',
              perPageDropdown: [15,30,50,100,300,500],
              dropdownAllowAll: true,
              setCurrentPage: 1,
              nextLabel: 'Sau',
              prevLabel: 'Trước',
              rowsPerPageLabel: 'Dòng/trang',
              ofLabel: 'of',
              pageLabel: 'Trang', // for 'pages' mode
              allLabel: 'All',
             }"
            :search-options="{
                enabled: true,
                trigger: 'enter',
                skipDiacritics: true,
                placeholder: 'Tìm nội dung (.)',
              }">

            <div slot="table-actions">
                <input title="Trang đầu hoặc cuối" style="margin-right: 20px;" class="btn btn-info" @change="goTopEndPages()" type="checkbox" id="vehicle1" name="vehicle1" value="true">
                <input title="view column" style="margin-right: 20px;" class="btn btn-info" @change="colOption()" v-model="colchecked" type="checkbox" id="vehicle1" name="vehicle1" value="colchecked">
            </div>
            <div slot="table-actions-bottom">
            </div>
            <div slot="emptystate">
            </div>

          </vue-good-table>
          <br/>

    </div>


</template>
<script>

    import 'vue-good-table/dist/vue-good-table.css'
    import { VueGoodTable } from 'vue-good-table';
    import { APIService } from "../../../APIService";
    import moment from 'moment'
    const apiService = new APIService();
    import XLSX from 'xlsx';
    import utility from "../../../common/utility";

    export default {
        name: "Product",
        mixins: [utility],
        components: {
            VueGoodTable,
            moment
        },
        data() {
            return {
                todoB: {},
                todos: [],
                todo: {},
                models: 'products',
                model: 'product',
                numberOfTodos: 0,
                colchecked: true,
                updaterec: false,
                infoprint: '',
                optprint: false,

                columns: [
                    {
                        label: 'Product Name',
                        field: 'productName',
                    },
                    {
                        label: 'Category',
                        field: 'productCategory',
                    },
                    {
                        label: 'Product Seller',
                        field: 'productSeller',
                    },
                    {
                        label: 'Price',
                        field: 'productPrice',
                        tdClass: 'text-right',
                    },
                    {   label: 'Hiệu chỉnh',
                        field: 'btnedit',
                        html: true,
                        tdClass: 'text-center',
                        width: '90px',    // Phải có  110 - btn +40
                        //hidden: !this.optprint,
                    },
                ],
            };
        },

        methods: {
            shuffleArray (array) {
                for (let i = array.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1))
                    let temp = array[i]
                    array[i] = array[j]
                    array[j] = temp
                }
                return array
            },
            editTodo(index){
                var dat = this.todos[index]
                this.todo = dat     // Cho sửa
                this.todoB = {      // Lưu Phải đổi tên FIELD MỚI OK
                    _id_: dat._id,
                    productName_: dat.productName,
                    productCategory_: dat.productCategory,
                    productPrice_: dat.productPrice,
                    productSeller_: dat.productSeller,
                    productImage_: dat.productImage,
                    index_: index
                }
                this.updaterec = true
                this.$refs.createNew.innerHTML = ">> Close"
                $('#focus_todo').trigger('focus')
            },
            restore() {
                if(!this.updaterec ) return;
                var dat = this.todoB    // Phải đổi tên FIELD & dùng ['abc'] MỚI OK
                this.todo['_id'] = dat._id_
                this.todo['productName'] = dat.productName_
                this.todo['productCategory'] = dat.productCategory_
                this.todo['productPrice'] = dat.productPrice_
                this.todo['productSeller'] = dat.productSeller_
                this.todo['productImage'] = dat.productImage_
            },
            reset() {
                this.todo = {
                    _id: '',
                    productName: '',
                    productCategory: '',
                    productPrice: '',
                    productSeller: '',
                    productImage: '',
                    }
            },
            setAddnew() {
                this.updaterec =  !this.updaterec
                this.$refs.createNew.innerHTML = this.updaterec ? ">> Close" : "++ Create New"
                if(this.updaterec) {
                    this.reset()
                     $('#focus_todo').trigger('focus')
                }else this.restore()
            },

            colOption()
            {
                //this.columns[5].hidden = !this.colchecked ;
                this.columns[5].hidden = !this.colchecked || this.optprint;
            },

            onCellClick(params) {
                if(params.column.field == 'btnedit' ){
                    switch (params.event.srcElement.id) {
                        case '1' : this.editTodo(params.row.originalIndex ,params.row) ;break;
                        case '2' : this.deleteTodo(params.row.originalIndex ,params.row) ;break;
                    }
                }
            },
            selectTodo(todo){
                this.todos = todo ;
            },
            getTodos() {
                apiService.getTodos(this.models).then((data) => {
                    this.numberOfProducts = data.count;
                    this.todos = data;
                    this.todos.forEach((item,index) => {
                        // this.$set(item, "sotien",this.number_format(item['sotien'],0,',','.'));
                        // this.$set(item, "ngoaite",this.number_format(item['ngoaite'],2,',','.'));
                        this.$set(item, "btnedit",`<a class="fa fa-pencil-square-o text-info mr-1"  id=1 ></a> <a class="fa fa-trash-o text-warning mr-1"  id=2 ></a>`);
                        this.$set(item, "dofbirth",moment(item.dofbirth).format('YYYY-MM-DD'))
                        this.$set(item, "id",index +1)
                        // this.$store.state.isLoading = false ;
                    });
                })
                .then(()=>{
                    //console.log(this.todos)
                })
            },
            deleteTodo(index, row) {
                if(!confirm('Are you sure to delete this record : '+ (index +1)+ ' ? ')){ return;}
                apiService.deleteTodo(this.models , row._id ).then((r) => {
                    if (r.status === 204) {
                        this.todos.splice(index, 1);
                        this.$toastr.success('','DELETE chứng từ thành công.');
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

            },
            createTodo() {
                 apiService.createTodo(this.models, this.todo).then((r) => {
                    if (r.status === 201) {
                        var dat = r.data[this.model]
                        var tmp = {
                             _id: dat._id,
                            productName: dat.productName,
                        productCategory: dat.productCategory,
                           productPrice: dat.productPrice,
                     productSeller: dat.productSeller,
                    productImage: dat.productImage,
                         btnedit: `<a class="fa fa-pencil-square-o text-info mr-1"  id=1 ></a> <a class="fa fa-trash-o text-warning mr-1"  id=2 ></a>`
                        }
                        this.todos.push(tmp)
                        this.updaterec = !(this.todo._id === '') // Nếu Đang AddNew thì Nhập tiếp
                        this.restore() // Nếu đang sửa thì phục hồi lại list
                        this.setAddnew()
                        // console.log(tmp)
                        this.$toastr.success('','CREATE chứng từ thành công.');
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

            },
            updateTodo() {
                var todo = this.todo
                apiService.putTodos(this.models +'/'+ todo._id , todo).then((r) => {
                    this.updaterec = false // Đóng screen update
                    this.$toastr.success('','CẬP NHẬT chứng từ thành công.');
                })
                .catch((err) => {
                    console.log(err)
                })
            },
            exportExcel__() {
                var todos = this.todos
                todos.forEach(function(x){delete x.btnedit});
                const data = XLSX.utils.json_to_sheet(todos)
                const wb = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(wb, data, 'data')
                XLSX.writeFile(wb,this.models +'.xlsx')
            },
            exportZip() {
                //this.downloadLoading = true
                import('@/vendor/Export2Zip').then(zip => {
                    const tHeader = ['index','productName', 'productCategory', 'productPrice','productSeller','productImage','id']
                    const filterVal = ['id','productName', 'productCategory', 'productPrice','productSeller','productImage','_id']
                    const list = this.todos
                    const data = this.formatJson(filterVal, list)
                    zip.export_txt_to_zip(tHeader, data, this.models, this.models)
                    //this.downloadLoading = false
                })
            },
            exportExcel() {
                //this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                const multiHeader = [['Id','Main Information','','','Sub Information', '','id']]
                const header =     ['','Name Product', 'Category', 'Price', 'productSeller','productImage','']
                const filterVal = ['id','productName', 'productCategory', 'productPrice','productSeller','productImage','_id']
                const list = this.todos
                const data = this.formatJson(filterVal, list)
                const merges = ['A1:A2','B1:D1','E1:F1', 'G1:G2']
                excel.export_json_to_excel({
                    multiHeader,
                    header,
                    merges,
                    data,
                    filename: this.models
                    })
                    //this.downloadLoading = false
                })
            },
            formatJson(filterVal) {
                return this.todos.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                    return parseTime(v[j])
                    } else {
                    return v[j]
                    }
                }))
            },
            readTodos()
            {
                //console.log(this);
                // this.listLoading = true
                this.$apiAcn.get('/'+this.models)
                .then(data => {
                    // console.log(data);
                    this.numberOfProducts = data.count;
                    this.todos = data.data;
                    this.todos.forEach((item ,index) => {
                        // this.$set(item, "sotien",this.number_format(item['sotien'],0,',','.'));
                        // this.$set(item, "ngoaite",this.number_format(item['ngoaite'],2,',','.'));
                        this.$set(item, "btnedit",`<a class="fa fa-pencil-square-o text-info mr-1"  id=1 ></a> <a class="fa fa-trash-o text-warning mr-1"  id=2 ></a>`);
                        this.$set(item, "birthdate",moment(item.birthdate).format('YYYY-MM-DD'))
                        this.$set(item, "id",index +1)
                        //this.listLoading = false ;
                    });
                })
                .catch(err => {
                    console.log(err);
                    //this.listLoading = false ;
                });
            },


        },

        mounted() {
            this.reset()
            //this.getTodos(this.models)
            this.readTodos(this.models)

        },
    };
</script>

<style scoped>
    .list-horizontal li {
        display: inline-block;
    }

    .list-horizontal li:before {
        content: "\00a0\2022\00a0\00a0";
        color: #999;
        color: rgba(0, 0, 0, 0.5);
        font-size: 11px;
    }

    .list-horizontal li:first-child:before {
        content: "";
    }
</style>
<style>
    table.vgt-table {
        /* font-size: 14px !important; */
    }
</style>