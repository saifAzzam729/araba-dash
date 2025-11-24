export const createAttributeEntity = (attributeId, attributeName, optionsList = [], pivotTableId = null, required= false) => {
    return {
        id: pivotTableId,// pivot table id,
        attribute: attributeId,// attr id,
        name: attributeName,
        required: required,
        options: optionsList.map(opt => createOptionEntity(
            opt.id,
            opt.option.id,
            opt.option.value,
            opt.price,
            opt.priceType,
            opt.publish,
            opt.defaultOption
        )),

    }
}

export const createOptionEntity = (id, optionId, optionName, price = 0 , priceType, publish= false, defaultOption= false ) => {
    return {
        id, optionId, optionName, price, priceType, publish, defaultOption
    }
}

export const createOptionEntityWithDefaultValue = () => {
    return {
        id : undefined,
        optionId: undefined,
        optionName: undefined,
        price: 0,
        priceType: undefined,
        publish: undefined,
        defaultOption: undefined,
    }
}