// src/api/backendApi.js

// Simulate a database of users and their diet plans
const mockUsers = {
  "test@example.com": {
    userId: "user_test_123",
    email: "test@example.com",
    password: "password123", // In a real app, never store plain passwords
    dietPlans: [], // Array to store multiple diet plans
  },
};

let nextUserId = 1000; // For new sign-ups

// Helper to generate a unique plan ID
const generatePlanId = () => `plan_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

// Helper to generate a mock diet plan based on some user info (for demonstration)
const createMockDietPlan = (userId, preferences = {}) => {
  const baseCalories = preferences.calories || Math.floor(Math.random() * (2500 - 1800 + 1)) + 1800; // 1800-2500
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const time = new Date().toLocaleTimeString('en-US');

  return {
    id: generatePlanId(),
    userId: userId,
    date: date,
    generatedAt: `${date} ${time}`,
    calories: baseCalories,
    macronutrients: {
      protein: `${Math.round(baseCalories * 0.30 / 4)}g`, // 30% protein
      carbs: `${Math.round(baseCalories * 0.40 / 4)}g`,   // 40% carbs
      fats: `${Math.round(baseCalories * 0.30 / 9)}g`,     // 30% fats
    },
    notes: `This plan is a dynamic recommendation based on your last input and current goals. Keep hydrating!`,
    meals: [
      { time: "7:00 AM", item: "Breakfast", description: "Oatmeal with berries and nuts, protein shake." },
      { time: "10:00 AM", item: "Morning Snack", description: "Apple slices with almond butter." },
      { time: "1:00 PM", item: "Lunch", description: "Grilled chicken salad with mixed greens and vinaigrette." },
      { time: "4:00 PM", item: "Afternoon Snack", description: "Greek yogurt with a sprinkle of seeds." },
      { time: "7:00 PM", item: "Dinner", description: "Baked salmon with quinoa and steamed asparagus." },
    ],
  };
};

/**
 * Mocks user sign-up.
 * @param {object} userData - User registration data (email, password, fitness goals, etc.).
 * @returns {Promise<object>} - A promise resolving to { success: boolean, user?: object, message?: string }.
 */
export const signUp = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mockUsers[userData.email]) {
        resolve({ success: false, message: "User with this email already exists." });
      } else {
        const newUser = {
          userId: `user_${nextUserId++}`,
          email: userData.email,
          password: userData.password,
          ...userData, // Store all user data from signup form
          dietPlans: [],
        };
        // Generate an initial diet plan upon sign-up
        const initialPlan = createMockDietPlan(newUser.userId, {
          calories: 2000, // Example: base calories off user input from sign-up form later
          goals: userData.fitnessGoals,
        });
        newUser.dietPlans.push(initialPlan); // Add the initial plan
        mockUsers[userData.email] = newUser;
        console.log("Mock User Database:", mockUsers);
        resolve({ success: true, user: newUser, message: "Sign up successful." });
      }
    }, 1000);
  });
};

/**
 * Mocks user sign-in.
 * @param {object} credentials - User sign-in credentials (email, password).
 * @returns {Promise<object>} - A promise resolving to { success: boolean, user?: object, message?: string }.
 */
export const signIn = async (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers[credentials.email];
      // Hardcoded check for 'test@example.com' for simplicity
      if (user && user.password === credentials.password) {
        resolve({ success: true, user: user, message: "Sign in successful." });
      } else {
        resolve({ success: false, message: "Invalid credentials." });
      }
    }, 1000);
  });
};

/**
 * Mocks fetching a user's *current* diet plan.
 * This will now fetch the latest plan.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} - A promise resolving to { success: boolean, plan?: object, message?: string }.
 */
export const getDietPlan = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userEmail = Object.keys(mockUsers).find(
        (email) => mockUsers[email].userId === userId
      );
      const user = mockUsers[userEmail];
      if (user && user.dietPlans.length > 0) {
        // Return the latest plan
        const latestPlan = user.dietPlans[user.dietPlans.length - 1];
        resolve({ success: true, plan: latestPlan });
      } else if (user) {
        resolve({ success: false, message: "No diet plans found for this user." });
      }
      else {
        resolve({ success: false, message: "User not found." });
      }
    }, 500);
  });
};

/**
 * Mocks generating a new diet plan for a user.
 * @param {string} userId - The ID of the user.
 * @param {object} [preferences] - Optional preferences for the new plan.
 * @returns {Promise<object>} - A promise resolving to { success: boolean, plan?: object, message?: string }.
 */
export const generateNewDietPlan = async (userId, preferences = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userEmail = Object.keys(mockUsers).find(
        (email) => mockUsers[email].userId === userId
      );
      const user = mockUsers[userEmail];
      if (user) {
        const newPlan = createMockDietPlan(userId, preferences);
        user.dietPlans.push(newPlan); // Add to the user's plans
        resolve({ success: true, plan: newPlan, message: "New diet plan generated." });
      } else {
        resolve({ success: false, message: "User not found." });
      }
    }, 1500); // Simulate some processing time
  });
};

/**
 * Mocks fetching all previously generated diet plans for a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} - A promise resolving to { success: boolean, plans?: Array<object>, message?: string }.
 */
export const getDietPlanHistory = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userEmail = Object.keys(mockUsers).find(
        (email) => mockUsers[email].userId === userId
      );
      const user = mockUsers[userEmail];
      if (user) {
        // Return plans in reverse chronological order (latest first)
        const sortedPlans = [...user.dietPlans].reverse();
        resolve({ success: true, plans: sortedPlans });
      } else {
        resolve({ success: false, message: "User not found or no plans available." });
      }
    }, 700);
  });
};

// You can uncomment this to add a default user for testing without signing up every time
/*
// Ensure the test user has an initial plan when the app starts
if (mockUsers["test@example.com"].dietPlans.length === 0) {
  mockUsers["test@example.com"].dietPlans.push(createMockDietPlan("user_test_123"));
}
*/