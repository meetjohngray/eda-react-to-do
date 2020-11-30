const environments = {
  development: 'http://localhost:3000/api/vi',
  test: '',
  production: '',
  integration: '',
  deployment: '',
  build: ''
}

const env = process.env.NODE_ENV || 'development'

export const baseApiUrl = environments[env]