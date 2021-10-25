const buildForm = (input) => {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
	const formElement = document.getElementById('form');
    jsObj = JSON.parse(reader.result);
    let domForm = document.createElement('form');
    domForm.setAttribute('name', jsObj.form.name);
    domForm.setAttribute('onSubmit', 'alert(jsObj.form.postmessage)');
    formElement.innerHTML = '';
	formElement.append(domForm);
    for(let i=0; i < jsObj.form.items.length; i++){
      let objItem = jsObj.form.items[i];
      let domItem;
      createInput(objItem, domItem, domForm);
    }
  };    
}

// Версия для запроса при наличии сервера
/*fetch('object2.json')
  .then(jsonObj=>jsonObj.json())
  .then(function(jsonObj){
    jsObj = JSON.parse(JSON.stringify(jsonObj));
    let domForm = document.createElement('form');
    domForm.setAttribute('name', jsObj.form.name);
    domForm.setAttribute('onSubmit', 'alert(jsObj.form.postmessage)');
    document.body.append(domForm);
    for(let i=0; i < jsObj.form.items.length; i++){
      let objItem = jsObj.form.items[i];
      let domItem;
      createInput(objItem, domItem, domForm);
    }
  });*/


  function setAtrributes(objAttributes, domItem){
    Object.entries(objAttributes).forEach(el => {
      let keyAttribute = el[0];
      let valueAttribute = el[1];
      
      switch(keyAttribute){
        case 'message':
          domItem.innerHTML = valueAttribute;
          break;
        case 'name':
        case 'placeholder':
        case 'value':
          domItem.setAttribute(keyAttribute, valueAttribute);
          break;
        case 'required':
          domItem.required = objAttributes.required;
          break;
        case 'validationRules':
          domItem.setAttribute("type", valueAttribute[0].type);
          break;
        case 'class':
          domItem.className = valueAttribute;
          break;
        case 'disabled':
          domItem.disabled = valueAttribute;
          break;
        case 'checked':
          domItem.checked = valueAttribute;
          break;
        case 'selected':
          domItem.selected = valueAttribute;
          break;
        case 'text':
          domItem.innerHTML = valueAttribute;
          break;
      }
    })
  }
  
  function createInput(objItem, domItem, domForm){    
  
    switch(objItem.type){
      case 'filler':
        domItem = document.createElement('p');
        break;
      case 'text':
        domItem = document.createElement('input');
        createLabel(objItem.attributes.label, domForm);
        break;
      case 'textarea':
        domItem = document.createElement('textarea');
        createLabel(objItem.attributes.label, domForm);
        break;
      case 'checkbox':
        domItem = document.createElement('input');
        domItem.setAttribute('type', 'checkbox');
        createLabel(objItem.attributes.label, domForm);
        break;
      case 'button':
        domItem = document.createElement('button');
        break;
      case 'select':
        domItem = document.createElement('select');
        createLabel(objItem.attributes.label, domForm);
        objItem.attributes.options.forEach(el => {
          let optionItem = document.createElement('option');
          let objOpt = el;
          setAtrributes(objOpt, optionItem);
          domItem.append(optionItem);
        })
        break;
      case 'radio':
        createLabel(objItem.attributes.label, domForm);
        objItem.attributes.items.forEach(el => {
          let optionItem = document.createElement('input');
          let objOpt = el;
          createLabel(el.label, domForm);
          optionItem.setAttribute('type', 'radio');
          setAtrributes(objItem.attributes, optionItem);
          setAtrributes(objOpt, optionItem);
          domForm.append(optionItem);
        })
        break;
    }
    if(objItem.type != 'radio') {
      setAtrributes(objItem.attributes, domItem);
      domForm.append(domItem);
    }
  }
  
  function createLabel(objLabel, domForm) {
    let labelItem = document.createElement('label');
    labelItem.innerHTML = objLabel;
    domForm.append(labelItem);
  }