import {Enum} from 'enumify';


class ArticleCategory extends Enum{}

ArticleCategory.initEnum({
    FASHION: {
        label : 'Fashion & Beauty',
        value : 'PC_FASHION_BEAUTY'
    },
    FOOD: {
        label : 'Food',
        value : 'PC_FOOD'
    },
    PS: {
        label : 'Ps',
        value :'PC_PS'
    },
    SHOP: {
        label : 'Shop',
        value : 'PC_SHOP'
    },
    TRAVEL: {
        label : 'Travel',
        value : 'PC_TRAVEL'
    }
})

function getValue(label){
    let value = null;

    for (const freq of ArticleCategory.enumValues) {
        if(freq.label === label){
            value = freq.value;
            break;
        }
    }

    return value;
}

function getLabel(value){
    let label = '';

    for (const freq of ArticleCategory.enumValues) {
        if(freq.value === value){
            label = freq.label;
            break;
        }
    }

    return label;
}

function values(){
    let values = [];

    for (const type of ArticleCategory.enumValues) {
        values.push(type);
    }

    return values;
}

export default {ArticleCategory, getValue, getLabel, values};
