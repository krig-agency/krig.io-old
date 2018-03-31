import EventEmitter from './EventEmitter';

export default class FormValidation extends EventEmitter {
  constructor (form, rules) {
    super();

    this.form = form;
    this.rules = rules;
    this.validationTypes = {
      'email': (element) => {
        return element.value.indexOf('@') > 0 ? true : 'Not a valid email address.';
      },
      'not-empty': (element) => {
        return (element.value.length > 0 || element.innerText.length > 0) ? true : 'Input was empty.';
      }
    };

    this.form.addEventListener('submit', this.submit.bind(this));
    Object.entries(this.rules).forEach((entry) => {
      this.form.querySelector(entry[0]).addEventListener('input', this.change.bind(this));
    });
  }

  /**
   * Method handling input change events on each form input with a rule.
   * @param event
   */
  change (event) {
    this.emit('change', event.target);
  }

  /**
   * Method handling submit event to force validation and pause submit.
   * @param event
   */
  submit (event) {
    event.preventDefault();

    let validationErrors = [];
    Object.entries(this.rules).forEach((rule) => {
      let selector = rule[0];
      let rules = rule[1];
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
      if (this.emit('success', (this.form))) {
        event.preventDefault();
      }
    } else {
      this.emit('failure', validationErrors);
    }
  }
}
