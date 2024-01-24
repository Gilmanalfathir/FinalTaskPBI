import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com//benc-uk/k6-reporter/main/dist/bundle.js'; // for create report performance test

export let options = {
  vus: 1000,
  iterations: 3500,
  thresholds: {
    http_req_duration: ['avg < 2000'], // batas max 2s
    http_req_failed: ['rate < 0.1'], // batas max failure rate
  }
}; // define virtual user, iterations, and thresholds

export default function() {
  // API Create
  let createResponse = http.post(
    'https://reqres.in/api/users',
    JSON.stringify({ 
      name: 'morpheus', 
      job: 'leader' 
    }),
    { headers: { 
      'Content-Type': 'application/json' 
    }}
  );
  check(createResponse, { 
    'status is 201': (r) => r.status === 201,
    'create name': (r) => r.json('name') === 'morpheus',
    'create job': (r) => r.json('job') === 'leader' 
  });
  sleep(1);

  // API Update
  let updateResponse = http.put(
    'https://reqres.in/api/users/2',
    JSON.stringify({ 
      name: 'morpheus', 
      job: 'zion resident' 
    }),
    { headers: { 
      'Content-Type': 'application/json' 
    }}
  );
  check(updateResponse, { 
    'status is 200': (r) => r.status === 200,
    'update name': (r) => r.json('name') === 'morpheus',
    'update job': (r) => r.json('job') === 'zion resident' 
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
    "./report.html" : htmlReport(data),
  };
}