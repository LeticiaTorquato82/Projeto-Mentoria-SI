import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 5,
  duration: '15s',
};

const BASE = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // List tasks
  const res1 = http.get(`${BASE}/api/tasks`);
  check(res1, {
    'list status 200': (r) => r.status === 200,
  });

  // Create task
  const payload = JSON.stringify({ title: 'load test', description: 'k6 load', status: 'pending' });
  const params = { headers: { 'Content-Type': 'application/json' } };
  const res2 = http.post(`${BASE}/api/tasks`, payload, params);
  check(res2, {
    'create status 201': (r) => r.status === 201 || r.status === 409,
  });

  sleep(1);
}
