// import React, {Component} from "react";
// import {Button, Checkbox, Form, Icon, Input, Radio, Row, Col, Select, Card, message, Table} from "antd";
// import {connect} from "react-redux";
// import {
//     viewUser,
//     resetStatus,
//     createUser,
//     updateUser,
// } from "../../appRedux/actions/User";
// import {
//     getListProvince,
//     getListCity
// } from "appRedux/actions/Common";
// import {
//     searchRoles
// } from "appRedux/actions/Roles";
// import SweetAlert from "react-bootstrap-sweetalert";
// import {NotificationContainer, NotificationManager} from "react-notifications";
// import CircularProgress from "components/CircularProgress/index";
// import moment from "moment";
//
// const { TextArea } = Input;
// const FormItem = Form.Item;
// const RadioGroup = Radio.Group;
// const Option = Select.Option;
//
// const formItemLayout = {
//     labelCol: {xs: 24, sm: 6},
//     wrapperCol: {xs: 24, sm: 14},
// };
//
// const formTailLayout = {
//     labelCol: {xs: 24, sm: 6},
//     wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
// };
//
// const postalCodeSVG = () => (
//     <svg viewBox="64 64 896 896" width='1em'
//          height='1em'>
//         <defs>
//             <style type="text/css"></style>
//         </defs>
//         <path d="M384 0l0 128-256 0-128 128 128 128 256 0 0 640 128 0 0-512 256 0 128-128-128-128-256 0 0-256-128 0z" p-id="1256" fill="#cdcdcd"></path>
//     </svg>
// );
//
// const addressSVG = () => (
//     <svg viewBox="64 64 896 896" width='1em'
//          height='1em'>
//         <defs>
//             <style type="text/css"></style>
//         </defs>
//         <path d="M832 389.3c-0.5 49.1-16.2 94.1-37.5 137.4-31.8 65-74 123-119.8 178.6-42.6 51.7-88.5 100.6-137.4 146.4-17.1 16-32.7 16.5-50.2 0.8-90.6-81.4-172.1-170.6-234.3-276.1-10.1-17.2-19.3-34.9-27.2-53.2-7.5-17.4-1-35.5 15.1-43 16.2-7.5 33.9-0.9 41.8 16.2 37.2 80.8 90.6 149.5 150 214.6 22.9 25.1 46.9 50.2 71.8 73.4 3.1 2.9 9 4.2 13.4-0.2 82.4-83 158.5-170 214.6-273.6C748.6 480.5 768 425.9 768 389c0-52.3-5.7-75.5-30.3-121-46.8-86.5-119.2-140-218.7-140-113.1 0-213.4 69.6-249 177.3-8.9 27.1-13.6 54.8-14 83.3-0.3 20.4-13.7 34.7-32.1 34.7-18.5 0-32-14.8-31.9-34.8 0.4-151.5 104.8-282.8 252-316.8C565.8 43.6 696.2 94.1 769.9 198c40.7 57.3 60.9 121.2 62.1 191.3z" fill="#cdcdcd" p-id="3386"></path><path d="M512.5 256c-70.9-0.1-128.5 57.2-128.5 128 0 70.3 57.3 127.9 127.5 128 70.8 0.2 128.5-57.3 128.5-128 0-70.4-57.3-127.9-127.5-128z m0.6 192c-36 0.3-65.2-28.4-65.1-64.1 0.1-35.3 28.8-63.9 64.4-63.9 34.7 0 63.5 28.7 63.6 63.6 0.1 34.9-28.3 64.1-62.9 64.4zM960 928v-0.4-1-0.6c0-0.4 0-0.7-0.1-1.1 0-0.2 0-0.4-0.1-0.5 0-0.3-0.1-0.6-0.1-1 0-0.2-0.1-0.4-0.1-0.7 0-0.2-0.1-0.5-0.1-0.7-0.1-0.3-0.1-0.6-0.2-1 0-0.1 0-0.2-0.1-0.3-0.9-3.9-2.4-7.5-4.6-10.7L827 689.3c-8.6-14.9-27.8-20-42.6-11.4l-1.4 0.8c-14.9 8.6-20 27.8-11.4 42.6L872.5 896h-721l100.3-173.7c8.8-15.2 3.5-34.9-11.7-43.7-15.2-8.8-34.9-3.5-43.7 11.7L68.3 912c-1.2 2.1-2.1 4.2-2.8 6.5v0.1c-0.1 0.4-0.3 0.9-0.4 1.3 0 0.1-0.1 0.3-0.1 0.4-0.1 0.3-0.2 0.7-0.2 1 0 0.2-0.1 0.5-0.1 0.7 0 0.2-0.1 0.5-0.1 0.7-0.1 0.3-0.1 0.7-0.1 1 0 0.2 0 0.3-0.1 0.5 0 0.4-0.1 0.8-0.1 1.2v0.2c-0.1 0.8-0.1 1.5-0.1 2.3 0 4.4 0.9 8.7 2.6 12.5 2.6 6.2 7.2 11.6 13.4 15.2 4.5 2.6 9.4 4 14.2 4.2h833.8c16.8 0 30.7-13.2 31.9-29.7v-0.2-1-0.7c-0.1 0-0.1-0.1-0.1-0.2z" fill="#cdcdcd" p-id="3387"></path>
//     </svg>
// );
//
// const addressPlaceholder =
//     <div>
//         <div className="icon icon-map-street-view"></div>
//         <span style={{marginLeft:'5px'}}>Address</span>
//     </div>;
//
// class CreateUpdateUser extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             data : [],
//             listCity : [],
//             msgContent : '',
//             msgType : '',
//             msgShow : false,
//         }
//
//
//         this.onConfirm = this.onConfirm.bind(this);
//         this.back = this.back.bind(this);
//     }
//
//     componentWillMount() {
//         let credential = this.props.authUser;
//         this.props.viewUser(credential);
//
//         if(this.props.listProvince.length < 1){
//             this.props.getListProvince();
//         }
//     }
//
//     componentWillReceiveProps(nextProps){
//
//
//         if (nextProps.listCity !== this.props.listCity) {
//             this.setState({
//                 listCity : nextProps.listCity
//             })
//         }
//
//         if (nextProps.data !== undefined && nextProps.data != this.props.data) {
//             let request = {
//                 id: nextProps.data.address.provinceId
//             };
//             this.props.getListCity(request);
//
//             this.setState({
//                 data: nextProps.data,
//                 // previewImage: nextProps.merchant.merchantLogo
//                 // count: totalRec + 1
//             });
//
//             // if (nextProps.merchant.merchantLogo !== null) {
//             //     let fileListRaw = [{
//             //         uid: '-1',
//             //         name: 'xxx.png',
//             //         status: 'done',
//             //         url: nextProps.merchant.merchantLogo,
//             //     }];
//             //
//             //     this.setState({
//             //         fileList: fileListRaw
//             //     })
//             // }
//
//         }
//
//         // if (nextProps.merchant.logoPoint !== this.props.merchant.logoPoint) {
//         //     this.setState({
//         //         logoPoint: nextProps.merchant.logoPoint
//         //     });
//         // }
//         //
//         // if (nextProps.filePath !== this.props.filePath && this.state.merchant.merchantCode !== '' && nextProps.filePath !== '') {
//         //     let filePath = nextProps.filePath;
//         //
//         //     let merchantNew = this.state.merchant;
//         //     merchantNew.merchantLogo = filePath;
//         //     this.setState({
//         //         merchant: merchantNew
//         //     });
//         //
//         //     this.props.resetFilePath();
//         // }
//
//         if (nextProps.updateSuccess && !nextProps.updateFailed){
//             this.setState({
//                 msgContent : 'Updated Successfully',
//                 msgShow : true,
//                 msgType : 'success'
//             })
//         }else if (!nextProps.updateSuccess && nextProps.updateFailed){
//             this.setState({
//                 msgContent : 'Update failed',
//                 msgShow : true,
//                 msgType : 'danger'
//             })
//         }
//
//         if (nextProps.createSuccess && !nextProps.createFailed){
//             this.setState({
//                 msgContent : 'Created Successfully',
//                 msgShow : true,
//                 msgType : 'success'
//             })
//         }else if (!nextProps.createSuccess && nextProps.createFailed){
//             this.setState({
//                 msgContent : 'Create failed',
//                 msgShow : true,
//                 msgType : 'danger'
//             })
//         }
//     }
//
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if(!err){
//                 let error = false;
//
//                 if(values.password !== values.confirmPassword) {
//                     this.errorNotification('Password is not match. Please input your correct password.');
//                     error = true;
//                     return;
//                 }
//
//                 let address = {
//                     addressLine1: values.address,
//                     addressLine2: '',
//                     addressLine3: '',
//                     countryId: 'ID',
//                     provinceId: values.stateProvinceId,
//                     cityId: values.cityId,
//                     postalCode: values.postalCode,
//                 };
//
//                 let contact = [
//                     {
//                         firstName: values.firstName,
//                         lastName: values.lastName,
//                         emailAddress: values.emailAddress,
//                         mobileNumber: values.mobileNumber,
//                     }
//                 ];
//
//                 let formData = {
//                     merchantName: values.merchantName,
//                     address: address,
//                     contact: contact,
//                 };
//
//                 let request = this.props.authUser;
//                 request.data = formData;
//
//                 if(!error){
//                     if(this.props.match.params.type === 'update') {
//                         this.props.updateUser(request);
//                     }else{
//                         this.props.createUser(request);
//                     }
//                 }
//             }
//         });
//     };
//
//     errorNotification(message) {
//         return NotificationManager.error(message, 'Alert', 3000);
//     }
//
//     back(){
//         this.props.history.goBack();
//     }
//
//     onConfirm(){
//         this.props.resetStatus();
//         if(this.state.msgType === "success"){
//             this.props.history.goBack();
//         }else{
//             this.setState({
//                 msgShow : false
//             })
//         }
//     }
//
//     changeProvince(value){
//         let request = {
//             id : value
//         }
//         this.props.getListCity(request);
//
//         this.props.form.setFieldsValue({
//             cityId: ''
//         });
//     }
//
//
//     render() {
//         const {getFieldDecorator} = this.props.form;
//         let {loader, alertMessage, showMessage} = this.props;
//         const {data, msgShow, msgType, msgContent, dataSourceRule, selectedRule,} = this.state;
//
//         let address = {
//             addressLine1: '',
//             provinceId: '',
//             province: '',
//             cityId: '',
//             cityTown: '',
//             postalCode: ''
//         };
//         if (data.address !== undefined) {
//             address = data.address;
//         }
//
//         let contacts = {
//             firstName: '',
//             lastName: '',
//             mobileNumber: '',
//             email: ''
//         };
//         if (data.contacts !== undefined) {
//             contacts = data.contacts[0];
//         }
//
//
//         let optionProvince= [];
//         this.props.listProvince.forEach((province,i)=>{
//             let option =
//                 <Option key={i} value={province.id}>{province.label}</Option>
//             ;
//             optionProvince.push(option);
//         });
//
//         let optionCity= [];
//         this.state.listCity.forEach((city,i)=>{
//             let option =
//                 <Option key={i} value={city.id}>{city.label}</Option>
//             ;
//             optionCity.push(option);
//         });
//
//         return (
//             <Card className="gx-card" title='User'>
//                 {/*<div>*/}
//                 {/*    {loader == true ? <div className="gx-loader-view"><CircularProgress/></div> : null}*/}
//                 {/*    {showMessage ? message.error(alertMessage.toString()) : null}*/}
//                 {/*</div>*/}
//                 <Form onSubmit={this.handleSubmit} className="">
//
//                     <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Profile</h5>
//                     <div className='custom-box'>
//
//                                     <FormItem {...formItemLayout} label='Full Name'>
//                                         {getFieldDecorator('fullName', {
//                                             rules: [{
//                                                 required: true,
//                                                 message: 'Please input your full name'
//                                             }],
//                                             initialValue: data.fullName
//                                         })(
//                                             <Input placeholder="Full Name"/>
//                                         )}
//                                     </FormItem>
//                                     <FormItem {...formItemLayout} label='Login Name'>
//                                         {getFieldDecorator('loginName', {
//                                             rules: [{
//                                                 required: true,
//                                                 message: 'Please input your login name'
//                                             }],
//                                             initialValue: data.loginName
//                                         })(
//                                             <Input placeholder="Login Name"/>
//                                         )}
//                                     </FormItem>
//
//                                     <FormItem {...formItemLayout} label='Password'>
//                                         {getFieldDecorator('password', {
//                                             rules: [{
//                                                 required: true,
//                                                 message: 'Please input your Password'
//                                             }],
//                                             // initialValue: data.password
//                                         })(
//                                             <Input type="password" placeholder="Password"/>
//                                         )}
//                                     </FormItem>
//
//                                     <FormItem {...formItemLayout} label='Confirm Password'>
//                                         {getFieldDecorator('confirmPassword', {
//                                             rules: [{
//                                                 required: true,
//                                                 message: 'Please input your Password'
//                                             }],
//                                             // initialValue: data.confirmPassword
//                                         })(
//                                             <Input type="password" placeholder="Confirm Password"/>
//                                         )}
//                                     </FormItem>
//
//                                     <FormItem {...formItemLayout} label='Description'>
//                                         {getFieldDecorator('description', {
//                                             rules: [{
//                                                 required: true,
//                                                 message: 'Please input your description'
//                                             }],
//                                             initialValue: data.description
//                                         })(
//                                             <TextArea placeholder='Description' rows={5}/>
//                                         )}
//                                     </FormItem>
//
//                                     <FormItem {...formItemLayout} label='Merchant Name'>
//                                         {getFieldDecorator('merchantName', {
//                                             rules: [{
//                                                 required: true,
//                                                 message: 'Please input your merchant name'
//                                             }],
//                                             initialValue: data.merchantName
//                                         })(
//                                             <Input placeholder="Merchant Name"/>
//                                         )}
//                                     </FormItem>
//
//                                     {/*<FormItem {...formItemLayout} label='Rules'>*/}
//                                     {/*    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>*/}
//                                     {/*        Add point rule for this promotion*/}
//                                     {/*    </Button>*/}
//                                     {/*    <Table*/}
//                                     {/*        className="gx-table-responsive"*/}
//                                     {/*        components={componentsRule}*/}
//                                     {/*        rowClassName={() => 'editable-row'}*/}
//                                     {/*        bordered*/}
//                                     {/*        dataSource={selectedRule}*/}
//                                     {/*        columns={columnsRule}*/}
//                                     {/*    />*/}
//                                     {/*</FormItem>*/}
//
//                     </div>
//
//                     <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Address</h5>
//                     <div className='custom-box'>
//
//                         <FormItem {...formItemLayout} label='Address'>
//                             {getFieldDecorator('address', {
//                                 rules: [{
//                                     required: true,
//                                     message: 'Please input your address'
//                                 }],
//                                 initialValue: address.addressLine1
//                             })(
//                                 <TextArea placeholder='Address' rows={5}
//                                 />
//                             )}
//                         </FormItem>
//
//                         <FormItem {...formItemLayout} label='Province'>
//                             {getFieldDecorator('stateProvinceId',{
//                                 rules: [{
//                                     required: true,
//                                     message: 'Please input province'
//                                 }],
//                                 initialValue: address.provinceId
//                             })(
//                                 <Select
//                                     onChange={this.changeProvince.bind(this)}
//                                     placeholder={
//                                         <div>
//                                             <div style={{display:'inline-block'}} className="icon icon-map-drawing"></div>
//                                             <span style={{marginLeft:'5px'}}>Province</span>
//                                         </div>
//                                     }
//                                 >
//                                     {optionProvince}
//                                 </Select>
//                             )}
//                         </FormItem>
//
//                         <FormItem {...formItemLayout} label='City'>
//                             {getFieldDecorator('cityId',{
//                                 rules: [{
//                                     required: true,
//                                     message: 'Please input city'
//                                 }],
//                                 initialValue: address.cityId
//                             })(
//                                 <Select placeholder={
//                                     <div>
//                                         <div style={{display:'inline-block'}} className="icon icon-navigation"></div>
//                                         <span style={{marginLeft:'5px'}}>City</span>
//                                     </div>
//                                 }
//                                 >
//                                     {optionCity}
//                                 </Select>
//                             )}
//                         </FormItem>
//
//                         <FormItem {...formItemLayout} label='Postal Code'>
//                             {getFieldDecorator('postalCode', {
//                                 rules: [{
//                                     required: true,
//                                     message: 'Please input postal code'
//                                 }],
//                                 initialValue: address.postalCode
//                             })(
//                                 <Input placeholder="Postal Code"/>
//                             )}
//                         </FormItem>
//
//                     </div>
//
//                     <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Contact</h5>
//                     <div className='custom-box'>
//
//                         <FormItem {...formItemLayout} label='First Name'>
//                             {getFieldDecorator('firstName', {
//                                 rules: [{
//                                     required: true,
//                                     message: 'Please input your first name'
//                                 }],
//                                 initialValue: contacts.firstName
//                             })(
//                                 <Input placeholder="First Name"/>
//                             )}
//                         </FormItem>
//                         <FormItem {...formItemLayout} label='Last Name'>
//                             {getFieldDecorator('lastName', {
//                                 rules: [{
//                                     required: true,
//                                     message: 'Please input your last name'
//                                 }],
//                                 initialValue: contacts.lastName
//                             })(
//                                 <Input placeholder="Last Name"/>
//                             )}
//                         </FormItem>
//
//                         <FormItem {...formItemLayout} label='Email address'>
//                             {getFieldDecorator('email', {
//                                 rules: [{
//                                     required: true,
//                                     message: 'Please input your email'
//                                 }],
//                                 initialValue: contacts.email
//                             })(
//                                 <Input placeholder="Email address"/>
//                             )}
//                         </FormItem>
//
//                         <FormItem {...formItemLayout} label='Mobile Number'>
//                             {getFieldDecorator('mobileNumber', {
//                                 rules: [{
//                                     required: true,
//                                     message: 'Please input your phone number'
//                                 }],
//                                 initialValue: contacts.mobileNumber
//                             })(
//                                 <Input placeholder="Mobile Number"/>
//                             )}
//                         </FormItem>
//
//                     </div>
//
//                             <FormItem {...formTailLayout}>
//                                 <Button type="primary" htmlType="submit">Submit</Button>
//                                 <Button type="default" onClick={this.back} >Back</Button>
//                             </FormItem>
//
//                         </Form>
//
//                     <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
//                                 show={msgShow} title={msgContent} onConfirm={this.onConfirm}>
//                     </SweetAlert>
//                     <NotificationContainer/>
//             </Card>
//         );
//     }
// }
//
// const mapStateToProps = ({auth, commonState, merchantState, userState, rolesState}) => {
//     const {authUser} = auth;
//     const {listProvince, listCity} = commonState;
//     const {listRoles} = rolesState
//     const {registerSuccess, registerFailed, alertMessage, loader, showMessage} = merchantState;
//     const {data, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData} = userState
//     return {authUser, listProvince, listCity, registerSuccess, registerFailed, alertMessage, loader, showMessage, data, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData};
// };
//
// export default connect(mapStateToProps, {getListProvince,getListCity, createUser, updateUser, viewUser, searchRoles, resetStatus})(Form.create()(CreateUpdateUser));
