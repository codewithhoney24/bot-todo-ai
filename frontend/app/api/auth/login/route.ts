import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Integrate with Better Auth
    // For now, return a mock response
    console.log('[v0] Login attempt for email:', email);

    // This should validate against database
    if (email === 'demo@example.com' && password === 'demo123') {
      const response = NextResponse.json(
        { message: 'Login successful', user: { email } },
        { status: 200 }
      );

      // Set session cookie
      response.cookies.set('auth-token', 'demo-token-' + Date.now(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
