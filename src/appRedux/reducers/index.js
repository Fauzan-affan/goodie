import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import commonReducer from "./Common";
import Settings from "./Settings";
import authReducer from "./Auth";
import rulesReducer from "./Rules";
import tierReducer from "./Tier";
import programReducer from "./Program";
import productReducer from "./Product";
import promotionReducer from "./Promotion";
import memberReducer from "./Member";
import merchantReducer from "./Merchant";
import reportReducer from "./Report";
import dashboardReducer from "./Dashboard";
import billingReducer from "./Billing";
import rolesReducer from "./Roles";
import userReducer from "./User";
import blastReducer from "./Blast";
import pointReducer from "./Point";
import advertisingReducer from "./Advertising";
import menuReducer from "./Menu";
import doorprizeReducer from "./Doorprize";
import depositReducer from "./Deposit";
import gamificationReducer from "./Gamification";
import approvalReducer from "./Approval";
import reconciliationReducer from "./Reconciliation";
import storeReducer from "./Store";
// import crudReducer from "./Crud";
// import crudContentReducer from "./CrudContent";

const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
    auth : authReducer,
    rules : rulesReducer,
    tierState : tierReducer,
    commonState : commonReducer,
    programState : programReducer,
    productState : productReducer,
    promotionState : promotionReducer,
    memberState : memberReducer,
    merchantState : merchantReducer,
    reportState : reportReducer,
    dashboardState : dashboardReducer,
    billingState : billingReducer,
    rolesState : rolesReducer,
    userState : userReducer,
    blastState : blastReducer,
    advertisingState : advertisingReducer,
    menuState : menuReducer,
    doorprizeState : doorprizeReducer,
    pointState : pointReducer,
    depositState: depositReducer,
    gamificationState: gamificationReducer,
    approvalState : approvalReducer,
    reconciliationState : reconciliationReducer,
    storeState : storeReducer,
    // crudState : crudReducer,
    // crudContentState : crudContentReducer,
});

export default reducers;
