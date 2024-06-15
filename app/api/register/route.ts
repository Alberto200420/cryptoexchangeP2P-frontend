import { NextResponse } from 'next/server';

interface RequestBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
}

export async function POST(request: Request) {

  const body: RequestBody = await request.json();
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/users/`, {
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
    return NextResponse.json(data);
  } catch (error) {
    // Hubo un error con la solicitud de red
    return NextResponse.json({ error: 'There was an error with the network request' });
  }
}