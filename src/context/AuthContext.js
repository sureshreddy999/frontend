import React, { createContext, useState, useEffect } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import userPool from '../aws-config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = userPool.getCurrentUser();

    if (!currentUser) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    currentUser.getSession(async (err, session) => {
      if (err || !session.isValid()) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      currentUser.getUserAttributes(async (err, attributes) => {
        if (err) {
          console.error("Failed to get user attributes", err);
          setUser({ email: currentUser.getUsername() });
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        const attrMap = {};
        attributes.forEach(attr => {
          attrMap[attr.getName()] = attr.getValue();
        });

        const email = attrMap.email;
        let profilePhotoUrl = null;
        let firstName = '';
        let lastName = '';
        let createdAt = null;

        try {
          const response = await fetch(`http://localhost:5001/api/user-profile-photo/${email}`);
          const data = await response.json();
          profilePhotoUrl = data.photoUrl || null;
          firstName = data.firstName || '';
          lastName = data.lastName || '';
          createdAt = data.createdAt || null;
        } catch (error) {
          console.error('❌ Failed to load profile data from backend:', error);
        }

        // Fallback to Cognito values if backend values are missing
        if (!firstName) firstName = attrMap.given_name || '';
        if (!lastName) lastName = attrMap.family_name || '';

        setUser({
          email,
          givenName: firstName,
          familyName: lastName,
          name: `${firstName} ${lastName}`.trim(),
          profilePhotoUrl,
          createdAt: createdAt || attrMap.updated_at || null
        });

        setIsAuthenticated(true);
        setIsLoading(false);
      });
    });
  }, []);

  const signOut = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) currentUser.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
