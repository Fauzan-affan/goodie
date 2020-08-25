import {Enum} from 'enumify';


class AdsCategory extends Enum{}

AdsCategory.initEnum({
    COMMON: {
        label : 'Common',
        value : 1
    },
    REWARD: {
        label : 'Reward',
        value : 2
    },
    POST: {
        label : 'Post',
        value : 3
    }
})

function getValue(label){
    let value = null;

    for (const freq of AdsCategory.enumValues) {
        if(freq.label === label){
            value = freq.value;
            break;
        }
    }

    return value;
}

function getLabel(value){
    let label = '';

    for(let j=0;j<AdsCategory.enumValues.length;){
        if(AdsCategory.enumValues[j].value==value)
        {
            label = AdsCategory.enumValues[j].label;
            break;
        };
        j++;
    }

    return label;
}

function values(){
    let values = [];

    for (const type of AdsCategory.enumValues) {
        values.push(type);
    }

    return values;
}

export default {AdsCategory, getValue, getLabel, values};
