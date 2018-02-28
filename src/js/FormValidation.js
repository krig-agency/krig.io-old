import EventEmitter from './EventEmitter';

export default class FormValidation extends EventEmitter {
  constructor (form, rules) {
    super();

    this.form = form;
    this.rules = rules;

    this.validationTypes = {
      'email': (element) => {
        let email = element.value();
        return '/\\S+@\\S+/'.test(email) ? true : 'Not a valid email address.';
      },
      'not-empty': (element) => {
        return (element.value().length > 0 || element.innerText.length > 0) ? true : 'Input was empty.';
      }
    };
  }

  submit () {
    this.form.preventDefault();

    let validationErrors = [];
    this.rules.forEach((rules, selector) => {
      let element = this.form.querySelector(selector);
      for (let test of rules) {
        let output = this.validationTypes[test](element);
        if (output !== true) {
          validationErrors.push(
            {
              'element': element,
              'selector': selector,
              'error': output
            }
          );
        }
      }
    });

    if (validationErrors.length === 0) {
      this.emit('success', (this.form));
    } else {
      this.emit('failure', validationErrors);
    }
  }
}
