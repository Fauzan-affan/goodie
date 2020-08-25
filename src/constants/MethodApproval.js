import {Enum} from 'enumify';


class MethodApproval extends Enum{}

MethodApproval.initEnum({
    ACCEPT: {
        label : 'Approved',
        value : -1
    },
    DECLINE: {
        label : 'Rejected',
        value : 1
    },
})

function getValue(label){
    let value = null;

    for (const freq of MethodApproval.enumValues) {
        if(freq.label === label){
            value = freq.value;
            break;
        }
    }

    return value;
}

function getLabel(value){
    let label = '';

    for(let j=0;j<MethodApproval.enumValues.length;){
        if(MethodApproval.enumValues[j].value==value)
        {
            label = MethodApproval.enumValues[j].label;
            break;
        };
        j++;
    }

    return label;
}

function values(){
    let values = [];

    for (const type of MethodApproval.enumValues) {
        values.push(type);
    }

    return values;
}

export default {MethodApproval, getValue, getLabel, values};
