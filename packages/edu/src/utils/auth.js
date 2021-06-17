import Cookies from 'js-cookie'

const TokenKey = 'token'
const RaceNameKey = 'testRaceName'
const RaceConfigKey = 'testRaceConfig'
const NavStatusKey = "testNavStatus"

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setRaceConfig (config) {
  return Cookies.set(RaceConfigKey, config)
}

export function getRaceConfig () {
  return Cookies.get(RaceConfigKey)
}

export function removeRaceConfig () {
  return Cookies.remove(RaceConfigKey)
}

export function setNavStatus (data) {
  return Cookies.set(NavStatusKey, data)
}

export function getNavStatus () {
  return Cookies.get(NavStatusKey)
}

export function removeNavStatus () {
  return Cookies.remove(NavStatusKey)
}
