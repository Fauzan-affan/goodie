import {Enum} from 'enumify';


class BasicRuleType extends Enum{}

BasicRuleType.initEnum({
    PERCENTAGE: {
        label : 'Percentage Amount',
        value : 0
    },
    FIXED: {
        label : 'Fixed Amount',
        value : 1
    }
})

function getValue(label){
    let value = null;

    for (const ruleType of BasicRuleType.enumValues) {
        if(ruleType.label === label){
            value = ruleType.value;
            break;
        }
    }

    return value;
}

function values(){
    let values = [];

    for (const type of BasicRuleType.enumValues) {
        values.push(type);
    }

    return values;
}

export default {BasicRuleType, getValue, values};
