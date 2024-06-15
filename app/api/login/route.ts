import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {

  const cookieStore = cookies();
  const body: RequestBody = await request.json();
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/jwt/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      // El servidor respondió con un código de estado de error
      return NextResponse.json({ error: res.statusText }, { status: res.status });
    }
    const data = await res.json();
    const { refresh, access } = data
    cookieStore.set({
      name: 'refresh',
      value: refresh,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/'
    })
    cookieStore.set({
      name: 'access',
      value: access,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      // maxAge: 600 * 10 * 24 // 10 min
    })
  
    return NextResponse.json(data);
  } catch (error) {
    // Hubo un error con la solicitud de red
    return NextResponse.json({ error: 'There was an error with the network request' });
  }
}