import {Enum} from 'enumify';


class BlastType extends Enum{}

BlastType.initEnum({
    EMAIL: {
        label : 'Email',
        value : 1
    },
    SMS: {
        label : 'SMS',
        value : 2
    },
})

function getValue(label){
    let value = null;

    for (const freq of BlastType.enumValues) {
        if(freq.label === label){
            value = freq.value;
            break;
        }
    }

    return value;
}

function getLabel(value){
    let label = '';

    for (const freq of BlastType.enumValues) {
        if(freq.value === value){
            label = freq.label;
            break;
        }
    }

    return label;
}

function values(){
    let values = [];

    for (const type of BlastType.enumValues) {
        values.push(type);
    }

    return values;
}

export default {BlastType, getValue, getLabel, values};
