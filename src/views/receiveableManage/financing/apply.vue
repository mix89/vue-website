<template>
    <div>
        <!-- 页头 -->
        <div slot="page_header">
            <div class="page_header">
                <PageTopBar/>
                <div class="page_head_container">
                    <div class="page_container">
                        <div class="page_head_menu">
                            <Logo/>
                            <div class="page_head_title">查 看 应 收 单</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 页面内容 -->
        <div class="page_container">
            <div class="order_number_show mt10">
                <div class="fix">
                    系统单号：{{ruleForm.sysReceNo}}
                    <!-- <span class="info_txt">已通过</span>  -->
                    <a href="#" class="" style="margin-left:40px;color:#00ACF3;">已签订合同下载</a>
                </div>
            </div>
            <el-form :model="ruleForm">
                <!-- 质权信息 -->
                <div class="infoshow_box">
                    <div class="infoshow_title">
                        <div class="infoshow_title_inner">质权信息</div>
                    </div>
                    <div class="infoshow_body">
                        <div class="layout_infoshow">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">出质方</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.pledgorName}}</div>
                            </div>
                            <div class="infoshow_cell mt30">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">托管机构地址</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.keepingAddress}}</div>
                            </div>
                            <div class="infoshow_cell mt30">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">联系电话</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.keepingPhone}}</div>
                            </div>
                        </div>
                        <div class="layout_infoshow border">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">托管机构</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.keepingName}}</div>
                            </div>
                            <div class="infoshow_cell mt30">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">联系人</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.keepingContactName}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                   <!-- 质押信息 -->
        <div class="infoshow_box">
          <div class="infoshow_title">
            <div class="infoshow_title_inner">质押信息</div>
          </div>
          <div class="infoshow_body">
            <div class="layout_infoshow">
              <div class="infoshow_cell mt0">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">质押物：</div>
                </div>
                <div class="infoshow_cell_body">
                      <!-- #0 -->
                    <div v-for="(item,index) in receTypeList" :key="index">
                        <div v-if="item.key==ruleForm.receType">
                          {{item.value}}
                        </div>
                    </div>
                </div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">编号</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.receNo}}</div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">卖方</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.sellName}}</div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">签订时间</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.startTime | formartDate('')}}</div>
              </div>
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">附件信息</div>
                </div>
                <div class="infoshow_cell_body minh60">
                    <div class="flex mt10">
                      <!-- #666 -->
                          <div>
                              <!--合同扫描件-->
                               {{filesub1.fileName}}
                              <!-- <a href="#" class="info_txt">货品样品照片</a> -->
                          </div>
                          <div class="ml20p">{{filesub1.createTime}}</div>
                          <div class="ml5p info_txt">
                              <a href="#" @click.prevent="downloadFile(filesub1.attachment,filesub1.fileName)">下载</a>
                          </div>
                  </div>

                  <!-- <div style="margin-top:-12px;">

                    <el-upload
                      :file-list="filelist2"
                      class="upload-demo"
                      :action="uploadUrl"
                      :on-remove="handleRemove2"
                      :before-remove="beforeRemove2"
                      :before-upload="beforeUpload2"
                      :on-success="uploadSuccess2"
                      :on-error="uploadError2"
                    >
                      <el-button size="small" type="text">点击上传资料</el-button>
                      <div slot="tip" class="el-upload__tip">文件类型jpg、png、pdf、word、excel、ppt，大小不超过5M</div>
                    </el-upload>
                  </div> -->



                  <!-- <div class="flex">
                        <div>
                          <a href="#" class="info_txt">货品样品照片</a>
                        </div>
                        <div class="ml20p">2018.08.01 10:23</div>
                        <div class="ml5p info_txt">
                          <a href="#">下载</a>
                        </div>
                      </div>
                      <div class="mt15">
                        <a href="#" class="info_txt">全部下载</a>
                  </div>-->
                </div>
              </div>
            </div>
            <div class="layout_infoshow border">
              <div class="infoshow_cell mt0">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">质押物价值</div>
                </div>
                <div class="infoshow_cell_body">
                   {{ruleForm.totalAmount | currency("")}}（元）
                  <span class="info_tips">(备注：质押物价值 = 货物总价之和)</span>
                </div>
              </div>
              <!-- <div class="infoshow_cell">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner" style="margin-top:8px;">仓库地址</div>
                </div>
                <div class="infoshow_cell_body">
                  <vue-address
                    class="address-item"
                    :isShow="addressDisabled"
                    :province="ruleForm.provinceId"
                    :city="ruleForm.cityId"
                    :detail="ruleForm.wAddress"
                    :district="ruleForm.areaId"
                    @change="handlerChange"
                  ></vue-address>
                </div>
              </div>-->
              <div class="infoshow_cell mt30">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">买方</div>
                </div>
                <div class="infoshow_cell_body">
                  {{ruleForm.buyName}}
                </div>
              </div>
              <!-- <div class="infoshow_cell">
                <div class="infoshow_cell_title">
                  <div class="infoshow_cell_title_inner">存储天数</div>
                </div>
                <div class="infoshow_cell_body">{{ruleForm.storageDay}}</div>
              </div>-->
            </div>
          </div>
        </div>
                <!-- 评估价值及融资金额 -->
                <!-- <div class="infoshow_box">
                    <div class="infoshow_title">
                        <div class="infoshow_title_inner">评估价值及融资金额</div>
                    </div>
                    <div class="infoshow_body">
                        <div class="layout_infoshow">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">评估价值</div>
                                </div>
                                <div class="infoshow_cell_body">
                                    180（元） (投资评估机构-赵雷)
                                </div>
                            </div>
                        </div>
                        <div class="layout_infoshow border" style="min-height:40px;">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">融资金额</div>
                                </div>
                                <div class="infoshow_cell_body">160（元）</div>
                            </div>

                        </div>
                    </div>
                </div>-->
            </el-form>
            <!-- 货物信息（货物1） -->
            <div class="infoshow_box--cargo">
                <div class="infoshow_title">
                    <div class="infoshow_title_inner">货物信息</div>
                </div>
                <div class="infoshow_body" style="padding-top:0;">
                    <el-form :model="ruleForm2">
                        <div
                            class="cargo_box"
                            v-for="(item,index) in ruleForm2.receivableCommodityList"
                            :key="index"
                        >
                            <div class="cargo_title">货物{{index+1}}</div>
                            <div class="layout_infoshow">
                                <div class="infoshow_cell mt0">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">货物名称</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.name}}</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">规格</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.type}}</div>
                                </div>
                                <div class="infoshow_cell" style="margin-top:30px;">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">是否标品</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.isMark}}</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">单价</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.price | currency("")}}（元）</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <!-- #22 -->
                                        <div class="infoshow_cell_title_inner">附件信息</div>
                                    </div>
                                    <div class="infoshow_cell_body minh60">
                                        <div style="margin-top:-12px;">
                                            <div
                                                v-for="(sub1,index1) in item.receivableAttachment"
                                                :key="index1"
                                            >
                                                <div class="flex mt10">
                                                    <div>
                                                      <!--货品样品信息-->
                                                         {{sub1.fileName}}
                                                        <!-- <a href="#" class="info_txt">货品样品照片</a> -->
                                                    </div>
                                                    <div class="ml20p">{{sub1.createTime}}</div>
                                                    <div class="ml5p info_txt">
                                                        <a
                                                            href="#"
                                                            @click.prevent="downloadFile(sub1.attachment,sub1.fileName)"
                                                        >下载</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <el-upload
                                                :file-list="filelist1"
                                                class="upload-demo"
                                                :action="uploadUrl"

                                                :on-error="uploadError"
                                                multiple
                                                :limit="3"
                                                :on-exceed="handleExceed"
                                            >
                                                <el-button size="small" type="text">点击上传资料</el-button>
                                                <div
                                                    slot="tip"
                                                    class="el-upload__tip"
                                                >只能上传jpg/png文件，且大小不超过5M</div>
                                            </el-upload>-->
                                            <!-- <div class="flex">
                                                <div>
                                                    <a href="#" class="info_txt">货品样品照片</a>
                                                </div>
                                                <div class="ml20p"></div>
                                                <div class="ml5p info_txt">
                                                    <a href="#">下载</a>
                                                </div>
                                            </div>-->
                                            <div class="mt15">
                                                <!-- <a href="#" class="info_txt">全部下载</a> -->
                                            </div>
                                        </div>
                                        <!-- <div class="flex">
                        <div>
                          <a href="#" class="info_txt">货品样品照片</a>
                        </div>
                        <div class="ml20p">2018.08.01 10:23</div>
                        <div class="ml5p info_txt">
                          <a href="#">下载</a>
                        </div>
                      </div>
                      <div class="mt15">
                        <a href="#" class="info_txt">全部下载</a>
                                        </div>-->
                                    </div>
                                </div>
                            </div>
                            <div class="layout_infoshow border">
                                <div class="infoshow_cell mt0">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">品类</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.category}}</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">单位</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.unit}}</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">数量</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.count}}</div>
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">货物总价</div>
                                    </div>
                                    <!--  = item.price*item.count -->
                                    <div
                                        class="infoshow_cell_body"
                                    >{{item.totalPrice | currency("")}}（元）</div>
                                    <!-- <el-input v-model="item.totalPrice" @change="totalChange" /> -->
                                </div>
                                <div class="infoshow_cell">
                                    <div class="infoshow_cell_title">
                                        <div class="infoshow_cell_title_inner">备注</div>
                                    </div>
                                    <div class="infoshow_cell_body">{{item.remark}}</div>
                                </div>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>

            <!-- 融资金额 -->
             <div class="infoshow_box">
                    <div class="infoshow_title">
                        <div class="infoshow_title_inner">融资金额</div>
                    </div>
                    <div class="infoshow_body">
                        <div class="layout_infoshow">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">融资金额</div>
                                </div>
                                <div class="infoshow_cell_body">{{ruleForm.totalAmount}} (元)</div>
                            </div>
                            <!-- <div class="infoshow_cell mt30">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">托管机构地址</div>
                                </div>
                                <div class="infoshow_cell_body"></div>
                            </div> -->
                        </div>
                        <!-- <div class="layout_infoshow border">
                            <div class="infoshow_cell mt0">
                                <div class="infoshow_cell_title">
                                    <div class="infoshow_cell_title_inner">托管机构</div>
                                </div>
                                <div class="infoshow_cell_body">888</div>
                            </div>

                        </div> -->
                    </div>
                </div>

            <!-- 流程图 -->
            <div class="infoshow_box">
                <div class="infoshow_title">
                    <div class="infoshow_title_inner">流程</div>
                </div>
                <div class="infoshow_body">
                    <div class="showflow">
                        <div v-for="(item,index) in check.list" :key="index">
                            <div class="showflow_box_year" v-if="index == 0">
                                <div class="showflow_year">{{check.createName}}</div>
                                <div class="showflow_date">{{item.createTime}}</div>
                                <div class="showflow_person">{{item.handleNickName}}</div>
                                <div class="showflow_state">{{item.handleExplain}}</div>
                                <div
                                    class="showflow_state"
                                    v-if="item.flowDescription"
                                >{{item.flowDescription}}</div>
                            </div>
                            <div
                                :class="{'warining':item.status == 3 , 'showflow_box':true}"
                                v-else
                            >
                                <div class="showflow_date">{{item.createTime}}</div>
                                <div class="showflow_person">{{item.handleNickName}}</div>
                                <div class="showflow_state">{{item.flowDescription}}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <!-- 弹出框 -->
            <div class="submit_buttons" style="background:#fff;">
                <el-button type="primary" @click="submitApply()" class="primary_btn">申请</el-button>
                <el-button @click="cancelBack" class="cancel_btn" style="margin-left:140px">返回</el-button>
            </div>
        </div>
        <!-- step dialogue1 步骤弹框-->
        <el-dialog
            title="通过"
            :visible.sync="dialogFormVisible"
            :class="{agree_dialoguebox:stepActiveState===1,check_dialogue:stepActiveState===0,middle_dialogue:stepActiveState===2}"
        >
            <div>
                <div class="step_title" v-if="showComplete">
                    <div
                        class="step_title_inner no_line processed"
                        :class="{step_active:stepActiveState===0}"
                    >
                        <div class="step_inner_text">选择融资周期</div>
                    </div>
                    <div class="step_title_inner" :class="{step_active:stepActiveState===1}">
                        <div class="step_inner_text">确认融资协议</div>
                    </div>
                    <div class="step_title_inner">
                        <div class="step_inner_text">完成申请</div>
                    </div>
                </div>
                <!-- 第一步 -->
                <div v-show="stepState==='first'">
                    <el-form :model="ruleForm4" ref="ruleForm4" :rules="rule4">
                        <div class="change_password_inner">
                            <div class="search_box inner_assess" style="margin-left:50px">
                                <!-- <div
                                    style="text-align:center;font-size:16px;font-weight:bold"
                                >当 前 应 收 单 评 估 价 值 为： {{ruleForm.costAmount}} 元</div> -->
                                <!-- <div
                                    style="text-align:center;font-size:12px;color:#c5c5c5;margin-top:5px;"
                                >备注：实际可融资金额可能小于评估价值！</div> -->
                                 <div
                                    style="text-align:center;font-size:16px;"
                                >请选择融资周期</div>
                                <el-form-item
                                    label="融资周期"
                                    class="select-item mt20"
                                    prop="financeCycle"
                                >
                                    <div class="box_required">
                                        <el-select
                                            v-model="ruleForm4.financeCycle"
                                            size="small"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in financeCycleList"
                                                :key="item.key"
                                                :label="item.value"
                                                :value="item.key"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <div class="submit_buttons" style="margin-top:40px;">
                            <el-button
                                type="primary"
                                @click="next('ruleForm4')"
                                class="primary_btn"
                                style="width:140px;"
                            >下一步</el-button>
                            <el-button
                                @click="cancel2"
                                class="cancel_btn"
                                style="margin-left:50px;width:140px;"
                            >取消</el-button>
                        </div>
                    </div>
                </div>
                <!-- 第二步 -->
                <div v-show="stepState==='second'">
                    <div>
                        <div class="pledge_agreebox">
                              <div class="protocol_box">
                            <div class="protocol_title">应收质押协议</div>
                            <div class="protocol_body fix">
                            </div>
                            <div class="fix">
                                    <div class="protocol_item" style="float:right;margin-right:20px;"> 合同编号：</div>
                            </div>

                               <div class="protocol_item"> 甲方（出质方）：</div>
                              <div class="protocol_item">  法定代表人：</div>
                               <div class="protocol_item">   乙方（质权人）：</div>
                             <div class="protocol_item">   法定代表人：</div>
                               <div class="protocol_item">  丙方（仓储方）：</div>
                                 <div class="protocol_item"> 法定代表人：</div>
                                  <div class="protocol_text">
                                    <div class="protocol_main_title">第1条 总则</div>
                                    <div class="protocol_sub_title">
                                        为了确保 年 月 日（日期） （下称“主合同债务人”）与 银行 （下称“主合同债权人”）签订的 号《 》（以下简称“主合同”）的履行，甲方愿意以其所拥有的仓单出质，为主合同债务人与主合同债权人之间所形成的债务关系提供质押担保。
                                        乙方经审查，同意接受甲方提供的质押担保。为明确甲、乙双方的权利、义务，本着平等互利的原则，依照国家有关法律法规之规定，特制订本合同。
                                    </div>
                                    <div class="protocol_item"></div>
                                </div>
                                <div class="protocol_text">
                                    <div class="protocol_main_title">第2条 各方声明及保证</div>
                                    <div
                                        class="protocol_sub_title"
                                    >2.1 甲、丙方作为本协议中的出质方和仓储方，就本协议做出如下声明及保证：</div>
                                    <div
                                        class="protocol_item"
                                    >（1）保证甲方是本协议项下的仓单（以下简称“质物”）完全的、有效的、合法的所有者；</div>
                                    <div
                                        class="protocol_item"
                                    >（2）保证本协议项下的质物不存在所有权方面的争议，并保证设立关于本协议项下的质押不会受到任何限制；</div>
                                     <div
                                        class="protocol_item"
                                    >（3）甲、丙方声明：本协议签订前未对本协议项下的质物做出过任何处分，特别是未设立过任何质押、抵押，该质物及仓单对应的仓储货物（以下简称“仓单标的”）之上亦不存在任何其它第三者权利；丙方在收到乙方签发的“停止转让通知书／停止过户通知书” （格式见附件）后，依照本协议约定解除质押前，未经过乙方书面表述同意，甲、丙方不对质物标的作任何形式及方式上的转移和转让，或再质押任何第三方，或以任何其他形式或方式处置质物标的。质物标的出库必须提供盖有乙方公章的“出库通知书／过户通知书” （格式见附件）方可办理；</div>
                                     <div
                                        class="protocol_item"
                                    >（4）甲、丙方声明自愿签订本协议，并具有所有必要的权利与授权签署本协议并履行本协议项下的义务；</div>
                                     <div
                                        class="protocol_item"
                                    >（5）质押期间，丙方严格按照《仓储合同》对质物标的进行仓储及保管，保证质物标的的数量和质量与甲方交付质物时质物上列明的数量和质量一致，因丙方保管原因造成质物标的数量减少或质量问题，由甲方负责补足，丙方亦应按照其与甲方签定的《仓储合同》的约定补足质物标的，同时通知乙方变更质物清单；</div>
                                     <div
                                        class="protocol_item"
                                    >（6）如乙方认为质物标的应办理保险，甲、丙方应保证已对质物标的进行了足额综合保险，若依本协议解除质押前保险到期，甲、丙方负责办理续保；</div>
                                    <div class="protocol_item">（7）丙方同意放弃基于其与甲方签定的《仓储合同》而形成的留置权。</div>
                                       <!-- <div class="protocol_item"></div>
                                        <div class="protocol_item"></div>
                                         <div class="protocol_item"></div>
                                          <div class="protocol_item"></div> -->

                                           <!-- <div class="protocol_text">
                                    <div class="protocol_main_title">第1条 总则</div>
                                    <div class="protocol_sub_title"></div>
                                       <div class="protocol_item"></div>
                                    </div> -->


                                      <div
                                        class="protocol_sub_title"
                                    >2.2  乙方作为本协议的质权人，在协议有效期内未经乙方书面同意，甲、丙方将本协议项下的质物或质物标的转移和转让或再质押给任何第三方或以任何其他方式处置质物或质物标的，其行为无效，乙方仍可对质押的质物行使权利。任何第三人对乙方在本协议项下的权利产生侵害，乙方有权提起诉讼。</div>
                                    <div class="protocol_text">
                                    <div class="protocol_main_title">第3条  被担保的主债权的种类和数额</div>
                                    <div class="protocol_sub_title">甲方所担保的主债权种类及数额与主合同项下的债权种类及数额相同，主债权种类及数额为（金额采用大写方式）                     。</div>

                                    </div>
                                    <div class="protocol_text">
                                    <div class="protocol_main_title">第4条  质押期限</div>
                                    <div class="protocol_sub_title">质押期限自本合同生效之日起至主合同项下全部债务清偿之日止。</div>
                                       <div class="protocol_item"></div>
                                    </div>
                                     <div class="protocol_text">
                                    <div class="protocol_main_title">第5条  质押担保的范围</div>
                                    <div class="protocol_sub_title">甲方质押担保的范围包括主合同项下的债务本金、利息、复利、手续费、违约金、损害赔偿金、保管费用、实现质权的费用（包括但不限于诉讼费、律师费、差旅费）和所有其他应付费用。</div>
                                       <div class="protocol_item"></div>
                                    </div>
                                    <div class="protocol_text">
                                    <div class="protocol_main_title">第6条  质物的设定</div>
                                    <div class="protocol_sub_title">6.1  本合同项下的质物是仓单，仓单号码为：                     。仓单标的是存放于丙方仓库                     位置的净重为         吨的                     ，其具体状况详见质物清单（附件1）。根据甲、乙双方确认，在本协议签章即刻，本协议项下质物标的单位价格为人民币        元/吨，价值人民币（大写）                    （￥        元），授信质押率为         。</div>
                                   <div class="protocol_sub_title"> 6.2  如本合同项下的质物需经登记，其登记机构为：                     ，登记证明作为本合同附件。</div>

                                    </div>
                                     <div class="protocol_text">
                                    <div class="protocol_main_title">第7条  质物的移交和保管</div>
                                    <div class="protocol_sub_title">7.1  本合同项下质物应于         日由甲方交付乙方。乙方根据本合同有关规定进行验收。</div>
                                    <div class="protocol_sub_title">7.2  本合同项下的质物的所有有效证明和资料凭证均由甲、乙双方确认封存后，由甲方交与乙方保管。</div>
                                    </div>
                                     <div class="protocol_text">
                                    <div class="protocol_main_title">第8条  质物的处分</div>
                                    <div class="protocol_sub_title"></div>
                                       <div class="protocol_item"></div>
                                    </div>
                                     <div class="protocol_text">
                                    <div class="protocol_main_title">第1条 总则</div>
                                    <div class="protocol_sub_title">8.1  乙方在处分本合同项下质押的权利时，有权采取如下方式：</div>

                                       <div class="protocol_item">（1）依据有关法律规定，对质押的权利进行转让或许可他人使用，以取得转让费、许可费优先受偿。</div>
                                        <div class="protocol_item">（2）依据有关法律规定，将出质人质押的仓单，兑现价款或提取货物，以优先受偿。</div>
                                    <div class="protocol_sub_title"> 8.2  在主合同债务人违反主合同的规定或发生任何第十五条所列事项时，乙方有权随时处分质物，乙方对本合同项下质物的处分权利包括部分处分权和全部处分权。</div>
                                    <div class="protocol_sub_title">8.3  乙方依据本合同处分质物时，甲方、丙方应给予配合，不得设置任何障碍。</div>
                                    </div>

                                    <div class="protocol_text">
                                    <div class="protocol_main_title">第9条  三方的权利和义务</div>
                                    <div class="protocol_sub_title">9.1  甲方权利和义务</div>
                                       <div class="protocol_item">（1）甲方应向乙方提供有关本合同项下的质物的所有权的有效资料；</div>
                                        <div class="protocol_item">（2）甲方有义务定期、每                     （时间）一次将质物标的的市场行情通知乙方，并有义务在市场行情变动较大时随时和及时的通知乙方；</div>
                                         <div class="protocol_item">（3）甲方承担本合同项下有关的各项费用，包括但不限于律师服务、财产保险、鉴定、估价、登记、过户、保管及诉讼的费用；</div>
                                          <div class="protocol_item">（4）在本合同有效期内，甲方不得将本合同项下的质物做出馈赠、转让、再抵押或任何其它方式的处分；</div>
                                           <div class="protocol_item">（5）在本合同生效后，甲方如发生分立、合并，由变更后的机构承担本合同项下的义务；</div>
                                            <div class="protocol_item">（6）在质权受到或可能受到来自任何第三方侵害时，甲方有义务及时通知乙方并协助乙方免受侵害；</div>
                                             <div class="protocol_item">（7）在主合同债务人清偿了主合同项下的全部债务后，甲方有权要求解除本合同项下的质押。</div>
                                              <div class="protocol_sub_title">9.2  乙方权利和义务</div>
                                                    <div class="protocol_item">9.2.1  乙方有权对甲方开展授信调查和审核，对甲方提供的质物标的进行核实，对甲方的经营、销售及库存各方面情况进行检查和监督；乙方有权指定甲方将销售款项全额解入指定帐户并依照本协议约定处置；乙方对甲方的授信申请行使批准权并对质物拥有优先受偿权。</div>
                                                         <div class="protocol_item">9.2.2  出现下列情况之一的，乙方有权处分本合同项下的质物：</div>
                                                              <div class="protocol_item">（1）质押期间， 主合同项下债务未到期之前，如遇市场行情变动使质物标的价值下降而使质押率超过         时，甲方未在三日内偿还部分贷款本金或者补足相应的保证金以确保质押率恢复到         以下；</div>
                                                                   <div class="protocol_item">（2）依主合同约定债务人违约，主债权人宣布主债权提前到期；</div>
                                                                        <div class="protocol_item">（3）主合同债务人在本协议有效期内被宣告解散、破产；</div>
                                                                             <div class="protocol_item">（4）主合同约定的履行债务期限已到，而主合同债务人未依约归还债务本金、利息及其他费用；</div>
  <div class="protocol_item">（5）主合同债务人与第三人发生诉讼或仲裁时，导致主合同债务人存在无力向乙方偿付债务本金、利息及其他费用的可能性；</div>
    <div class="protocol_item">（6）出现使乙方在主合同项下的债权难以实现或无法实现的其他情况。</div>
      <div class="protocol_item">9.2.3  乙方处分本合同项下质物的所得，不足以偿还本合同质押担保范围内的全部债务的，乙方有权依法另行追索；偿还本合同质押担保范围内的全部债务后还有剩余的，乙方应将剩余部分退还给甲方。</div>
        <div class="protocol_item">9.2.4  乙方有权要求甲方协助以避免质权受到来自任何第三方的侵害。</div>
<div class="protocol_item">9.2.5  乙方负有妥善保管质物的义务。</div>
<div class="protocol_sub_title">9.3  丙方的权利和义务</div>
<div class="protocol_item">（1）质押期间，丙方有义务严格按照《仓储合同》对质物标的进行仓储及保管，有义务接受乙方货物进行日常查验；</div>
<div class="protocol_item">（2）如主合同项下债务发生逾期或垫款，乙方有权要求丙方协助处理仓单。</div>
                <div class="protocol_text">
                                    <div class="protocol_main_title">第10条  保险（本章仅适用于质物标的办理保险的情况）</div>
                                    <div class="protocol_sub_title">10.1  甲方在本合同签订以前，应到乙方指定或认可的保险公司办理质物标的的全额保险手续。</div>
                                       <div class="protocol_sub_title">10.2  在本合同解除或中止之前，乙方为该项保险的第一受益人，保险合同不应有任何限制乙方权益的条款。</div>
                                         <div class="protocol_sub_title">10.3  在本合同解除或中止之前，甲方不得以任何理由中断或撤销保险。如保险中断或保险期满甲方未及时办理续保手续的，乙方有权代为办理续保手续，一切费用由甲方承担。</div>
                                          <div class="protocol_sub_title">10.4  在本合同解除或中止之前，甲方应将质物的保险单据交由乙方保管。</div>
                                           <div class="protocol_sub_title">10.5  保险期限必须长于主合同债务履行期限三个月。</div>

                                    </div>
<div class="protocol_text">
                                    <div class="protocol_main_title">第11条  违约责任</div>
                                    <div class="protocol_sub_title">11.1  本合同生效后，甲、乙、丙三方当事人均应履行合同约定的义务，任何一方不履行或不完全履行本合同所规定义务的，应当承担相应的违约责任，并赔偿由此给对方造成的损失。</div>
                                       <div class="protocol_sub_title">11.2  甲方未按乙方要求提供有关质物的完备手续和真实资料的，或者隐瞒质物存在共有、争议、被查封、被扣押、被监管或已经设立抵押、质押等情况而给乙方造成损失的，应给予赔偿。</div>
                                      <div class="protocol_sub_title">11.3  乙方因保管不善致使质物灭失或毁损的，应承担民事责任。</div>
                                        <div class="protocol_sub_title">11.4  因丙方保管不善造成质物标的数量减少或质量问题，由甲方负责补足，丙方亦应按照其与甲方签定的《仓储合同》的约定补足质物标的，同时通知乙方变更质物清单。</div>



                                    </div>
                                    <div class="protocol_text">
                                    <div class="protocol_main_title">第12条  不可抗力</div>
                                    <div class="protocol_sub_title">12.1  不可抗力指订立本合同时不能预见，对其发生和造成的后果不能避免并不能克服的情况。</div>
                                       <div class="protocol_sub_title">12.2  本合同如因不可抗力必须作一定修改补充的，甲方保证任何改变将不会免除或减少甲方在本合同中所承担的责任和义务，不影响或侵犯乙方在本协议项下的所有权益。</div>


                                    </div>
                                    <div class="protocol_text">
                                    <div class="protocol_main_title">第13条  质押登记</div>
                                    <div class="protocol_sub_title">本合同项下的质押如依有关法律法规之规定应当办理出质登记的，则甲方必须在合同签订之日起         日内到有关权利质押合同登记机构办理权利出质登记手续。</div>
                                       <div class="protocol_item"></div>
                                    </div>

                                     <!-- <div class="protocol_text">
                                    <div class="protocol_main_title">第1条 总则</div>
                                    <div class="protocol_sub_title"></div>
                                       <div class="protocol_item"></div>
                                    </div>  -->

                                     <div class="protocol_text">
                                    <div class="protocol_main_title">第14条  争议的解决</div>
                                    <div class="protocol_sub_title">甲、乙、丙三方在履行本合同中发生的争议，首先由甲、乙、丙三方协商解决。如协商不成的，则通过向香港国际仲裁中心申请仲裁的方式解决。</div>

                                    </div>
                                    <div class="protocol_text">
                                    <div class="protocol_main_title">第15条  合同的生效、变更、解除和终止</div>
                                    <div class="protocol_sub_title">15.1  本合同自甲、乙、丙方三方法定代表人或其委托代理人签章并加盖公章后，自质物移交乙方占有之日起生效。</div>
                                    <div class="protocol_sub_title">15.2  本合同独立于主合同，不因主合同的无效而无效。</div>
                                    <div class="protocol_sub_title">15.3  本合同生效后，甲、乙、丙三方任何一方不得擅自变更或提前解除本合同。如本合同需要变更或解除时，应经甲、乙、丙方协商一致，并达成书面协议，书面协议达成之前，本合同各条款仍然有效。</div>
                                       <div class="protocol_item"></div>
                                    </div>
                                     <div class="protocol_text">
                                    <div class="protocol_main_title">第16条  附件</div>
                                    <div class="protocol_sub_title">16.1  本合同未尽事宜，甲、乙、丙三方可另行约定达成书面协议，作为本合同附件。本合同附件是本合同不可分割的组成部分，与本合同正文具有同等的法律效力。</div>
                                       <div class="protocol_sub_title">16.2  本合同的附件包括（但不限于）：</div>
                                        <div class="protocol_item">（1）质物清单</div>
                                         <div class="protocol_item">（2）停止转让通知书／停止过户通知书</div>
                                           <div class="protocol_item">（3）出库通知单／过户通知书</div>
                                             <div class="protocol_item"></div>

                                    </div>
                                    <div class="protocol_text">
                                    <div class="protocol_main_title">第17条  附则</div>
                                    <div class="protocol_sub_title">17.1  其他</div>
                                       <div class="protocol_item">（1）本协议一式三份，协议各方各执一份。各份协议文本具有同等法律效力。</div>
                                    <div class="protocol_item">（2）本协议经各方签署后生效。</div>
                                    </div>
                                    <div class="protocol_item">签署时间：         年         月        日</div>
                                    <div class="protocol_item">甲方（盖章）：</div>
                                    <div class="protocol_item">联系人：</div>
                                    <div class="protocol_item">联系方式：</div>
                                    <div class="protocol_item">地址：</div>
                                      <div class="protocol_item" style="margin-top:40px;">乙方（盖章）：</div>
                                    <div class="protocol_item">联系人：</div>
                                    <div class="protocol_item">联系方式：</div>
                                    <div class="protocol_item">地址：</div>
                                     <div class="protocol_item mt20" style="margin-top:40px;">丙方（盖章）：</div>
                                    <div class="protocol_item">联系人：</div>
                                    <div class="protocol_item">联系方式：</div>
                                    <div class="protocol_item">地址：</div>

                                               <div class="protocol_item"></div>
                                    </div>
                                    <div>
                                    </div>
                                </div>

                              </div>
                        </div>
                        <div class="pledge_agreebox_tips">请详细阅读融资协议！该电子协议与纸质协议具有同等效力！</div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <div class="submit_buttons" style="margin-top:20px;">
                            <el-button
                                type="primary"
                                @click="next2()"
                                class="primary_btn"
                                style="width:170px;"
                            >同意协议</el-button>
                            <el-button
                                @click="dialogFormVisible = false"
                                class="cancel_btn"
                                style="margin-left:160px;width:170px;"
                            >取 消</el-button>
                        </div>
                    </div>
                </div>
                <!-- 第三步 -->
                <div v-show="stepState==='third'">
                    <div class="check_through">
                        <div class="check_through_title">申请已提交！</div>
                        <div class="check_through_body">
                            <p class="mt30">审核结果将在5个工作日内给出</p>
                            <p class="mt10">如有疑问请联系客服：0755-25256566</p>
                        </div>
                        <div class="" style="text-align:center;margin-top:50px;">
                            <el-button
                                type="primary"
                                @click="next3"
                                class="primary_btn"
                                style="width:150px;"
                            >确认</el-button>
                            <el-button
                                @click="cancel3"
                                class="cancel_btn"
                                style="width:150px;margin-left:80px;"
                            >返回</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// #0
import vueAddress from "@/components/Address/address";
import Logo from "@/views/layout/components/Logo";
import PageTopBar from "@/views/layout/components/PageTopBar";
import PageHead from "@/views/layout/components/PageHead";
import { isPhone, isWscnEmail } from "@/utils/validate";
import { requestPost, downloadFile } from "@/api/parent";
import { currency } from "@/utils/filters";

export default {
  //#1
  components: {
    Logo,
    PageTopBar,
    PageHead,
    vueAddress
  },
  // #2
  data() {
    return {
       filesub1:{},
       isMarkList:[{ key: 1, value: "是" },{ key: 2, value: "否" }],
      //流程
      check: {},
      sub1:{},

      receType: null,
      receTypeList: [
        { key: 1, value: "合同" },
        { key: 2, value: "发票" },
        { key: 3, value: "协议" },
        { key: 4, value: "票据" }
      ],
      ruleForm4: {
        financeCycle: ""
      },
      rule4: {
        financeCycle: [
          {
            required: true,
            message: "请选择融资周期",
            trigger: "change"
          }
        ]
      },
      financeCycleList: [
        { key: 1, value: "1个月" },
        { key: 3, value: "3个月" },
        { key: 6, value: "6个月" },
        { key: 9, value: "9个月" },
        { key: 12, value: "12个月" }
      ],
      // 步骤弹框
      dialogFormVisible: false, //弹框是否弹出
      stepActiveState: 0,
      titleActive: 0,
      stepState: "first",
      showComplete: true,
      //流程
      check: {},

      //表单1内容
      ruleForm: {
        costAmount: "",
        dateTime: null,
        keepingId: "",
        pledgorId: "",
        whrNo: "",
        wName: "",
        wContact: "",
        startTime: "",
        endTime: "",
        storageDay: null,
        totalAmount: null,
        wPhone: "",
        //审核人
        wfProcessDetail: {
          handleId: null
        },
        // 地址
        provinceId: "",
        cityId: "",
        areaId: "",
        wAddress: "",
        status: ""
      },
      //表单2内容
      ruleForm2: {
        receivableCommodityList: [
          {
            count: "",
            isMark: "1",
            name: "", //货物名称
            price: "",
            remark: "",
            totalPrice: null,
            type: "", //规格
            category: "", //品类
            unit: "", //单位
            receivableAttachment: {
              attachment: "测试附件地址",
              attaName: ""
            }
          }
        ]
      },
      ruleForm3: {
        // checkPeople: "",
        wfProcessDetail: {
          handleId: ""
        }
      }
    };
  },
  // #3
  created() {
    let user = JSON.parse(localStorage.getItem("user_front"));
    this.pledgorName = user.customerName;
    this.ruleForm.pledgorId = user.customerId;
    //拉取仓单信息和货物信息
    requestPost("/api/auth/site/receivable/show", {
      receId: this.$route.query.receId
    }).then(response => {
      // #22

    //   console.log(111);
    //   console.log(response);
      if (response.data.code === 0) {
        this.ruleForm = response.data.res_data.receivableInfo;
        this.ruleForm2.receivableCommodityList =
          response.data.res_data.receivableCommodityList;
        // this.ruleForm2.receivableCommodityList[0].whreceiptAttachment[0].attachment =

        // this.fileList1

       this.filesub1.attachment =this.ruleForm.receivableAttachment[0].attachment
       this.filesub1.fileName = this.ruleForm.receivableAttachment[0].fileName
       this.filesub1.createTime = this.ruleForm.receivableAttachment[0].createTime
      }
    });
    //流程
    requestPost("/api/auth/site/receivable/wfDetail", {
      receId: this.$route.query.receId
    }).then(response => {
      if (response.data.code === 0) {
        this.check.list = response.data.res_data.list;
      }
    });
  },
  // #4
  methods: {
    // 弹出申请框
    submitApply() {
      this.dialogFormVisible = true;
    },

    //步骤弹框
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          this.stepState = "second";
          this.stepActiveState = 1;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {},
    next2() {
      let applyData = {};
      applyData.type = "3";
      applyData.relationId = this.ruleForm.receId;
      applyData.financeCycle = this.ruleForm4.financeCycle;
      //     "type" : "1",
      //   "relationId" : "18",
      //   "financeCycle" : "3"

      requestPost("/api/auth/financing/applyFor", applyData).then(response => {
        console.log(333);
        console.log(response);
        if (response.data.code === 0) {
          this.showComplete = false;
          this.stepState = "third";
          this.stepActiveState = 2;
        } else if (response.data.code === 1004) {
          this.$message.error("融资周期时间不能大于仓单产品存储时间");
        } else if(response.data.code === 1005){
             this.$message.error("没找到该企业对应的仓单融资规则");
        }else if(response.data.code === 10009){
          this.$message.warning(response.data.msg)
          window.history.go(-1)
        }else {
          this.$message.warning(response.data.msg)
          window.history.go(-1)
        }
      });
    },
    cancel2() {
      this.dialogFormVisible = false;
    },
    next3() {
        // this.$router.push({ name: "receiveableManageList" });
      window.history.go(-1)
    },
    cancel3() {
        this.dialogFormVisible = false;
        // this.$router.push({ name: "receiveableManageList" });
    },

    //取消操作
    cancelBack() {
      // this.$router.push({ name: "receiveableManageList" });
      window.history.go(-1)
    },
    //文件下载
    downloadFile: downloadFile
  },
  // #5
  watch: {},
  // #6
  computed: {
    //地址
    showAddress() {
      let addresDitail = "";
      let address = JSON.parse(localStorage.getItem("address_front"));

      address.forEach(addres => {
        // console.log(this.ruleForm.provinceId)
        if (addres.id === this.ruleForm.provinceId) {
          addresDitail += " " + addres.name;
        }
        addres.childrens.forEach(addres2 => {
          if (addres2.id === this.ruleForm.cityId) {
            addresDitail += " " + addres2.name;
          }
          addres2.childrens.forEach(addres3 => {
            if (addres3.id === this.ruleForm.areaId) {
              addresDitail += " " + addres3.name;
            }
          });
        });
      });
      return (addresDitail += " " + this.ruleForm.wAddress);
    }
  }
};
</script>

<style scoped>
</style>
