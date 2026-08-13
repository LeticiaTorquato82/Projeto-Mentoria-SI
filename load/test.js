import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 5 },
    { duration: '30s', target: 10 },
    { duration: '15s', target: 0 }
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<500'],
    checks: ['rate>0.95']
  }
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

function listTasks() {
  const res = http.get(`${BASE_URL}/api/tasks`);
  check(res, {
    'GET /api/tasks status is 200': (r) => r.status === 200
  });
  return res;
}

function createTask() {
  const payload = JSON.stringify({
    title: `task-${Date.now()}`,
    description: 'k6 performance validation',
    status: 'pending'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const res = http.post(`${BASE_URL}/api/tasks`, payload, params);
  check(res, {
    'POST /api/tasks status is 201': (r) => r.status === 201
  });

  return res;
}

export default function () {
  listTasks();
  createTask();
  sleep(1);
}
