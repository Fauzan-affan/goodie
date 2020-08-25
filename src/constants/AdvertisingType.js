import {Enum} from 'enumify';


class AdvertisingType extends Enum{}

AdvertisingType.initEnum({
    SPLASHSCREEN: {
        label : 'Splash Screen',
        value : 1
    },
    BANNERHOME: {
        label : 'Banner Home',
        value : 2
    },
    INTRODUCTION: {
        label : 'Introduction',
        value : 3
    },
    POPUP: {
        label : 'Pop Up',
        value : 4
    }
})

function getValue(label){
    let value = null;

    for (const freq of AdvertisingType.enumValues) {
        if(freq.label === label){
            value = freq.value;
            break;
        }
    }

    return value;
}

function getLabel(value){
    let label = '';

    for (const freq of AdvertisingType.enumValues) {
        if(freq.value === value){
            label = freq.label;
            break;
        }
    }

    return label;
}

function values(){
    let values = [];

    for (const type of AdvertisingType.enumValues) {
        values.push(type);
    }

    return values;
}

export default {AdvertisingType, getValue, getLabel, values};
