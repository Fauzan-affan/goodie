import {Enum} from 'enumify';


class CustomRuleTrigger extends Enum{}

CustomRuleTrigger.initEnum({
    ISSUING: {
        label : 'Issuing',
        value : 0
    },
    AMOUNT: {
        label : 'Amount',
        value : 1
    }
})

function getValue(label){
    let value = null;

    for (const ruleTrigger of CustomRuleTrigger.enumValues) {
        if(ruleTrigger.label === label){
            value = ruleTrigger.value;
            break;
        }
    }

    return value;
}

function values(){
    let values = [];

    for (const type of CustomRuleTrigger.enumValues) {
        values.push(type);
    }

    return values;
}

export default {CustomRuleTrigger, getValue, values};
