import Service, { inject as service } from '@ember/service'
import config from "../config/environment"

const { baseURL } = config.pbApi
const log = () => { } // console.log

const logger = topic => message => log(topic, message)

export default Service.extend({
  storage: service(),
  paperToaster: service(),
  pilasBloquesAnalytics: service(),
  platform: service(),
  loading: {},
  connected: null,

  // SOLUTIONS
  openChallenge(challengeId) {
    this._send('POST', 'challenges', { challengeId }, false).catch(logger('openChallenge'))
  },

  lastSolution(challengeId) {
    if (!this.getUser()) return null
    return this._send('GET', `challenges/${challengeId}/solution`, undefined, false).catch(() => null)
  },

  runProgram(challengeId, metadata) {
    const solutionId = uuidv4()
    const data = {
      challengeId,
      solutionId,
      ...metadata
    }
    this._send('POST', 'solutions', data, false).catch(logger('runProgram'))

    return solutionId
  },

  executionFinished(solutionId, executionResult) {
    this._send('PUT', `solutions/${solutionId}`, { executionResult }, false).catch(logger('executionFinished'))
  },

  // LOGIN - REGISTER
  async login(credentials) {
    return this._send('POST', 'login', credentials)
      .then(user => this.storage.saveUser(user))
  },

  async register(data) {
    const { username, avatarURL } = data
    const profile = {
      nickName: username,
      avatarURL
    }
    return this._send('POST', 'register', { ...data, profile })
      .then(user => this.storage.saveUser(user))
  },

  async changePassword(newCredentials) {
    return this._send('PUT', 'credentials', newCredentials)
      .then(user => this.storage.saveUser(user))
  },

  async passwordRecovery(username) {
    return this._send('POST', `password-recovery?username=${username}`)
  },

  async userExists(username) {
    return this._send('GET', `users/exists?username=${username}`)
  },

  async newAnswer(data) {
    return this._send('POST', `answers`, data)
      .then(user => this.storage.saveUser(user))
  },

  logout() {
    this.pilasBloquesAnalytics.logout()
    this.storage.saveUser(null)
  },

  async ping() {
    return this._send('GET', 'ping', undefined, false)
  },

  getUser() { return this.storage.getUser() },

  async _send(method, resource, body, critical = true) {
    const user = this.getUser()
    if (body) {
      body.context = this.pilasBloquesAnalytics.context()
      body.timestamp = new Date()
    } //TODO: Move user to Analytics / use id instead of nickname / rename Analytics to session related approach

    const url = `${baseURL}/${resource}`
    const flag = `loading.${resource.split('?')[0].replace('/', '-')}`
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': user ? `Bearer ${user.token}` : null
    }

    this.set(flag, true)

    return this._doFetch(url, {
      method,
      body: JSON.stringify(body),
      headers
    })
      .catch(connectionErr => {
        if (critical) this._alertServerError()
        this.set('connected', false)
        // console.log({ connectionErr })
        throw connectionErr
      })
      .then(res => {
        this.set('connected', true)
        if (res.status >= 400) { return res.text().then(message => { throw { status: res.status, message } }) }
        else { return res.json().catch(() => { /** if not body present */ }) }
      })
      .finally(() => this.set(flag, false))

  },

  _doFetch(url, options) {
    try {
      return fetch(url, options)
    } catch (err) {
      return Promise.reject(err)
    }
  },

  _alertServerError() {
    this.paperToaster.show("Problemas con el servidor, intentar más tarde", {
      duration: 4000,
      position: "top"
    })
  },

  init() {
    this._super.apply(this, arguments)
    if (this.platform.inElectron()) { // Avoiding unnecessary requests when in website
      this.ping() // forces setting of "connected"
    } else {
      this.set('connected', true)
    }
  },
})
