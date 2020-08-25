import {Enum} from 'enumify';


class VoucherStatus extends Enum{}

VoucherStatus.initEnum({
    ACTIVE: {
        label : 'Active',
        value : -1
    },
    REDEEMED: {
        label : 'Redeemed',
        value : 0
    },
    SUSPENDED: {
        label : 'Suspended',
        value : 1
    },
    EXPIRED: {
        label : 'Expired',
        value : 2
    }
})

function getValue(label){
    let value = null;

    for (const status of VoucherStatus.enumValues) {
        if(status.label === label){
            value = status.value;
            break;
        }
    }

    return value;
}

function values(){
    let values = [];

    for (const type of VoucherStatus.enumValues) {
        values.push(type);
    }

    return values;
}

export default {VoucherStatus, getValue, values};
