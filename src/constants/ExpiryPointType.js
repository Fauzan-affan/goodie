import {Enum} from 'enumify';


class ExpiryPointType extends Enum{}

ExpiryPointType.initEnum({
    NO_EXPIRY: {
        label : 'No Expiry',
        value : 0
    },
    EXPIRY_DAY: {
        label : 'Expiry Day',
        value : 1
    },
    EXPIRY_DATE: {
        label : 'Expiry Date',
        value : 2
    }
})

function getValue(label){
    let value = null;

    for (const freq of ExpiryPointType.enumValues) {
        if(freq.label === label){
            value = freq.value;
            break;
        }
    }

    return value;
}

function getLabel(value){
    let label = '';

    for (const freq of ExpiryPointType.enumValues) {
        if(freq.value === value){
            label = freq.label;
            break;
        }
    }

    return label;
}

function values(){
    let values = [];

    for (const type of ExpiryPointType.enumValues) {
        values.push(type);
    }

    return values;
}

export default {ExpiryPointType, getValue, getLabel, values};
