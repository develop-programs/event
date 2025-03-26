"use client";
import React from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'

export default function Login({ children }: Readonly<{ children?: React.ReactNode }>) {
    return (
        <Button onClick={() => signIn()}>Sign in</Button>
    )
}
