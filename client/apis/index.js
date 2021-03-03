import request from 'superagent'

const apiBase = '/v1/tasks'

export function getAllTasks () {
  return request
    .get(apiBase)
    .then(response => response.body)
}

export function apiAddTask (task) {
  return request
    .post(apiBase)
    .send(task)
    .then(response => response.body.id)
}

export function apiDeleteTask (id) {
  return request
    .delete(`${apiBase}/${id}`)
    .then(response => response.body)
}

export function apiUpdateTask (id, task) {
  return request
    .patch(`${apiBase}/${id}`)
    .send(task)
    .then(response => response.body)
}
