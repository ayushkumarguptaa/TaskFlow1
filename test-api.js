const http = require('http');

function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Cookie'] = `token=${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: parsed
          });
        } catch (e) {
          resolve({ status: res.statusCode, body, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function test() {
  try {
    const testEmail = 'test' + Date.now() + '@example.com';
    const testPassword = 'TestPassword123';
    
    // Step 1: Register a new user
    console.log('\n=== Step 1: Register New User ===');
    const registerRes = await makeRequest('POST', '/user/auth/register', {
      email: testEmail,
      password: testPassword
    });
    console.log('Status:', registerRes.status);
    console.log('Response:', registerRes.body);
    
    // Extract token from Set-Cookie header
    const setCookieHeader = registerRes.headers['set-cookie'];
    let token = null;
    if (setCookieHeader && Array.isArray(setCookieHeader)) {
      const tokenCookie = setCookieHeader.find(c => c.startsWith('token='));
      if (tokenCookie) {
        token = tokenCookie.split(';')[0].replace('token=', '');
      }
    }
    
    console.log('Token received:', !!token);
    
    if (token) {
      // Step 2: Create a board
      console.log('\n=== Step 2: Create Board ===');
      const boardRes = await makeRequest('POST', '/user/boards', {
        title: 'API Test Board ' + Date.now(),
        description: 'Testing board creation via API'
      }, token);
      console.log('Status:', boardRes.status);
      console.log('Board:', boardRes.body);
      
      if (boardRes.body && boardRes.body._id) {
        const boardId = boardRes.body._id;
        
        // Step 3: Create a task
        console.log('\n=== Step 3: Create Task ===');
        const taskRes = await makeRequest('POST', '/user/tasks', {
          title: 'API Test Task',
          description: 'Testing task creation via API',
          priority: 'high',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          board: boardId,
          status: 'todo'
        }, token);
        console.log('Status:', taskRes.status);
        console.log('Task:', taskRes.body);
        
        // Step 4: Get AI estimate
        console.log('\n=== Step 4: AI Estimate ===');
        const aiRes = await makeRequest('POST', '/user/ai/estimate', {
          title: 'Build Real-time Chat Application',
          description: 'Create a real-time chat application with WebSocket support, user authentication, message history, and notifications'
        }, token);
        console.log('Status:', aiRes.status);
        console.log('AI Response:', aiRes.body);
      } else {
        console.log('Failed to create board');
      }
    } else {
      console.log('Failed to get token from registration');
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
