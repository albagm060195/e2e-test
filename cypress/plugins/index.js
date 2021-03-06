const AccountDb = require('../fixtures/account/database/account.db')
const QuestDb = require('../fixtures/quest/database/quests.db')

const accountDBConnect = () => {
  return new Promise((resolve) => {
    AccountDb.connect().then(resolve(true))
  })
}

const questDBConnect = () => {
  return new Promise((resolve) => {
    QuestDb.connect().then(resolve(true))
  })
}

const accountDBDispose = () => {
  return new Promise(resolve => {
    AccountDb.dispose().then(resolve(true))
  })
}

const questDBDispose = () => {
  return new Promise(resolve => {
    QuestDb.dispose().then(resolve(true))
  })
}

const removeAccountDBCollections = () => {
  return new Promise((resolve) => {
    AccountDb.removeCollections()
      .then(response => resolve(response))
      .catch(error => resolve(error))
  })
}

const removeQuestDBCollections = () => {
  return new Promise((resolve) => {
    QuestDb.removeCollections()
      .then(response => resolve(response))
      .catch(error => resolve(error))
  })
}

const removeAllChildren = () => {
  return new Promise((resolve) => {
    AccountDb.deleteAllChildren()
      .then(response => resolve(response))
      .catch(error => resolve(error))
  })
}

const removeChildrenGroups = () => {
  return new Promise((resolve) => {
    AccountDb.deleteChildrenGroups()
      .then(response => resolve(response))
      .catch(error => resolve(error))
  })
}

module.exports = on => {
  on('task', { accountDBConnect() { return accountDBConnect() } })
  on('task', { questDBConnect() { return questDBConnect() } })

  on('task', { accountDBDispose() { return accountDBDispose() } })
  on('task', { questDBDispose() { return questDBDispose() } })

  on('task', { cleanAccountDB() { return removeAccountDBCollections() } })
  on('task', { cleanQuestDB() { return removeQuestDBCollections() } })

  on('task', { removeAllChildren() { return removeAllChildren() } })
  on('task', { removeChildrenGroups() { return removeChildrenGroups() } })
}