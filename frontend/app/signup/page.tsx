'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Signup failed');
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-background dark:from-background dark:via-blue-950/10 dark:to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Robot Theme */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <div className="text-2xl">🤖</div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">FinanceTodoBot</h1>
          <p className="text-muted-foreground mt-2">Start Your AI Journey</p>
        </div>

        {/* Signup Card */}
        <Card className="border-2 border-secondary/20 shadow-2xl backdrop-blur">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Create Account</h2>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="border-secondary/30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="border-secondary/30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="border-secondary/30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="border-secondary/30"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 rounded-lg"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-center text-muted-foreground mb-4">
                Already have an account?
              </p>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="w-full border-secondary/50 text-secondary hover:bg-secondary/10 font-semibold bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          Secure Registration • No Credit Card Required
        </p>
      </div>
    </div>
  );
}
