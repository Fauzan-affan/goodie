import {Enum} from 'enumify';


class RedeemFreq extends Enum{}

RedeemFreq.initEnum({
    MULTIPLE: {
        label : 'Multiple',
        value : -1
    },
    ONCE: {
        label : 'Once',
        value : 1
    },
    DAILY: {
        label : 'Daily',
        value : 2
    }
})

function getValue(label){
    let value = null;

    for (const freq of RedeemFreq.enumValues) {
        if(freq.label === label){
            value = freq.value;
            break;
        }
    }

    return value;
}

function getLabel(value){
    let label = '';

    for (const freq of RedeemFreq.enumValues) {
        if(freq.value === value){
            label = freq.label;
            break;
        }
    }

    return label;
}

function values(){
    let values = [];

    for (const type of RedeemFreq.enumValues) {
        values.push(type);
    }

    return values;
}

export default {RedeemFreq, getValue, getLabel, values};
