import { inject as service } from '@ember/service'
import { computed } from '@ember/object'
import Controller from '@ember/controller'

export default Controller.extend({
  avatardb: service(),
  pilasBloquesApi: service(),
  registerData: { email: '' },
  validUsername: true,

  avatars: computed('avatardb', function () {
    return this.avatardb.allAvatars()
  }),

  usernameFormatValidation: [{
    message: 'El usuario sólo puede contener letras, números y guiones',
    validate: (userName) => {
      const re = /^[a-zA-Z\d]+[a-zA-Z\d\-_]*$/
      return re.test(userName)
    }
  }],

  mailValidation:[{
    message: 'Este no es un email válido',
    validate: (mail) => {
      // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(mail) || mail == ''
    }
  }],

  parentNameValidation: [{
    message: 'Se requiere nombre y apellido',
    validate: (parentName) => {
      const re = /.+ .+/
      return re.test(parentName)
    }
  }],

  DNIValidation: [{
    message: 'El DNI es invalido',
    validate: (DNI) => {
      // any string with at least 6 numbers
      const re = new RegExp('(\\D*\\d\\D*){6,}')
      return re.test(DNI)
    }
  }],

  actions: {
    doRegister() {
      this.pilasBloquesApi.register(this.registerData)
        .then(() => this.transitionToRoute("/"))
    },

    checkUsername() {
      this.pilasBloquesApi.userExists(this.registerData.username)
        .then(exist => this.set("validUsername", !exist))
    },
  },
})