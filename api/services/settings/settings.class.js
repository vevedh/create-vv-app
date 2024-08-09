// This is a skeleton for a custom service class. Remove or add the methods you need here
import fs from 'node:fs/promises'

export class SettingsService {
  constructor(options) {
    this.options = options
  }

  async find(_params) {
    const settings = await fs.readFile('./public/settings.json', 'utf8')
    const parsedData = JSON.parse(settings);
    return parsedData
  }

  async get(id, _params) {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }
  async create(data, params) {
    /*if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }*/
    fs.writeFile('./public/settings.json', JSON.stringify(data), (err) => {
      if (err) throw err
      console.log('Fichier settings crée avec succès !')
    })

    return {
      ...data
    }
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id, data, _params) {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id, data, _params) {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id, _params) {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = (app) => {
  return { app }
}
