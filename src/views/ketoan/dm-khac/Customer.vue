<template>

    <div>

    <CRow v-if="updaterec">
      <CCol sm="12">
        <CCard>
          <CCardHeader style= "font-size: 25px; ">
           Customer Update  &#8482;
          </CCardHeader>
          <CCardBody>
            <CForm>
               <CRow>
                    <CCol col=5>
                        <CInput :is-valid="testValidator('fullname')" v-model="todo.fullname" type="text"  id="focus_todo" prepend="Họ & tên">
                        </CInput>
                    </CCol>
                    <CCol col=3>
                        <CInput :is-valid="testValidator('mobile')" v-model="todo.mobile" type="text" prepend="Điện thoại">
                        </CInput>
                    </CCol>
                    <CCol col=4>
                        <CInput :is-valid="testValidator('email')" v-model="todo.email" type="email" prepend="Email">
                        </CInput>
                    </CCol>
               </CRow>
               <CRow>
                    <CCol col=3>
                        <CInput :is-valid="testValidator('taxcode')" v-model="todo.taxcode" type="text" prepend="Mã số Thuế" >
                        </CInput>
                    </CCol>
                    <CCol col=5>
                        <CInput  v-model="todo.accounts" type="text" prepend="Tài khoản" >
                        </CInput>
                    </CCol>
                    <CCol col=4>
                        <CInput :is-valid="testValidator('birthdate')" v-model="todo.birthdate" type="date" prepend="Ngày sinh" >
                        </CInput>
                    </CCol>
               </CRow>
               <CRow>
                    <CCol col=9>
                        <CInput  v-model="todo.address" type="text" prepend="Địa chỉ" ></CInput>
                    </CCol>
                    <CCol col=3>
                        <CInput :is-valid="testValidator('active')" v-model="todo.active" type="text" placeholder="true or false"  prepend="Active" ></CInput>
                    </CCol>

               </CRow>

              <div class="form-group form-actions">
                <CButton class="btn btn-info btn-sm" @click="createTodo()" id="addnew"> Add New </CButton>&nbsp;&nbsp;
                <CButton class="btn btn-info btn-sm" @click="updateTodo()" :disabled="!todo._id" id="update" > Update </CButton>&nbsp;&nbsp;
                <CButton class="btn btn-outline-info btn-sm" @click="restore()" id="restore"> >> Restore </CButton>&nbsp;&nbsp;
                <CButton class="btn btn-outline-warning btn-sm" @click="setAddnew()" id="close"> >> Close </CButton>
                
                <!-- <CButton type="submit" size="sm" color="success"><CIcon name="cil-check-circle"/> Submit</CButton>
                <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton> -->

              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
     
          <h2 style="font-size: 25px; padding-left: 20px;">Customers list
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
        name: "Customers",
        mixins: [utility],
        components: {
            VueGoodTable,
            moment
        },
        data() {
            return {
                Validator: {
                    fullname: false,
                    email: false,
                    taxcode: false,
                    birthdate: false,
                    mobile: false,
                    active: false
                },
                todoB: {},
                todos: [],
                todo: {
                    _id: '',
                    fullname: '',
                    mobile: '',
                    email: '',
                    accounts: '',
                    taxcode: '',
                    birthdate: '',
                    address: '',
                    active: 'false'
                },
                models: 'customers',
                model: 'customer',
                numberOfTodos: 0,
                colchecked: true,
                updaterec: false,
                infoprint: '',
                optprint: false,

                columns: [
                    {
                        label: 'Họ & tên',
                        field: 'fullname',
                    },
                    {
                        label: 'Điện thoại',
                        field: 'mobile',
                    },
                    {
                        label: 'Email',
                        field: 'email',
                    },
                    {
                        label: 'Địa chỉ',
                        field: 'address',
                    },
                    {
                        label: 'Mã số Thuế',
                        field: 'taxcode',
                    },
                    {
                        label: 'Ngày sinh',
                        field: 'birthdate',
                    },
                    {
                        label: 'Tài khoản',
                        field: 'accounts',
                    },

                    {   label: 'Hiệu chỉnh',
                        field: 'btnedit',
                        html: true,
                        tdClass: 'text-center',
                        width: '90px',    // Phải có 110 - btn +40
                        //hidden: !this.optprint,
                    },
                ],
            };
        },

        methods: {
            testValidator(field){
                if(field == 'fullname') return this.Validator.fullname = (this.todo.fullname != '')
                if(field == 'email') return this.Validator.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.todo.email)
                if(field == 'taxcode') return this.Validator.taxcode = /^[0-9]{10,13}$/.test(this.todo.taxcode)
                if(field == 'mobile') return this.Validator.mobile = /^[0-9]{10,15}$/.test(this.todo.mobile)
                if(field == 'birthdate') return this.Validator.birthdate = (this.todo.birthdate != '')
                if(field == 'active') return this.Validator.active = (this.todo.active ==='true' || this.todo.active ==='false' || this.todo.active === false)
                let passe = this.Validator.fullname && this.Validator.email && this.Validator.taxcode && this.Validator.mobile && this.Validator.birthdate && this.Validator.active
                if(!passe){
                    this.$message({
                        message: 'Vui lòng nhập đầy đủ thông tin.',
                        type: 'warning'
                    })
                }
                return passe
            },
            shuffleArray (array) {
                for (let i = array.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1))
                    let temp = array[i]
                    array[i] = array[j]
                    array[j] = temp
                }
                return array
            },
            editTodo(index){  // Row chưa dùng
                var dat = this.todos[index]
                this.todo = dat     // Cho sửa
                this.todoB = {      // Lưu Phải đổi tên FIELD MỚI OK
                    _id_: dat._id,
                    fullname_: dat.fullname,
                    mobile_: dat.mobile,
                    email_: dat.email,
                    accounts_: dat.accounts,
                    taxcode_: dat.taxcode,
                    address_: dat.address,
                    active_: dat.active,
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
                this.todo['fullname'] = dat.fullname_
                this.todo['mobile'] = dat.mobile_
                this.todo['email'] = dat.email_
                this.todo['accounts'] = dat.accounts_
                this.todo['taxcode'] = dat.taxcode_
                this.todo['address'] = dat.address_
                this.todo['active'] = dat.active_
            },
            reset(){
                this.todo = {
                    _id: '',
                    fullname: '',
                    mobile: '',
                    email: '',
                    accounts: '',
                    taxcode: '',
                    birthdate: '',
                    address: '',
                    active: ''
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
                this.columns[7].hidden = !this.colchecked || this.optprint;
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
            readTodos()
            {
                //console.log(this);
                // this.listLoading = true
                this.$apiAcn.get('/'+this.models)
                .then(data => {
                    //console.log(data);
                    this.numberOfProducts = data.count;
                    this.todos = data.data[this.models];
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

            getTodos() {
                apiService.getTodos(this.models).then((data) => {
                    this.numberOfProducts = data.count;
                    this.todos = data;
                    this.todos.forEach((item ,index) => {
                        // this.$set(item, "sotien",this.number_format(item['sotien'],0,',','.'));
                        // this.$set(item, "ngoaite",this.number_format(item['ngoaite'],2,',','.'));
                        this.$set(item, "btnedit",`<a class="fa fa-pencil-square-o text-info mr-1"  id=1 ></a> <a class="fa fa-trash-o text-warning mr-1"  id=2 ></a>`);
                        this.$set(item, "birthdate",moment(item.birthdate).format('YYYY-MM-DD'))
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
                apiService.deleteTodo(this.model , row._id ).then((r) => {
                    if (r.status === 204) {
                        this.todos.splice(index, 1);
                        this.$message({
                            message: 'DELETE chứng từ thành công.',
                            type: 'success'
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

            },
            createTodo() {
                if(!this.testValidator()) { return }
                 apiService.createTodo(this.model, this.todo).then((r) => {
                    if (r.status === 201) {
                        var dat  = r.data[this.model]
                        var tmp = {}
                        tmp['_id'] = dat._id
                        tmp['fullname'] = dat.fullname
                        tmp['mobile'] = dat.mobile
                        tmp['email'] = dat.email
                        tmp['accounts'] = dat.accounts
                        tmp['taxcode'] = dat.taxcode
                        tmp['birthdate'] = moment(dat.birthdate).format('YYYY-MM-DD')
                        tmp['address'] = dat.address
                        tmp['active'] = dat.active
                        tmp['btnedit'] = `<a class="fa fa-pencil-square-o text-info mr-1"  id=1 ></a> <a class="fa fa-trash-o text-warning mr-1"  id=2 ></a>`
                        this.todos.push(tmp)
                        this.updaterec = !(this.todo._id === '') // Nếu Đang AddNew thì Nhập tiếp
                        this.restore() // Nếu đang sửa thì phục hồi lại list
                        this.setAddnew()
                        this.$message({
                            message: 'CREATE chứng từ thành công.',
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message: 'CREATE chứng từ KHÔNG thành công.',
                            type: 'error'
                        })

                    }
                })
                .catch((err) => {
                    console.log(err)
                })

            },
            updateTodo() {
                if(!this.testValidator()) { return }
                var todo = this.todo
                todo.birthdate = moment.utc(todo.birthdate).format()
                //delete this.todo.btnedit
                //todo.accounts = this.shuffleArray(todo.accounts)

                var str = todo.accounts + " "  //"[123456,124566]"
                var acc = str.replace("[, ]","").replace("[","").replace("]","")
                str =  Array.from(acc.split(','), Number)
                //console.log(str)
                //console.log(todo.accounts)
                todo.accounts = str
                this.todo.birthdate = moment(this.todo.birthdate).format('YYYY-MM-DD')
                apiService.updateTodo(this.model, todo._id , todo).then((r) => {
                    if (r.status === 200) {
                        this.updaterec = false // Đóng screen update
                        this.$message({
                            message: 'UPDATE chứng từ thành công.',
                            type: 'success'
                        })

                    }

                })
                .catch((err) => {
                    console.log(err)
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
            exportZip() {
                //this.downloadLoading = true
                import('@/vendor/Export2Zip').then(zip => {
                    const tHeader = ['No','fullname', 'email', 'mobile','taxcode','address','birthdate','accounts','active','id']
                    const filterVal = ['id','fullname', 'email', 'mobile','taxcode','address','birthdate','accounts','active','_id']
                    const list = this.todos
                    const data = this.formatJson(filterVal, list)
                    zip.export_txt_to_zip(tHeader, data, this.models, this.models)
                    //this.downloadLoading = false
                })
            },
            exportExcel() {
                //this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                const multiHeader = [['No','Main Information','','','Sub Information','','','Accounts','Active','ID']]
                const header =    ['','Fullname','Mobile', 'Email', 'Tax-code','Address','Birthdate','','','']
                const filterVal = ['id','fullname', 'mobile','email','taxcode','address','birthdate','accounts','active','_id']
                const list = this.todos
                const data = this.formatJson(filterVal, list)
                const merges = ['A1:A2','B1:D1','E1:G1', 'H1:H2', 'I1:I2','J1:J2']
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

        },

        mounted() {
            // this.getTodos(this.models);
            this.readTodos()

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