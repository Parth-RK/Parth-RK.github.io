// Filename: testApi.js

// To run this, you need to install 'node-fetch'
// Open your terminal and run: npm install node-fetch@2
// We use version 2 because it works easily with the `require` syntax.
const fetch = require('node-fetch');

// --- Configuration ---
// Paste the LATEST 'exec' URL from your Google Apps Script deployment here.
const SCRIPT_URL = process.env.REACT_APP_CONTACT_FORM_API;

// Demo data, just like your React component would send.
const DEMO_DATA = {
  name: 'Node.js Test',
  email: 'test@example.com',
  message: `This is a test submission from a Node.js script. Sent at: ${new Date().toISOString()}`
};

// --- Test Function ---
async function testEndpoint() {
  console.log('--- Starting API Test ---');
  console.log('URL:', SCRIPT_URL);
  console.log('Sending this data:', JSON.stringify(DEMO_DATA, null, 2));

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(DEMO_DATA),
      redirect: 'follow',
    });

    console.log('\n--- Received Response ---');
    console.log(`Status Code: ${response.status} ${response.statusText}`);
    
    console.log('\nResponse Headers:');
    response.headers.forEach((value, name) => {
        console.log(`  ${name}: ${value}`);
    });

    const responseBody = await response.text();
    console.log('\nResponse Body:');
    console.log(responseBody);

    // --- Analysis ---
    console.log('\n--- Test Result Analysis ---');
    if (response.status === 200 && response.headers.get('content-type')?.includes('application/json')) {
        console.log('✅ SUCCESS! The API responded correctly with JSON.');
        console.log('Check your Google Sheet and your email (katkeparth@gmail.com) to confirm the data was received.');
    } else if (response.status === 302) {
        console.log('❌ FAILED! The API responded with a 302 Redirect.');
        console.log('This is the most common failure mode. It means your Apps Script deployment is incorrect (likely "Who has access" is not set to "Anyone").');
        console.log('The script tried to redirect to a Google login or error page, which causes a CORS error in a real browser.');
    } else {
        console.log('❌ FAILED! The API responded with an unexpected status or content type.');
        console.log('The response body above contains an HTML error page from Google. This confirms the issue is with the script deployment or permissions.');
    }

  } catch (error) {
    console.error('\n--- SCRIPT ERROR ---');
    console.error('An error occurred during the fetch request itself:', error);
    console.error('This is likely a network issue, not a problem with the Google Script.');
  }
}

// Run the test
testEndpoint();