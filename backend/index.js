// /backend/index.js - COMPLETE REVISED CODE (Consolidated & Error-Corrected)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// CORRECTED: The package name is '@google/generative-ai' (with a slash, not a hyphen)
import { GoogleGenerativeAI } from '@google/generative-ai';
import AWS from 'aws-sdk';
import uploadPhotoRoute from './routes/upload-profile-photo.js';
import userProfileRoute from './routes/user-profile-photo.js';
// This route handles a simpler weekly plan if used separately, but main logic is in /api/generate-diet-plan
import weeklyDietPlanRoute from './routes/generate-diet-plan.js'; 

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration to allow requests from specific origins
app.use(cors({
  origin: [
    'http://localhost:3000', // For local development of your frontend
    'https://1f55d0c7-3f22-4e9a-b0da-85af774011b6.preview.emergentagent.com', // Specific emergent agent preview URL
    /\.preview\.emergentagent\.com$/ // Regex to allow all subdomains of emergentagent.com
  ],
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'], // Allowed request headers
  optionsSuccessStatus: 200 // For pre-flight requests
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Register API routes
app.use('/api', uploadPhotoRoute);
app.use('/api', userProfileRoute);
app.use('/api', weeklyDietPlanRoute);

// Debug middleware to log all incoming requests (useful for development)
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('📝 Origin:', req.get('Origin'));
  console.log('📝 Headers:', req.headers);
  next(); // Pass control to the next middleware/route handler
});

// Setup Google Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Using 'gemini-1.5-flash' for faster responses
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Setup AWS SDK for DynamoDB
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1', // Default to 'us-east-1' if not specified
});
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * Calculates estimated daily nutrition targets (BMR, TDEE, Calories, Macros)
 * based on user's profile and fitness goal using the Mifflin-St Jeor Equation.
 * @param {number} age - User's age in years.
 * @param {number} weight - User's weight in kg.
 * @param {number} height - User's height in cm.
 * @param {string} activityLevel - User's activity level ('sedentary', 'light', 'moderate', 'active', 'very_active').
 * @param {string} goal - User's fitness goal ('fat loss', 'muscle gain', 'maintenance').
 * @returns {object} An object containing calculated nutrition metrics.
 */
const calculateNutrition = (age, weight, height, activityLevel, goal) => {
  // Mifflin-St Jeor Equation for BMR (assuming general formula as gender is not provided)
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5; 

  // Activity Level Multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  // Calculate Total Daily Energy Expenditure (TDEE)
  const tdee = bmr * (activityMultipliers[activityLevel] || 1.55); // Default to moderate if invalid

  let calories;
  switch (goal) {
    case 'fat loss':
      calories = Math.round(tdee - 500); // 500 kcal deficit for roughly 0.5-1kg/week fat loss
      break;
    case 'muscle gain':
      calories = Math.round(tdee + 300); // 300 kcal surplus for muscle gain
      break;
    case 'maintenance':
      calories = Math.round(tdee);
      break;
    default:
      calories = Math.round(tdee); // Default to maintenance
  }

  // Macronutrient breakdown (example percentages, can be adjusted based on common guidelines)
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calories,
    protein: Math.round(weight * 2.2), // ~2.2g protein per kg body weight for active individuals/muscle gain
    carbs: Math.round(calories * 0.45 / 4), // 4 calories per gram of carbohydrate (45% of total calories)
    fats: Math.round(calories * 0.25 / 9)   // 9 calories per gram of fat (25% of total calories)
  };
};

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// POST: Endpoint to generate and save an advanced diet plan
app.post('/api/generate-diet-plan', async (req, res) => {
  const {
    email,
    age,
    weight,
    height,
    activityLevel,
    goal,
    dietaryRestrictions = [], // Default to empty array if not provided
    healthConditions = [],
    foodPreferences = [],
    mealCount = 6, // Default to 6 meals if not provided
    cuisinePreference = 'mixed'
  } = req.body;

  // Basic input validation
  if (!email || !age || !weight || !height || !activityLevel || !goal) {
    return res.status(400).json({ success: false, message: 'Missing required fields for diet plan generation.' });
  }

  try {
    console.log('🔄 Initiating advanced diet plan generation for:', email);

    // Calculate the user's estimated daily nutrition needs
    const nutrition = calculateNutrition(age, weight, height, activityLevel, goal);

    // --- STEP 1: Generate the overall plan structure (meta-information) ---
    // This prompt asks Gemini for general insights, targets, hydration, etc.,
    // but explicitly tells it to leave the detailed weeklyPlan empty for now.
    const basePrompt = `
      You are Dr. Sarah Chen, a world-renowned nutritionist and sports scientist with 15+ years of experience. You specialize in creating personalized, science-based nutrition plans that deliver real results.

      CLIENT PROFILE:
      - Age: ${age} years
      - Weight: ${weight} kg
      - Height: ${height} cm
      - Activity Level: ${activityLevel}
      - Primary Goal: ${goal}
      - Dietary Restrictions: ${dietaryRestrictions.join(', ') || 'None'}
      - Health Conditions: ${healthConditions.join(', ') || 'None'}
      - Food Preferences: ${foodPreferences.join(', ') || 'None'}
      - Preferred Cuisine: ${cuisinePreference}
      - Meal Frequency: ${mealCount} meals/day

      CALCULATED NUTRITION TARGETS:
      - BMR: ${nutrition.bmr} kcal
      - TDEE: ${nutrition.tdee} kcal
      - Target Calories: ${nutrition.calories} kcal
      - Protein: ${nutrition.protein}g
      - Carbohydrates: ${nutrition.carbs}g
      - Fats: ${nutrition.fats}g

      TASK: Create an advanced, personalized nutrition plan structure.
      Do NOT include the detailed daily meal plans in this response; provide an empty object for "weeklyPlan".
      Focus on providing accurate and comprehensive information for all other sections.

      FORMAT (Return strictly valid JSON):

      {
        "personalizedInsights": {
          "metabolicType": "string",
          "keyRecommendations": ["string"],
          "expectedResults": "string",
          "timelineToResults": "string"
        },
        "nutritionTargets": {
          "calories": ${nutrition.calories},
          "protein": "${nutrition.protein}g",
          "carbs": "${nutrition.carbs}g",
          "fats": "${nutrition.fats}g",
          "fiber": "string",
          "sugar": "string"
        },
        "weeklyPlan": {}, // This will be populated in subsequent calls
        "hydrationPlan": {
          "dailyWaterIntake": "string",
          "timing": ["morning: amount", "afternoon: amount"],
          "additionalFluids": ["green tea", "coconut water"]
        },
        "supplementation": {
          "recommended": ["supplement 1", "supplement 2"],
          "timing": "when to take",
          "benefits": "why needed"
        },
        "mealPrep": {
          "sunday": ["prep task 1", "prep task 2"],
          "wednesday": ["mid-week prep tasks"]
        },
        "shoppingList": {
          "proteins": ["item: quantity"],
          "vegetables": ["item: quantity"],
          "fruits": ["item: quantity"],
          "grains": ["item: quantity"],
          "dairy": ["item: quantity"],
          "others": ["item: quantity"]
        },
        "exerciseNutrition": {
          "preWorkout": {
            "meal": "what to eat",
            "timing": "when to eat",
            "benefits": "why"
          },
          "postWorkout": {
            "meal": "what to eat",
            "timing": "when to eat",
            "benefits": "why"
          }
        },
        "healthTips": [
          "Advanced tip 1 with scientific backing",
          "Advanced tip 2 with practical application",
          "Advanced tip 3 with long-term benefits"
        ],
        "progressTracking": {
          "dailyChecks": ["energy levels", "hunger patterns"],
          "weeklyMeasurements": ["weight", "body fat %"],
          "monthlyGoals": ["specific targets"]
        }
      }

      CRITICAL REQUIREMENTS:
      - Ensure all macros add up correctly based on targets.
      - Return ONLY valid JSON (no markdown, no explanations outside of the JSON).
    `;

    const chatBase = model.startChat({
      history: [],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    });

    const baseResult = await chatBase.sendMessage(basePrompt);
    const baseText = baseResult.response.text();

    console.log('\n💬 Gemini raw base response length:', baseText.length);

    let plan;
    try {
      // Robust JSON extraction from the raw text (handles markdown fences)
      const jsonMatches = baseText.match(/```json\s*([\s\S]*?)```/) ||
                          baseText.match(/```\s*([\s\S]*?)```/) ||
                          baseText.match(/\{[\s\S]*\}/); // Fallback to find any JSON object

      let jsonPart = jsonMatches ? (jsonMatches[1] || jsonMatches[0]) : baseText;
      jsonPart = jsonPart.trim();
      
      // Basic JSON cleaning for the base plan (can be less aggressive as it's simpler)
      jsonPart = jsonPart.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|(?<=[^:])\/\/.*\n/g, ''); // Remove comments
      jsonPart = jsonPart.replace(/'([^']+)'\s*:/g, '"$1":'); // Replace single-quoted keys with double-quoted
      jsonPart = jsonPart.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":'); // Quote unquoted keys
      jsonPart = jsonPart.replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas
      jsonPart = jsonPart.replace(/: True/g, ': true').replace(/: False/g, ': false'); // Correct boolean casing

      plan = JSON.parse(jsonPart);

      // Ensure weeklyPlan property is an empty object if not already
      if (!plan.weeklyPlan || typeof plan.weeklyPlan !== 'object') {
        plan.weeklyPlan = {};
      }

      console.log('✅ Successfully parsed base diet plan structure');

    } catch (err) {
      console.error('❌ Failed to parse Gemini base JSON for overall plan:', err);
      console.error('Raw base response sample:', baseText.substring(0, 500));
      // Provide a fallback base plan structure in case of parsing failure
      plan = {
        personalizedInsights: {
          metabolicType: "Balanced",
          keyRecommendations: ["Focus on whole foods", "Stay hydrated", "Regular meal timing"],
          expectedResults: `Based on your ${goal} goal, expect gradual progress over 4-6 weeks`,
          timelineToResults: "4-6 weeks"
        },
        nutritionTargets: {
          calories: nutrition.calories,
          protein: `${nutrition.protein}g`,
          carbs: `${nutrition.carbs}g`,
          fats: `${nutrition.fats}g`,
          fiber: "N/A", sugar: "N/A"
        },
        weeklyPlan: {}, // Still empty, will be filled in the next step
        hydrationPlan: {}, supplementation: {}, mealPrep: {}, shoppingList: {},
        exerciseNutrition: {}, healthTips: [], progressTracking: {}
      };
    }

    // --- STEP 2: Generate detailed meal plan for each day individually ---
    // This approach makes each Gemini call smaller and more manageable, reducing parsing errors.
    const weeklyPlanGenerated = {};
    for (const day of days) {
      const dayPrompt = `
        You are a certified nutritionist. Create a personalized meal plan for ONE DAY (${day}) based on:
        - Age: ${age}, Weight: ${weight} kg, Height: ${height} cm
        - Activity Level: ${activityLevel}
        - Goal: ${goal}
        - Dietary Restrictions: ${dietaryRestrictions.join(', ') || 'None'}
        - Health Conditions: ${healthConditions.join(', ') || 'None'}
        - Food Preferences: ${foodPreferences.join(', ') || 'None'}
        - Cuisine Preference: ${cuisinePreference}
        - Meals per day: ${mealCount}
        - Target Calories for this day: ${Math.round(nutrition.calories / 7)} (approximate for the day, distribute across meals)
        - Target Protein: ${Math.round(nutrition.protein / 7)}g
        - Target Carbs: ${Math.round(nutrition.carbs / 7)}g
        - Target Fats: ${Math.round(nutrition.fats / 7)}g

        For each meal, include the following fields:
        - "meal" (e.g., "Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner", "Snack 3")
        - "time" (e.g., "8:00 AM")
        - "name" (meal name, e.g., "Oats with Fruits")
        - "description" (detailed description with cooking method)
        - "ingredients" (JSON array of main ingredients)
        - "portions" (e.g., "1 cup cooked oats, 1/2 cup berries")
        - "macros" (JSON object with "calories", "protein", "carbs", "fats" for THIS specific meal. IMPORTANT: Ensure protein, carbs, fats values are strings, e.g., "15g")
        - "recipeLink" (REAL, working YouTube recipe link from popular cooking channels, or null if none)
        - "cookingTime" (e.g., "15 minutes")
        - "difficulty" (integer from 1-5 scale, 1=easy, 5=hard)
        - "nutritionalBenefits" (JSON array of benefits)
        - "alternatives" (JSON array of alternative meal suggestions)

        Focus on whole foods, minimal processing, and adherence to the user's preferences.
        Return ONLY valid JSON array with the meals for ${day}.
        Example structure (ensure macro values like "15g" are strings):
        [
          {
            "meal": "Breakfast",
            "time": "8:00 AM",
            "name": "Oats with Fruits",
            "description": "Cook oats and top with banana and chia seeds.",
            "ingredients": ["Oats", "Banana", "Chia seeds"],
            "portions": "1 cup cooked oats, 1 medium banana, 1 tbsp chia seeds",
            "macros": {
              "calories": 350,
              "protein": "15g",
              "carbs": "50g",
              "fats": "8g"
            },
            "recipeLink": "https://www.youtube.com/watch?v=example-oats-recipe",
            "cookingTime": "10 minutes",
            "difficulty": 2,
            "nutritionalBenefits": ["Rich in fiber", "High in antioxidants"],
            "alternatives": ["Poha", "Upma"]
          }
        ]
      `;

      const chatDay = model.startChat({
        history: [],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      });

      let dayRawText = ''; // Declare dayRawText here to ensure scope for catch block
      try {
        const dayResult = await chatDay.sendMessage(dayPrompt);
        dayRawText = dayResult.response.text(); // Assign value from Gemini response
        console.log(`💬 Gemini raw response for ${day} length:`, dayRawText.length);

        // Robust JSON extraction for daily plan (prioritize markdown fences, then direct array)
        const dayJsonMatches = dayRawText.match(/```json\s*([\s\S]*?)```/) ||
                               dayRawText.match(/```\s*([\s\S]*?)```/) ||
                               dayRawText.match(/\[[\s\S]*\]/); // Look for an array directly

        let dayJsonPart = dayJsonMatches ? (dayJsonMatches[1] || dayJsonMatches[0]) : dayRawText;
        dayJsonPart = dayJsonPart.trim();

        // --- Extensive JSON Cleaning Heuristics for Daily Plans ---
        // 1. Remove comments (both single-line and multi-line, in case model outputs them)
        dayJsonPart = dayJsonPart.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|(?<=[^:])\/\/.*\n/g, '');
        // 2. Replace single-quoted keys with double-quoted keys
        dayJsonPart = dayJsonPart.replace(/'([^']+)'\s*:/g, '"$1":');
        // 3. Replace unquoted keys (alphanumeric, underscore) with double-quoted keys
        dayJsonPart = dayJsonPart.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');
        // 4. Ensure boolean values are lowercase (true/false, not True/False)
        dayJsonPart = dayJsonPart.replace(/: True/g, ': true').replace(/: False/g, ': false');
        // 5. Remove potential trailing commas (not allowed in strict JSON before a closing bracket/brace)
        dayJsonPart = dayJsonPart.replace(/,\s*([}\]])/g, '$1');

        // *** CRITICAL FIX: Ensure macro values (e.g., "2g", "0.5g") are quoted as strings ***
        // This targets 'calories', 'protein', 'carbs', 'fats' values and ensures they are wrapped in quotes.
        // It accounts for numbers, decimals, and optional units (g, kcal).
        dayJsonPart = dayJsonPart.replace(
            /("(?:calories|protein|carbs|fats)":\s*)(\d+(\.\d+)?\s*(?:g|kcal)?)/g,
            '$1"$2"'
        );

        // 6. Ensure other non-quoted simple string values are enclosed in double quotes.
        // This regex attempts to catch unquoted words/phrases that are not numbers, booleans, or null.
        // It's applied AFTER more specific rules to avoid conflicts.
        dayJsonPart = dayJsonPart.replace(/: ([^",\s\{\}\[\]]+)(?=[,}\]])/g, ': "$1"'); // simple unquoted words
        dayJsonPart = dayJsonPart.replace(/: '([^']+)'/g, ': "$1"'); // Single-quoted values that should be double-quoted

        // 7. Handle escaped characters within strings (e.g., if model outputs ' instead of \')
        dayJsonPart = dayJsonPart.replace(/\\'/g, "'"); // Unescape single quotes
        dayJsonPart = dayJsonPart.replace(/\\"/g, '"'); // Unescape double quotes

        // 8. Remove any non-standard JSON characters or invisible Unicode characters that might cause errors
        dayJsonPart = dayJsonPart.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Control characters
        dayJsonPart = dayJsonPart.replace(/[\u200B-\u200D\uFEFF]/g, ''); // Zero-width spaces, byte order mark, etc.
        dayJsonPart = dayJsonPart.replace(/[\u00A0]/g, ' '); // Non-breaking space

        // 9. Final check to ensure the top-level structure is a JSON array
        if (!dayJsonPart.startsWith('[') || !dayJsonPart.endsWith(']')) {
             const firstBracket = dayJsonPart.indexOf('[');
             const lastBracket = dayJsonPart.lastIndexOf(']');
             if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
                 dayJsonPart = dayJsonPart.substring(firstBracket, lastBracket + 1);
             } else {
                 // As a last resort, if it looks like a single JSON object but should be an array of objects
                 if (dayJsonPart.startsWith('{') && dayJsonPart.endsWith('}')) {
                     dayJsonPart = `[${dayJsonPart}]`;
                 } else {
                     // If all attempts fail, throw a specific error for debugging
                     throw new Error(`Failed to extract or form valid JSON array for ${day}. Processed part: ${dayJsonPart.substring(0, 200)}`);
                 }
             }
        }

        // Attempt to parse the cleaned JSON part
        weeklyPlanGenerated[day] = JSON.parse(dayJsonPart);
        console.log(`✅ Successfully generated and parsed plan for ${day}`);

      } catch (dayErr) {
        console.error(`❌ Error generating or parsing plan for ${day}:`, dayErr);
        console.error(`Raw response for ${day} (full):`, dayRawText); // ALWAYS log full raw text for debugging
        weeklyPlanGenerated[day] = []; // Assign an empty array for the day if parsing fails, to prevent app crash
      }
    }

    // Assign the generated detailed weekly plan to the main plan object
    plan.weeklyPlan = weeklyPlanGenerated;

    // Add client-specific information and a unique plan ID
    plan.clientInfo = {
      email,
      age,
      weight,
      height,
      activityLevel,
      goal,
      generatedAt: new Date().toISOString(), // Timestamp of plan generation
      planId: `diet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` // Unique ID for this plan
    };

    console.log('✅ Full advanced diet plan assembled');
    // Log the keys to confirm all days were processed (even if some failed to parse)
    console.log('Final weekly plan keys:', Object.keys(plan.weeklyPlan || {}));


    // Save the complete plan to DynamoDB
    const timestamp = new Date().toISOString();
    await dynamoDB.put({
      TableName: 'DietPlans', // Make sure you have a DynamoDB table named 'DietPlans'
      Item: {
        email, // Partition key
        createdAt: timestamp, // Sort key (or just another attribute)
        plan,  // The entire generated plan object
      },
    }).promise();

    console.log('✅ Diet plan saved to DynamoDB');

    // Send the generated plan back to the frontend
    return res.status(200).json({
      success: true,
      plan,
      calculatedNutrition: nutrition, // Include calculated details for frontend display
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('❌ Top-level error generating advanced diet plan:', err);
    // Return a 500 error if any major issue occurs during the process
    return res.status(500).json({
      success: false,
      message: 'Failed to generate advanced diet plan due to an internal server error. Please try again.',
      error: err.message
    });
  }
});

// GET: Endpoint to fetch diet plan history for a specific user email
app.get('/api/diet-history/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Query DynamoDB for all plans associated with the provided email
    const result = await dynamoDB.query({
      TableName: 'DietPlans',
      KeyConditionExpression: 'email = :e',
      ExpressionAttributeValues: {
        ':e': email
      },
      ScanIndexForward: false // Retrieve most recent plans first
    }).promise();

    res.status(200).json({ success: true, history: result.Items });
  } catch (err) {
    console.error('❌ Error fetching diet plan history:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch diet plan history.' });
  }
});

// POST: Endpoint for general nutrition analysis (e.g., for a BMI calculator or quick macro check)
app.post('/api/analyze-nutrition', async (req, res) => {
  const { age, weight, height, activityLevel, goal } = req.body;

  // Basic validation
  if (!age || !weight || !height || !activityLevel || !goal) {
    return res.status(400).json({ success: false, message: 'Missing required fields for nutrition analysis.' });
  }

  try {
    const nutrition = calculateNutrition(age, weight, height, activityLevel, goal);
    const analysis = {
      ...nutrition,
      // Calculate BMI
      bmi: (weight / Math.pow(height / 100, 2)).toFixed(1),
      recommendations: [], // Placeholder for future custom recommendations
      metabolicAge: age // Simplified metabolic age calculation
    };

    // Add BMI category for better interpretation
    if (analysis.bmi < 18.5) analysis.bmiCategory = 'Underweight';
    else if (analysis.bmi < 25) analysis.bmiCategory = 'Normal Weight';
    else if (analysis.bmi < 30) analysis.bmiCategory = 'Overweight';
    else analysis.bmiCategory = 'Obese';

    res.json({ success: true, analysis });
  } catch (error) {
    console.error('❌ Error during nutrition analysis:', error);
    res.status(500).json({ success: false, message: 'Nutrition analysis failed.' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Advanced Diet Plan Server running on http://localhost:${PORT}`);
  // Check if Gemini API key is configured
  console.log(`🔑 Gemini API Key configured: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
  // Check if AWS credentials are set (not comprehensive, but a quick check)
  console.log(`☁️ AWS Credentials configured: ${process.env.AWS_ACCESS_KEY_ID ? 'Yes' : 'No'}`);
});