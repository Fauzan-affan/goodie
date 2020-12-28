import React from "react";
import {Route, Switch} from "react-router-dom";

// import asyncComponent from "util/asyncComponent";

import Dashboard from "../containers/Dashboard/index";
import Rules from "../containers/Rules/index";
import SearchRules from "../containers/Rules/search";
import ViewRule from "../containers/Rules/view";
import CreateUpdateBasic from "../containers/Rules/createupdatebasic";
import CreateUpdateReferral from "../containers/Rules/createupdatereferral";
import CreateUpdateCustom from "../containers/Rules/createupdatecustom";
import Tier from "../containers/Tier/index";
import SearchTiers from "../containers/Tier/search";
import ViewTier from "../containers/Tier/view";
import CreateUpdateTier from "../containers/Tier/createupdate";
import Product from "../containers/Product/index";
import SearchProducts from "../containers/Product/search";
import ViewProduct from "../containers/Product/view";
import CreateUpdateProduct from "../containers/Product/createupdate";
import Program from "../containers/Program/index";
import SearchPrograms from "../containers/Program/search";
import ViewProgram from "../containers/Program/view";
import CreateUpdateProgram from "../containers/Program/createupdate";
import CreateExternal from "../containers/Program/createexternal";
import Promotion from "../containers/Promotion/index";
import SearchPromotions from "../containers/Promotion/search";
import ViewPromotion from "../containers/Promotion/view";
import CreateUpdatePromotion from "../containers/Promotion/createupdate";
import SearchMember from "../containers/Member/search";
import ViewMember from "../containers/Member/view";
import SearchBilling from "../containers/Billing/search";
import detailBilling from "../containers/Billing/view";
import User from "../containers/User/index";
import Profile from "../containers/Merchant/profile";
import EditProfile from "../containers/Merchant/update";
import Report from "../containers/Report/index";
import IssuingReport from "../containers/Report/issuing";
import RedeemReport from "../containers/Report/redeem";
import MemberBalanceReport from "../containers/Report/memberbalance";
import ReferralReport from "../containers/Report/referral";
import PointTransactionReport from "../containers/Report/pointtransaction";
import VoucherBalanceReport from "../containers/Report/voucherbalance";
import PointTransferReport from "../containers/Report/pointtransfer";
import ChangePassword from "../containers/User/changepassword";
import ChangePasswordUser from "../containers/User/changepassworduser"
import SearchRole from "../containers/Role/search";
import ViewRole from "../containers/Role/view";
import CreateUpdateRole from "../containers/Role/createupdaterole";
import SearchUser from "../containers/User/search";
import ViewUser from "../containers/User/view";
import CreateUser from "../containers/User/createuser"
import  UpdateUser from "../containers/User/updateuser"
// import CreateUpdateUser from "../containers/User/createupdateuser";
import Advertising from "../containers/Advertising/index";
import SearchAdvertising from "../containers/Advertising/search";
import  ViewAdvertising from "../containers/Advertising/view";
import CreateUpdateAdvertising from "../containers/Advertising/createupdate";
import Blast from "../containers/Blast/index";
import SearchBlast from "../containers/Blast/search";
import  ViewBlast from "../containers/Blast/view";
import CreateUpdateBlast from "../containers/Blast/createupdate";
import Doorprize from "../containers/Doorprize/index";
import SearchDoorprize from "../containers/Doorprize/search";
import CreateDoorprize from "../containers/Doorprize/createupdate";
import Point from "../containers/PointValue/index";
import SearchPoint from "../containers/PointValue/search";
import ViewPoint from "../containers/PointValue/view";
// import CreateUpdatePoint from "../containers/PointValue/createupdate";
import CreatePointValue from "../containers/PointValue/createpointvalue"
import UpdatePointValue from "../containers/PointValue/updatepointvalue"
import Deposit from "../containers/Deposit";
import DepositBalance from "../containers/Deposit/BalanceHistory";
import TopUp from "../containers/Deposit/TopUp";
import Gamification from "../containers/Gamification/index";
import SearchGamification from "../containers/Gamification/search";
import ViewGamification from "../containers/Gamification/view";
import GamificationCreateUpdateSurvey from "../containers/Gamification/createupdate"
import GamificationCreateUpdateSpinner from "../containers/Gamification/createupdatespinner"
import GamificationCreateUpdateQuiz from "../containers/Gamification/createupdatequiz"
import SearchGamificationRule from "../containers/Rules/gamification";
import CreateUpdateGamification from "../containers/Rules/gamificationCreateUpdate";
import Approval from "../containers/Approval/index";
import SearchApproval from "../containers/Approval/search";
import ViewApproval from "../containers/Approval/view";
import QualityControlApproval from "../containers/Approval/QcApproval";
import Reconciliation from "../containers/Reconciliation/index";
import SearchReconciliation from "../containers/Reconciliation/search";
import SearchReconciliationPayable from "../containers/Reconciliation/AP";
import SearchReconciliationReceiveble from "../containers/Reconciliation/AR";
import SearchReconciliationPointfee from "../containers/Reconciliation/pointfeereport";
import ViewReconciliation from "../containers/Reconciliation/view";
import Store from "../containers/Store/index";
import SearchStore from "../containers/Store/search";
import ViewStore from "../containers/Store/view";
import CreateStore from "../containers/Store/createstore";
import UpdateStore from "../containers/Store/updatestore";
// import Crud from "../containers/Crud/index";
// import SearchCrud from "../containers/Crud/search";
// import ViewCrud from "../containers/Crud/view";
// import CreateUpdateCrud from "../containers/Crud/createupdate";
// import CrudContent from "../containers/CrudContent/index";
// import SearchCrudContent from "../containers/CrudContent/search";
// import ViewCrudContent from "../containers/CrudContent/view";
// import CreateUpdateCrudContent from "../containers/CrudContent/createupdate";


const App = ({match}) => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Route path={`${match.url}dashboard`} component={Dashboard}/>
            <Route exact path={`${match.url}rules`} component={Rules}/>
            <Route exact path={`${match.url}rules/search`} component={SearchRules}/>
            <Route exact path={`${match.url}rules/view/:type/:id`} component={ViewRule}/>
            <Route exact path={`${match.url}rules/:type/basic/:id?`} component={CreateUpdateBasic}/>
            <Route exact path={`${match.url}rules/:type/referral/:id?`} component={CreateUpdateReferral}/>
            <Route exact path={`${match.url}rules/:type/custom/:id?`} component={CreateUpdateCustom}/>
            <Route exact path={`${match.url}tier`} component={Tier}/>
            <Route exact path={`${match.url}tier/search`} component={SearchTiers}/>
            <Route exact path={`${match.url}tier/view/:id`} component={ViewTier}/>
            <Route exact path={`${match.url}tier/:type/:id?`} component={CreateUpdateTier}/>
            <Route exact path={`${match.url}promotion`} component={Promotion}/>
            <Route exact path={`${match.url}promotion/search`} component={SearchPromotions}/>
            <Route exact path={`${match.url}promotion/view/:id`} component={ViewPromotion}/>
            <Route exact path={`${match.url}promotion/:type/:period/:id?`} component={CreateUpdatePromotion}/>
            <Route exact path={`${match.url}product`} component={Product}/>
            <Route exact path={`${match.url}product/search`} component={SearchProducts}/>
            <Route exact path={`${match.url}product/view/:id`} component={ViewProduct}/>
            <Route exact path={`${match.url}product/:type/:productType/:id?`} component={CreateUpdateProduct}/>
            <Route exact path={`${match.url}blast`} component={Blast}/>
            <Route exact path={`${match.url}blast/search`} component={SearchBlast}/>
            <Route exact path={`${match.url}blast/view/:id`} component={ViewBlast}/>
            <Route exact path={`${match.url}blast/:type/:messageType/:id?`} component={CreateUpdateBlast}/>
            <Route exact path={`${match.url}reward`} component={Program}/>
            <Route exact path={`${match.url}reward/search`} component={SearchPrograms}/>
            <Route exact path={`${match.url}reward/view/:id`} component={ViewProgram}/>
            <Route exact path={`${match.url}reward/:type/:source/:id?`} component={CreateUpdateProgram}/>
            <Route exact path={`${match.url}reward/marketplace`} component={CreateExternal}/>
            <Route exact path={`${match.url}user`} component={User}/>
            <Route exact path={`${match.url}user/change-password`} component={ChangePassword}/>
            <Route exact path={`${match.url}user/:id/password`} component={ChangePasswordUser}/>
            <Route exact path={`${match.url}user/roles`} component={SearchRole}/>
            <Route exact path={`${match.url}roles/view/:id`} component={ViewRole}/>
            <Route exact path={`${match.url}user/roles/:id/:type?`} component={CreateUpdateRole}/>
            <Route exact path={`${match.url}user/search`} component={SearchUser}/>
            <Route exact path={`${match.url}user/view/:id`} component={ViewUser}/>
            <Route exact path={`${match.url}user/create`} component={CreateUser}/>
            <Route exact path={`${match.url}user/:id/update`} component={UpdateUser}/>
            <Route exact path={`${match.url}point`} component={Point}/>
            <Route exact path={`${match.url}point/search`} component={SearchPoint}/>
            <Route exact path={`${match.url}point/view/:id`} component={ViewPoint}/>
            <Route exact path={`${match.url}point/create`} component={CreatePointValue}/>
            <Route exact path={`${match.url}point/:id/:type?`} component={UpdatePointValue}/>
            {/*<Route exact path={`${match.url}point/:id/:type?`} component={CreateUpdatePoint}/>*/}
            <Route exact path={`${match.url}member`} component={SearchMember}/>
            <Route exact path={`${match.url}member/view/:id`} component={ViewMember}/>
            <Route exact path={`${match.url}billing`} component={SearchBilling}/>
            <Route exact path={`${match.url}billing/view/:id`} component={detailBilling}/>
            <Route exact path={`${match.url}merchant/profile`} component={Profile}/>
            <Route exact path={`${match.url}merchant/profile/edit`} component={EditProfile}/>
            <Route exact path={`${match.url}report`} component={Report}/>
            <Route exact path={`${match.url}report/issuing`} component={IssuingReport}/>
            <Route exact path={`${match.url}report/redeem`} component={RedeemReport}/>
            <Route exact path={`${match.url}report/member`} component={MemberBalanceReport}/>
            <Route exact path={`${match.url}report/referral`} component={ReferralReport}/>
            <Route exact path={`${match.url}report/point-transaction`} component={PointTransactionReport}/>
            <Route exact path={`${match.url}report/voucher`} component={VoucherBalanceReport}/>
            <Route exact path={`${match.url}report/point-transfer`} component={PointTransferReport}/>
            <Route exact path={`${match.url}advertising`} component={Advertising}/>
            <Route exact path={`${match.url}advertising/search`} component={SearchAdvertising}/>
            <Route exact path={`${match.url}advertising/view/:id`} component={ViewAdvertising}/>
            <Route exact path={`${match.url}advertising/:type/:advertisingType/:id?`} component={CreateUpdateAdvertising}/>
            <Route exact path={`${match.url}doorprize`} component={Doorprize}/>
            <Route exact path={`${match.url}doorprize/search`} component={SearchDoorprize}/>
            <Route exact path={`${match.url}doorprize/create`} component={CreateDoorprize}/>
            <Route exact path={`${match.url}deposit`} component={Deposit}/>
            <Route exact path={`${match.url}deposit/history`} component={DepositBalance} />
            <Route exact path={`${match.url}deposit/topup`} component={TopUp} />
            {/*Route exact path={`${match.url}rules`} component={Rules}/>*/}
            {/*<Route exact path={`${match.url}rules/search`} component={SearchRules}/>*/}
            {/*<Route exact path={`${match.url}rules/view/:type/:id`} component={ViewRule}/>*/}
            {/*<Route exact path={`${match.url}rules/:type/basic/:id?`} component={CreateUpdateBasic}/>*/}
            {/*<Route exact path={`${match.url}rules/:type/referral/:id?`} component={CreateUpdateReferral}/>*/}
            {/*<Route exact path={`${match.url}rules/:type/custom/:id?`} component={CreateUpdateCustom}/>*/}
            <Route exact path={`${match.url}gamification`} component={Gamification}/>
            <Route exact path={`${match.url}gamification/search`} component={SearchGamification}/>
            <Route exact path={`${match.url}gamification/view/:id`} component={ViewGamification}/>
            <Route exact path={`${match.url}gamification/:type/survey/:id?`} component={GamificationCreateUpdateSurvey}/>
            <Route exact path={`${match.url}gamification/:type/quiz/:id?`} component={GamificationCreateUpdateQuiz}/>
            <Route exact path={`${match.url}gamification/:type/spinner/:id?`} component={GamificationCreateUpdateSpinner}/>
            <Route exact path={`${match.url}rules/gamification/search`} component={SearchGamificationRule} />
            <Route exact path={`${match.url}rules/gamification/update/:typeName/:id`} component={CreateUpdateGamification}/>
            <Route exact path={`${match.url}rules/gamification/create`} component={CreateUpdateGamification}/>
            <Route exact path={`${match.url}approval`} component={Approval}/>
            <Route exact path={`${match.url}approval/search`} component={SearchApproval}/>
            <Route exact path={`${match.url}approval/view/:id`} component={ViewApproval}/>
            <Route exact path={`${match.url}approval/:id/update`} component={QualityControlApproval}/>
            <Route exact path={`${match.url}reconciliation`} component={Reconciliation}/>
            <Route exact path={`${match.url}reconciliation/list`} component={SearchReconciliation}/>
            <Route exact path={`${match.url}reconciliation/payable`} component={SearchReconciliationPayable}/>
            <Route exact path={`${match.url}reconciliation/receiveble`} component={SearchReconciliationReceiveble}/>
            <Route exact path={`${match.url}reconciliation/pointfee`} component={SearchReconciliationPointfee}/>
            {/*<Route exact path={`${match.url}reconciliation/view/:id`} component={ViewReconciliation}/>*/}
            <Route exact path={`${match.url}store`} component={Store}/>
            <Route exact path={`${match.url}store/search`} component={SearchStore}/>
            <Route exact path={`${match.url}store/view/:id`} component={ViewStore}/>
            <Route exact path={`${match.url}store/create`} component={CreateStore}/>
            <Route exact path={`${match.url}store/:id/update`} component={UpdateStore}/>
            {/* <Route exact path={`${match.url}crud`} component={Crud}/>
            <Route exact path={`${match.url}crud/search`} component={SearchCrud}/>
            <Route exact path={`${match.url}crud/view/:id`} component={ViewCrud}/>
            <Route exact path={`${match.url}crud/:type/:productType/:id?`} component={CreateUpdateCrud}/>
            <Route exact path={`${match.url}crud_content`} component={CrudContent}/>
            <Route exact path={`${match.url}crud_content/search`} component={SearchCrudContent}/>
            <Route exact path={`${match.url}crud_content/view/:id`} component={ViewCrudContent}/>
            <Route exact path={`${match.url}crud_content/:type/:productType/:id?`} component={CreateUpdateCrudContent}/> */}
        </Switch>
    </div>
);

export default App;
