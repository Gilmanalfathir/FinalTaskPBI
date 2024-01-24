import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1
}; // define virtual user = 1 (tidak harus ada)

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