import {all} from "redux-saga/effects";
import authSagas from "./Auth";
import commonSagas from "./Common";
import rulesSagas from "./Rules";
import tierSagas from "./Tier";
import programSagas from "./Program";
import productSagas from "./Product";
import promotionSagas from "./Promotion";
import memberSagas from "./Member";
import merchantSagas from "./Merchant";
import reportSagas from "./Report";
import dashboardSagas from "./Dashboard";
import billingSagas from "./Billing";
import roleSagas from "./Roles";
import userSagas from "./User";
import blastSagas from "./Blast";
import pointSagas from "./Point";
import menuSagas from "./Menu";
import doorprizeSagas from "./Doorprize";
import advertisingSagas from "./Advertising"
import depositSagas from "./Deposit";
import gamificationSagas from "./Gamification";
import gamificationCreateUpdateSagas from "./GamificationCreateUpdate";
import approvalSagas from "./Approval";
import reconciliationSagas from "./Reconciliation";
import storeSagas from "./Store";
// import crudSagas from "./Crud";
// import crudContentSagas from "./CrudContent";

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        commonSagas(),
        rulesSagas(),
        tierSagas(),
        programSagas(),
        productSagas(),
        promotionSagas(),
        memberSagas(),
        merchantSagas(),
        reportSagas(),
        dashboardSagas(),
        billingSagas(),
        roleSagas(),
        userSagas(),
        blastSagas(),
        advertisingSagas(),
        menuSagas(),
        doorprizeSagas(),
        pointSagas(),
        depositSagas(),
        gamificationSagas(),
        gamificationCreateUpdateSagas(),
        approvalSagas(),
        reconciliationSagas(),
        storeSagas(),
        // crudSagas(),
        // crudContentSagas(),
    ]);
}
