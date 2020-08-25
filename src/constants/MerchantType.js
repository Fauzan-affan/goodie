import {Enum} from 'enumify';


class MerchantType extends Enum{}

MerchantType.initEnum({
    LOYALTY: {
        label : 'Full Package Loyalty',
        value : 2,
        description : 'This package include member, issuing point, redeem your reward and sell your product.'
    },
    REWARD: {
        label : 'Only Reward',
        value : 1,
        description : 'This package only include redeem your reward and sell your product. This package is recommend if you have existing loyalty system.'
    }
})

function getValue(label){
    let value = null;

    for (const freq of MerchantType.enumValues) {
        if(freq.label === label){
            value = freq.value;
            break;
        }
    }

    return value;
}

function getLabel(value){
    let label = '';

    for (const type of MerchantType.enumValues) {
        if(type.value === value){
            label = type.label;
            break;
        }
    }

    return label;
}

function values(){
    let values = [];

    for (const type of MerchantType.enumValues) {
        values.push(type);
    }

    return values;
}

export default {MerchantType, getValue, getLabel, values};
