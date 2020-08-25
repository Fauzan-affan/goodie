import {Enum} from 'enumify';


class GamificationType extends Enum{}

GamificationType.initEnum({
    SPINNER: {
        label : 'Spinner',
        value : 1
    },
    SURVEY: {
        label : 'Survey',
        value : 2
    },
    QUIZ: {
        label : 'Quiz',
        value : 3
    },
    // POPUP: {
    //     label : 'Pop Up',
    //     value : 4
    // }
})

function getValue(label){
    let value = null;

    for (const freq of GamificationType.enumValues) {
        if(freq.label === label){
            value = freq.value;
            break;
        }
    }

    return value;
}

function getLabel(value){
    let label = '';

    for (const freq of GamificationType.enumValues) {
        if(freq.value === value){
            label = freq.label;
            break;
        }
    }

    return label;
}

function values(){
    let values = [];

    for (const type of GamificationType.enumValues) {
        values.push(type);
    }

    return values;
}

export default {GamificationType, getValue, getLabel, values};
