// import {
//   CognitoUser,
//   CognitoUserAttribute,
//   AuthenticationDetails,
// } from 'amazon-cognito-identity-js';
// import userPool from '../aws-config';

// // ✅ Use environment variable for backend URL
// const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

// console.log('🔗 Backend URL:', API_BASE_URL); // Debug log

// // SIGN UP
// export const signUp = ({ firstName, lastName, email, password }) => {
//   const attributeList = [
//     new CognitoUserAttribute({ Name: 'email', Value: email }),
//     new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
//     new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
//   ];

//   return new Promise((resolve, reject) => {
//     userPool.signUp(email, password, attributeList, null, (err, result) => {
//       if (err) return reject({ success: false, message: err.message });
//       resolve({ success: true, user: result.user });
//     });
//   });
// };

// // SIGN IN
// export const signIn = ({ email, password }) => {
//   const user = new CognitoUser({ Username: email, Pool: userPool });
//   const authDetails = new AuthenticationDetails({ Username: email, Password: password });

//   return new Promise((resolve, reject) => {
//     user.authenticateUser(authDetails, {
//       onSuccess: (result) => {
//         const token = result.getIdToken().getJwtToken();
//         resolve({ success: true, user: email, token });
//       },
//       onFailure: (err) => {
//         reject({ success: false, message: err.message });
//       },
//     });
//   });
// };

// // CONFIRM SIGN UP
// export const confirmSignUp = (email, code) => {
//   const user = new CognitoUser({ Username: email, Pool: userPool });

//   return new Promise((resolve, reject) => {
//     user.confirmRegistration(code, true, (err, result) => {
//       if (err) return reject({ success: false, message: err.message });
//       resolve({ success: true, message: result });
//     });
//   });
// };

// // RESEND CONFIRMATION CODE
// export const resendConfirmationCode = (email) => {
//   const user = new CognitoUser({ Username: email, Pool: userPool });

//   return new Promise((resolve, reject) => {
//     user.resendConfirmationCode((err, result) => {
//       if (err) return reject({ success: false, message: err.message });
//       resolve({ success: true, message: result });
//     });
//   });
// };

// // ✅ FIXED: Generate Diet Plan (Updated to work with your existing backend)
// export const generateDietPlan = async (payload) => {
//   try {
//     console.log('🚀 Calling API:', `${API_BASE_URL}/api/generate-diet-plan`);
//     console.log('📤 Payload:', payload);

//     const res = await fetch(`${API_BASE_URL}/api/generate-diet-plan`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     console.log('📥 Response status:', res.status);

//     const data = await res.json();
//     console.log('📥 Response data:', data);

//     if (!res.ok || !data.success) {
//       return { success: false, message: data.message || 'Failed to generate diet plan.' };
//     }

//     return { success: true, plan: data.plan };
//   } catch (err) {
//     console.error('❌ API Error:', err);
//     return { success: false, message: err.message || 'Failed to generate diet plan.' };
//   }
// };

// // ✅ FIXED: Get Diet Plan History (Updated to work with your existing backend)
// export const getDietPlanHistory = async (email) => {
//   try {
//     console.log('🚀 Fetching history for:', email);
    
//     const res = await fetch(`${API_BASE_URL}/api/diet-history/${encodeURIComponent(email)}`, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log('📥 History response status:', res.status);

//     const data = await res.json();
//     console.log('📥 History data:', data);

//     if (!res.ok || !data.success) {
//       return { success: false, message: data.message || 'Failed to fetch history.' };
//     }

//     return { success: true, history: data.history };
//   } catch (err) {
//     console.error('❌ History API Error:', err);
//     return { success: false, message: err.message || 'Failed to fetch history.' };
//   }
// };

import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import userPool from '../aws-config';

// ✅ Use environment variable for backend URL
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

console.log('🔗 Backend URL:', API_BASE_URL); // Debug log

// SIGN UP
export const signUp = ({ firstName, lastName, email, password }) => {
  const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: email }),
    new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
    new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) return reject({ success: false, message: err.message });
      resolve({ success: true, user: result.user });
    });
  });
};

// SIGN IN
export const signIn = ({ email, password }) => {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: email, Password: password });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const token = result.getIdToken().getJwtToken();
        resolve({ success: true, user: email, token });
      },
      onFailure: (err) => {
        reject({ success: false, message: err.message });
      },
    });
  });
};

// CONFIRM SIGN UP
export const confirmSignUp = (email, code) => {
  const user = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err, result) => {
      if (err) return reject({ success: false, message: err.message });
      resolve({ success: true, message: result });
    });
  });
};

// RESEND CONFIRMATION CODE
export const resendConfirmationCode = (email) => {
  const user = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    user.resendConfirmationCode((err, result) => {
      if (err) return reject({ success: false, message: err.message });
      resolve({ success: true, message: result });
    });
  });
};

// ✅ FIXED: Generate Diet Plan (Updated to work with your existing backend)
export const generateDietPlan = async (payload) => {
  try {
    console.log('🚀 Calling API:', `${API_BASE_URL}/api/generate-diet-plan`);
    console.log('📤 Payload:', payload);

    const res = await fetch(`${API_BASE_URL}/api/generate-diet-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📥 Response status:', res.status);

    const data = await res.json();
    console.log('📥 Response data:', data);

    if (!res.ok || !data.success) {
      return { success: false, message: data.message || 'Failed to generate diet plan.' };
    }

    return { success: true, plan: data.plan };
  } catch (err) {
    console.error('❌ API Error:', err);
    return { success: false, message: err.message || 'Failed to generate diet plan.' };
  }
};

// ✅ FIXED: Get Diet Plan History (Updated to work with your existing backend)
export const getDietPlanHistory = async (email) => {
  try {
    console.log('🚀 Fetching history for:', email);
    
    const res = await fetch(`${API_BASE_URL}/api/diet-history/${encodeURIComponent(email)}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📥 History response status:', res.status);

    const data = await res.json();
    console.log('📥 History data:', data);

    if (!res.ok || !data.success) {
      return { success: false, message: data.message || 'Failed to fetch history.' };
    }

    return { success: true, history: data.history };
  } catch (err) {
    console.error('❌ History API Error:', err);
    return { success: false, message: err.message || 'Failed to fetch history.' };
  }
};
