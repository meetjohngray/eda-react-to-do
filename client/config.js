const environments = {
  development: 'http://localhost:3000/api/v1',
  test: '',
  production: '',
  integration: '',
  deployment: '',
  build: ''
}

const env = process.env.NODE_ENV || 'development'

export const baseApiUrl = environments[env]