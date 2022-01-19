<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.fullname" placeholder="Search ..." style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>&nbsp;&nbsp;&nbsp;
      <el-button v-waves class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" size="mini" type="primary" icon="el-icon-plus" @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" size="mini" type="warning" icon="el-icon-download" @click="handleDownload">
        Excel
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" size="mini" type="warning" icon="el-icon-download" @click="handleDownloadZip">
        Zip
      </el-button>
      <!-- <el-checkbox title = "reviewer" v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
      </el-checkbox> -->
      <el-checkbox title = "Inline-Edit" v-model="inlineEdit" class="filter-item" style="margin-left:15px;" >
        InlineEdit
      </el-checkbox>

    </div>

<el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >

      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="45" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="Id" width="45">
        <template slot-scope="scope">
          {{ scope.$index +1 }}
        </template>
      </el-table-column> -->

    <el-table-column label="Main Information" align="center">

<!-- ---------InlineEdit------------- -->
      <el-table-column  v-if = "inlineEdit" min-width="300px" label="Fullname">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.fullname" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.fullname }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if = "inlineEdit" align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>

<!-- -------------------------- -->

        <el-table-column v-if = "!inlineEdit" label="Full Name" width="150">
          <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.fullname }}&nbsp;&nbsp;&nbsp;</span>
          <el-tag>{{ row.active | typeFilter }}</el-tag>
          </template>
        </el-table-column>
        
<!-- ------------------------------ -->
        <el-table-column label="Mobile" width="100" align="center">
          <template slot-scope="{row}">
            <el-tag>{{ row.mobile }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Email" width="160" align="center">
          <template slot-scope="{row}">
            {{ row.email }}
          </template>
        </el-table-column>
        <el-table-column label="Address" width="240" align="center">
          <template slot-scope="{row}">
            {{ row.address }}
          </template>
        </el-table-column>

    </el-table-column>
      <el-table-column align="center" label="BirthDate" width="95">
        <template slot-scope="{row}">
          <!-- <i class="el-icon-time" /> -->
          <span>{{ row.birthdate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Actions" align="center" width="220" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button icon="el-icon-check" v-if="row.active == true " size="mini" type="success" @click="handleModifyStatus(row,false)">
            Act
          </el-button>
          <el-button icon="el-icon-close" v-if="row.active != true || row.active == ''" size="mini" type="info" @click="handleModifyStatus(row,true)">
            Dis
          </el-button>
          <el-button icon="el-icon-delete" size="mini" type="warning" @click="handleDelete(row,$index)">
            Del
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 450px; margin-left:50px;">
        <el-form-item label="Fullname" prop="fullname">
          <el-input v-model="temp.fullname" />
        </el-form-item>
        <el-form-item label="Mobile" prop="mobile">
          <el-input v-model="temp.mobile" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="Tax Code" prop="taxcode">
          <el-input v-model="temp.taxcode" />
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="Acconuts" prop="accounts">
          <el-input v-model="temp.accounts" />
        </el-form-item>
        <el-form-item label="Birthdate" prop="timestamp">
          <el-date-picker v-model="temp.birthdate" type="date"  />
        </el-form-item>
        <el-form-item label="Active" prop="active">
          <el-input v-model="temp.active" placeholder="false or true " />
        </el-form-item>

        </el-form>

        <!-- <el-form-item label="Type" prop="type">
          <el-select v-model="temp.fuulname" class="filter-item" placeholder="Fullname">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button v-if= "dialogStatus !='create'" type="success" @click="updateData()">
          Update
        </el-button>
        <el-button  type="primary" @click="createData()">
          Add New
        </el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/containers/Pagination' // Secondary package based on el-pagination

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import { APIService } from "../../../APIService";
import moment from 'moment'
const apiService = new APIService();
//import XLSX from 'xlsx';


const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'true', display_name: 'Vn' },
  { key: 'false', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {

      tableKey: 0,
      inlineEdit: false,
      model: 'customer',
      models: 'customers',
      list: null,
      list_: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        fullname: undefined,
        mobile: undefined,
        email: undefined,
        taxcode: undefined,
        address: undefined,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        _id: '',
        fullname: '',
        mobile: '',
        email: '',
        taxcode: '',
        birthdate: '',
        address: '',
        accounts: '',
        active: false
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        birthdate : [{ type: 'date', required: true, message: 'Birthdate is required', trigger: 'change' }],
        fullname: [{ required: true, message: 'fullname is required', trigger: 'blur' }],
        email: [{ required: true, message: 'email is required', trigger: 'blur' }],
        active: [{ required: true, message: 'active is required: true || false', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  mounted() {
      // console.log(this)
      //alert(this.$el.lang)
  },

  methods: {
    getList() {
        // console.log(this.list)
        this.fetchList()
    },
    getList__() {
        this.listLoading = true
        this.fetchList()
        .then(res  => {
            this.total = res.total
            let list = res.list
            list.forEach(function(v ,index){
              v.id = index +1    // insert
              v['edit'] = false
              v.originalTitle = v.title   // store
            })
            return list
        })
        .then(res => {
            this.list = res
            //console.log(this.list)
            // console.log(this.total)
            this.listLoading = false

        })
        .catch(err => {
          console.log(err);
          this.listLoading = false
        });
    },
    cancelEdit(row) {
      row.fullname = row.originalFullname
      row.edit = false
      this.$message({
        message: 'The fullname has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalFullname = row.fullname
      this.$message({
        message: 'The fullname has been edited',
        type: 'success'
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: 'Success',
        type: 'success'
      })
      row.active = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        _id: '',
        fullname: '',
        mobile: '',
        email: '',
        taxcode: '',
        birthdate: '',
        address: '',
        accounts: '',
        active: false
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.createTodo()
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
            this.updateTodo()
        }
      })
    },
    handleDelete(row, index) {
      this.deleteTodo(index, row)
    },
    handleFetchPv(pv) {
        this.pvData = [
          { key: 'PC',
            pv: '1024'
          },
          { key: 'Mobile',
            pv: '1024'
          },
          { key: 'ios',
            pv: '1024'
          },
          { key: 'android',
            pv: '1024'
          }
        ]
        this.dialogPvVisible = true
        return
      // fetchPv(pv).then(response => {
      //   this.pvData = response.data.pvData
      //   this.dialogPvVisible = true
      // })
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    fetchList(){
        this.listLoading = true
        if(this.list_ === null )
        {
         //------------------------------------------
            this.$apiAcn.get('/'+this.models).then((data) => {
                var datalist = data.data[this.models];
                datalist.forEach((item,index) => {
                    this.$set(item, "id",index+1)
                    this.$set(item, "edit", false)
                     item.originalFullname = item.fullname
                    this.$set(item, "birthdate",moment(item.birthdate).format('YYYY-MM-DD'))
                });
                return datalist ;
            })
            .then(res =>{
              this.list_ = res
              this.fetchPage()
            })
           .catch(err => {
              console.log(err);
              this.listLoading = false
            })

            // alert('Loading...')
          //   apiService.getTodos(this.models).then((data) => {
          //       data.forEach((item,index) => {
          //           this.$set(item, "id",index+1)
          //           this.$set(item, "edit", false)
          //            item.originalFullname = item.fullname
          //           this.$set(item, "birthdate",moment(item.birthdate).format('YYYY-MM-DD'))
          //       });
          //       return data
          //   })
          //   .then(res =>{
          //     this.list_ = res
          //     this.fetchPage()
          //   })
          //  .catch(err => {
          //     console.log(err);
          //     this.listLoading = false
          //   })

        }else {
            this.fetchPage()
        }

    },  // fetchList()
    fetchPage(){
        let list = this.list_
        //list.forEach(function(x ,index){x['id'] = index+1});
        let lq = this.listQuery
        let mockList = list.filter(item => {
          if (lq.importance && item.importance !== +lq.importance) return false
          if (lq.type && item.type !== lq.type) return false
          if (lq.fullname && item.fullname.indexOf( lq.fullname) < 0 &&
              item.email.indexOf( lq.fullname) < 0  &&
              item.mobile.indexOf( lq.fullname) < 0 &&
              item.birthdate.indexOf( lq.fullname) < 0 &&
              item.address.indexOf( lq.fullname) < 0 )  return false
          return true
        })

        if (lq.sort === '-id') {
          mockList = mockList.reverse()
        }
        const pageList = mockList.filter((item, index) => index < lq.limit * lq.page && index >= lq.limit * (lq.page - 1))
        this.list = pageList
        this.total = mockList.length
        this.listLoading = false
                //console.log(this.list_)
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleDownloadZip() {
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
    handleDownload() {
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
    createTodo() {
          apiService.createTodo(this.model, this.temp).then((r) => {
            if (r.status === 201) {
                var dat  = r.data[this.model]
                var tmp = []
                tmp['_id'] = dat._id
                tmp['fullname'] = dat.fullname
                tmp['mobile'] = dat.mobile
                tmp['email'] = dat.email
                tmp['accounts'] = dat.accounts
                tmp['taxcode'] = dat.taxcode
                tmp['birthdate'] = moment(dat.birthdate).format('YYYY-MM-DD')
                tmp['address'] = dat.address
                tmp['active'] = dat.active
                tmp['id'] = this.list_.length+1
                //this.list.push(tmp)
                this.list_.push(tmp)
                this.list.push(tmp)
            }
        })
        .then(() => {
          // createArticle(this.temp).then(() => {
            //this.list.unshift(this.tmp)
            //this.list_.unshift(this.tmp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          // })
        })
        .catch((err) => {
            console.log(err)
        })

    },
    updateTodo() {
        var todo = Object.assign({}, this.temp)
        todo.birthdate = moment.utc(todo.birthdate).format()
        var str = todo.accounts + " "  //"[123456,124566]"
        var acc = str.replace("[, ]","").replace("[","").replace("]","")
        str =  Array.from(acc.split(','), Number)
        //console.log(str)
        //console.log(todo.accounts)
        todo.accounts = str
        this.temp.birthdate = moment(this.temp.birthdate).format('YYYY-MM-DD') // Phục hồi lại
        apiService.updateTodo(this.model, todo._id , todo).then((r) => {
            if (r.status === 200) {
                // updateArticle(tempData).then(() => {
                  var index = this.list.findIndex(v => v._id === this.temp._id)
                  this.list.splice(index, 1, this.temp)
                  index = this.list_.findIndex(v => v._id === this.temp._id)
                  this.list_.splice(index, 1, this.temp)
                  this.dialogFormVisible = false
                  this.$notify({
                    title: 'Success',
                    message: 'Update Successfully',
                    type: 'success',
                    duration: 2000
                  })
                // })

            }
            // alert('r.status Updated OK: ' + r.status)

        })
        .catch((err) => {
            console.log(err)
        })
    },
    deleteTodo(index, row) {
        if(!confirm('Are you sure to delete this record : ' + ( row.id ) +   ' ? ')){ return;}
        apiService.deleteTodo(this.model , row._id ).then((r) => {
            if (r.status === 204) {
                this.list_.splice(row.id -1, 1);
                this.list.splice(row.id - 1, 1);
                // alert('r.status deleted OK: ' + r.status)
                this.getList()
                this.$notify({
                  title: 'Success',
                  message: 'Delete Successfully',
                  type: 'success',
                  duration: 2000
                })
            }
        })
        .catch((err) => {
            this.$notify({
              title: 'ERROR',
              message: 'Delete ERRORS ....',
              type: 'warning',
              duration: 2000
            })
            console.log(err)
        })

    },


  }
}
</script>
<style scoped>
  .app-container {
      padding: 0px;
  }
  .c-main {
      padding: 10px;
  }
  .filter-container {
      padding-bottom: 0px;
  }

  .el-checkbox__inner {
    margin-left: 5px;
  }

</style>
