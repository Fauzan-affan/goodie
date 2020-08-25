import {Enum} from 'enumify';


class TransactionType extends Enum{}

TransactionType.initEnum({
    ALL: {
        label : 'All',
        value : 0
    },
    ISSUING: {
        label : 'Issuing',
        value : 1
    },
    REDEEM: {
        label : 'Redeem',
        value : 2
    }
})

function getValue(label){
    let value = null;

    for (const trxType of TransactionType.enumValues) {
        if(trxType.label === label){
            value = trxType.value;
            break;
        }
    }

    return value;
}

function values(){
    let values = [];

    for (const type of TransactionType.enumValues) {
        values.push(type);
    }

    return values;
}

export default {TransactionType, getValue, values};
