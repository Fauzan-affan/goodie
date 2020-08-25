import {Enum} from 'enumify';


class ProductType extends Enum{}

ProductType.initEnum({
    ITEM: {
        label : 'Item',
        value : 0
    },
    VOUCHER: {
        label : 'Voucher',
        value : 1
    },
    COUPON: {
        label : 'Coupon',
        value : 2
    },
    EXCHANGEPOINT: {
        label : 'Point',
        value : 4
    }
})

function getValue(label){
    let value = null;

    for (const freq of ProductType.enumValues) {
        if(freq.label === label){
            value = freq.value;
            break;
        }
    }

    return value;
}

function getLabel(value){
    let label = '';

    for (const freq of ProductType.enumValues) {
        if(freq.value === value){
            label = freq.label;
            break;
        }
    }

    return label;
}

function values(){
    let values = [];

    for (const type of ProductType.enumValues) {
        values.push(type);
    }

    return values;
}

export default {ProductType, getValue, getLabel, values};
