class SimplaList extends HTMLUListElement {
  beforeRegister() {
    this.is = 'simpla-ul';

    this.extends = 'ul';

    this.properties = {

      inner: {
        type: String,
        observer: '_innerChanged'
      },

      active: {
        type: Boolean,
        notify: true,
        value: false,
        observer: '_activeChanged',
        reflectToAttribute: true
      },

      editable: {
        type: Boolean,
        observer: '_editableChanged',
        reflectToAttribute: true
      },

      contenteditable: {
        type: Boolean,
        reflectToAttribute: true,
        computed: '_updateContentEditable(editable)'
      }
    };
  }

  ready() {
    this.inner = this.innerHTML;
    console.log(this.inner);
  }

  get listeners() {
    return {
      'tap': '_handleTap',
      'blur': '_updateInner'
    };
  }

  _updateInner() {
    this.inner = this.innerHTML;
  }

  get behaviors() {
    return [ SimplaConnector ];
  }

  _activeChanged(value) {
    console.log('Active property changed');
  }

  _editableChanged(value) {
    if (!this.editable) {
      this.active = false;
    }
  }

  _updateContentEditable(editable) {
    this.addEventListener('keydown', function(){
      var key = event.keyCode || event.charCode;

      if (key === 8){
        if (this.childElementCount === 1 && this.getElementsByTagName('li')[0].innerHTML === '<br>'){
          event.preventDefault()
        }
      }
    });
    return this.editable;
  }

  _handleTap(e) {
    if (this.editable) {
      e.preventDefault();
      this.active = true;
    }
  }

  _innerChanged(inner) {
    Polymer.dom(this).innerHTML = inner;
  }

  }

Polymer(SimplaList);
