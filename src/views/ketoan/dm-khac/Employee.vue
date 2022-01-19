<template>

    <div>

    <CRow v-if="updaterec">
      <CCol sm="12">
        <CCard>
          <CCardHeader style= "font-size: 25px; ">
           Employee Update
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="submitForm">
               <CRow>
                    <CCol col=5>
                        <CInput required v-model="todo.fullName" type="text" id="focus_todo" prepend="Họ & tên" />
                    </CCol>
                    <CCol col=3>
                        <CInput required v-model="todo.mobile" type="text" prepend="Điện thoại" />
                    </CCol>
                    <CCol col=4>
                        <CInput required v-model="todo.email" type="email" prepend="Email......" />
                    </CCol>
               </CRow>
               <CRow>
                    <CCol col=5>
                        <CInput v-model="todo.city" type="text" prepend="Địa chỉ..." />
                    </CCol>
                    <CCol col=3>
                        <div class="input-group">
                            <div class="input-group-prepend"><span class="input-group-text">Thu nhập</span></div>
                            <input v-mask="masknum" v-model="todo.salary" type="text" class="form-control">
                        </div>
                    </CCol>
                    <CCol col=4>
                        <CInput v-mask="'##-##-####'" type="text" prepend="Sinh nhật" pattern="(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-\d{4}" v-model="todo.dofbirth" title="Dạng ngày DD-MM-YYYY"/>
                    </CCol>
               </CRow>
              <div class="form-group form-actions">
                <CButton class="btn btn-info btn-sm" type="submit" id="addnew"> Add New </CButton>&nbsp;&nbsp;
                <CButton class="btn btn-info btn-sm" type="submit"  :disabled="!todo._id" id="update" > Update </CButton>&nbsp;&nbsp;
                <CButton class="btn btn-outline-info btn-sm" @click="restore()" id="restore"> >> Restore </CButton>&nbsp;&nbsp;
                <CButton class="btn btn-outline-warning btn-sm" @click="setAddnew()" id="close"> >> Close </CButton>

              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
     
          <h2 style="font-size: 25px; padding-left: 20px;">Employees list
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
        name: "Employee",
        mixins: [utility],
        components: {
            VueGoodTable,
            moment
        },
        data() {
            return {
                todoB: {},
                todos: [],
                todo: {
                    _id: '',
                    fullName: '',
                    mobile: '',
                    email: '',
                    city: '',
                    dofbirth: '',
                    salary: ''
                },
                models: 'employees',
                model: 'employee',
                numberOfTodos: 0,
                colchecked: true,
                updaterec: false,
                infoprint: '',
                optprint: false,

                columns: [
                    {
                        label: 'Họ & tên',
                        field: 'fullName',
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
                        field: 'city',
                    },
                    {
                        label: 'Thu nhập',
                        field: 'salary',
                        tdClass: 'text-right',
                    },
                    {
                        label: 'Sinh nhật',
                        field: 'dofbirth',
                        tdClass: 'text-center',
                    },

                    {   label: 'Hiệu chỉnh',
                        field: 'btnedit',
                        html: true,
                        tdClass: 'text-center',
                        width: '90px',    // Phải có 100 - 110 - btn +40
                        //hidden: !this.optprint,
                    },
                ],
            };
        },

        methods: {
            submitForm(e){
                if(!moment(this.todo.dofbirth,'DD-MM-YYYY').isValid()) {
                    this.$toastr.warning("Ngày không hợp lệ !!");
                    return false;
                }
                if(e.submitter.id=='addnew') this.createTodo();
                if(e.submitter.id=='update') this.updateTodo();
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
            editTodo(index, dat){  // Row chưa dùng
                this.restore();
                this.todo = {
                        _id: dat._id,
                        fullName: dat.fullName,
                        mobile: dat.mobile,
                        email: dat.email,
                        city: dat.city,
                        dofbirth: dat.dofbirth,
                        salary: dat.salary,
                        index: index
                }
                Object.keys(this.todo).forEach((key ,index) => {
                    this.todoB[key+"_"] = this.todo[key]
                })
                this.updaterec = true
                $('#focus_todo').trigger('focus')
            },
            restore() {
              if(this.todo.length != this.todoB.length ) return;
              Object.keys(this.todo).forEach((key ,index) => {
                  this.todo[key] = this.todoB[key+"_"]
              })
            },
            updatelist(){
              Object.keys(this.todo).forEach((key ,index) => {
                  this.todos[this.todo.index][key] = this.todo[key]
              })                
            },            
            reset(){
              Object.keys(this.todo).forEach((key ,index) => {
                  this.todo[key] = '';
                  this.todoB[key+"_"] = '';
              })                

            },
            setAddnew() {
              this.updaterec =  !this.updaterec
              if(this.updaterec) {
                  this.reset()
                  $('#focus_todo').trigger('focus')
              }else this.restore()
            },

            // editTodo(index){
            //     this.restore();
            //     var dat = this.todos[index]
            //     this.todo = dat     // Cho sửa
            //     this.todoB = {      // Lưu Phải đổi tên FIELD MỚI OK
            //         _id_: dat._id,
            //         fullName_: dat.fullName,
            //         mobile_: dat.mobile,
            //         email_: dat.email,
            //         city_: dat.city,
            //         dofbirth_: dat.dofbirth,
            //         salary_: dat.salary,
            //         index_: index
            //     }
            //     this.updaterec = true
            //     this.$refs.createNew.innerHTML = ">> Close"
            //     $('#focus_todo').trigger('focus')
            // },
            // restore() {
            //     //if(!this.updaterec ) return;
            //     if(this.todoB.length < 1 ) return;
            //     var dat = this.todoB    // Phải đổi tên FIELD & dùng ['abc'] MỚI OK
            //     this.todo['_id'] = dat._id_
            //     this.todo['fullName'] = dat.fullName_
            //     this.todo['mobile'] = dat.mobile_
            //     this.todo['email'] = dat.email_
            //     this.todo['city'] = dat.city_
            //     this.todo['dofbirth'] = dat.dofbirth_
            //     this.todo['salary'] = dat.salary_
            // },
            // reset() {
            //     this.todo = {
            //         _id: '',
            //         fullName: '',
            //         mobile: '',
            //         email: '',
            //         city: '',
            //         dofbirth: '',
            //         salary: ''
            //     }
            // },
            // setAddnew() {
            //     this.updaterec =  !this.updaterec
            //     // this.$refs.createNew.innerHTML = this.updaterec ? ">> Close" : "++ Create New"
            //     if(this.updaterec) {
            //         this.reset()
            //          $('#focus_todo').trigger('focus')
            //     }else this.restore()
            // },

            colOption()
            {
                //this.columns[5].hidden = !this.colchecked ;
                this.columns[6].hidden = !this.colchecked || this.optprint;
            },

            onCellClick(params) {
                if(params.column.field == 'btnedit' ){
                    switch (params.event.srcElement.id) {
                        case '1' : this.editTodo(params.row.originalIndex ,params.row) ;break;
                        case '2' : this.deleteTodo(params.row.originalIndex ,params.row) ;break;
                    }
                }
            },
            deleteTodo(index, row) {
                if(!confirm('Are you sure to delete this record : '+ (index +1)+ ' ? ')){ return;}
                apiService.deleteTodo(this.model , row._id ).then((r) => {
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
                var dat = this.todo ;
                dat.dofbirth = moment(dat.dofbirth, 'DD-MM-YYYY').format('YYYY-MM-DD'); 
                dat.salary = dat.salary.replace(/\./g, '').replace(/\,/g, '.'); 
                apiService.createTodo(this.model, dat).then((r) => {
                    if (r.status === 201) {
                        dat  = r.data[this.model]
                        var tmp = {
                            _id: dat._id,
                            fullName: dat.fullName,
                            mobile: dat.mobile,
                            email: dat.email,
                            city: dat.city,
                            dofbirth: moment(dat.dofbirth).format('DD-MM-YYYY'),
                            salary: this.number_format(dat.salary,0,',','.'),
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
                    dat.dofbirth = moment(dat.dofbirth).format('DD-MM-YYYY'); 
                })

            },
            updateTodo() {
                var todo = {
                    _id: this.todo._id, 
                    fullName: this.todo.fullName,
                    mobile: this.todo.mobile,
                    email: this.todo.email,
                    city: this.todo.city,
                    dofbirth: moment(this.todo.dofbirth, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    salary: this.todo.salary.replace(/\./g, '').replace(/\,/g, '.'), 
                }
                //todo.dofbirth = moment.utc(todo.dofbirth).format();
                // var str = todo.accounts + " "  //"[123456,124566]"
                // var acc = str.replace("[, ]","").replace("[","").replace("]","")
                // str =  Array.from(acc.split(','), Number)
                // todo.accounts = str
                // this.todo.dofbirth = moment(this.todo.dofbirth).format('YYYY-MM-DD')
                apiService.updateTodo(this.model, todo._id , todo).then((r) => {
                    if (r.status === 200) {
                        this.updaterec = false // Đóng screen update
                        this.updatelist();
                        this.reset(); // sau this.updatelist();
                        this.$toastr.success('','CẬP NHẬT chứng từ thành công.');
                    } else this.$toastr.warning('','CẬP NHẬT chứng từ KHÔNG thành công.');

                })
                .catch((err) => {
                    console.log(err)
                    this.$toastr.warning('','CẬP NHẬT chứng từ KHÔNG thành công.');
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
                    const tHeader = ['id','fullName', 'email', 'mobile','city','salary','dofbirth','index']
                    const filterVal = ['id','fullName', 'email', 'mobile','city','salary','dofbirth','_id']
                    const list = this.todos
                    const data = this.formatJson(filterVal, list)
                    zip.export_txt_to_zip(tHeader, data, this.models, this.models)
                    //this.downloadLoading = false
                })
            },

            exportExcel() {
                //this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                const multiHeader = [['Id', 'Main Information','', '', '','Salary','Birthday','index']]
                const header = ['','FullName', 'Email', 'Mobile', 'Address','','','']
                const filterVal = ['id','fullName', 'email', 'mobile','city','salary','dofbirth','_id']
                const list = this.todos
                const data = this.formatJson(filterVal, list)
                const merges = ['A1:A2', 'B1:E1', 'F1:F2','G1:G2','H1:H2']
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

                //Login OK thì : this.$store.dispatch('login', data[$token, $user] );

                this.$apiAcn.get('/'+this.models)
                .then(data => {
                    //console.log(data);
                    this.numberOfProducts = data.count;
                    this.todos = data.data[this.models];
                    this.todos.forEach((item ,index) => {
                        // this.$set(item, "sotien",this.number_format(item['sotien'],0,',','.'));
                        // this.$set(item, "ngoaite",this.number_format(item['ngoaite'],2,',','.'));
                        this.$set(item, "btnedit",`<a class="fa fa-pencil-square-o text-info mr-1"  id=1 ></a> <a class="fa fa-trash-o text-warning mr-1"  id=2 ></a>`);
                        this.$set(item, "dofbirth",moment(item.dofbirth).format('DD-MM-YYYY')) ;
                        this.$set(item, "salary",this.number_format(item['salary'],0,',','.'));
                        this.$set(item, "id",index +1)
                        //this.listLoading = false ;
                    });
                    return this.todos;
                })
                .then(data => {
                    //console.log(data)
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
            this.readTodos(this.models);
            //console.log(this.configMask, this.maknnum)

        },
        watch: {
            updaterec(){
                this.$refs.createNew.innerHTML = this.updaterec ? ">> Close" : "++ Create New"
            },
        }
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
