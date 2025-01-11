'use client';

import client from '@/grapql/apolloclient'
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { AuthProvider } from "../context/AuthContext";


const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ApolloProvider client={client}>
       <AuthProvider>
      {children} 
      </AuthProvider>
      </ApolloProvider>
  )
}

export default Layout