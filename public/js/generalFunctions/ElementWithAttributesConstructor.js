class ElementWithAttributes{

    constructor(tagName, attributesArrayOrObject, baseParent){
        
        this.tag              = document.createElement(tagName);



        if(Array.isArray(attributesArrayOrObject)){

            this.attribute = [];

            for (let i = 0; i < attributesArrayOrObject.length; i++){
                this.attribute[i]        = document.createAttribute(attributesArrayOrObject[i].attribute);
                this.attribute[i].value  = attributesArrayOrObject[i].value;
                this.tag.setAttributeNode(this.attribute[i]);

            }

     
        }

        if(attributesArrayOrObject.attribute && attributesArrayOrObject.value){

            this.attribute          = document.createAttribute(attributesArrayOrObject.attribute)
            this.attribute.value    = attributesArrayOrObject.value;
            this.tag.setAttributeNode(this.attribute);
        }

  
        baseParent.append(this.tag)
        return this.tag


    }



}     

export {ElementWithAttributes}