import { NextResponse } from 'next/server';

export async function POST(request: any) {

  const cookies = await request.headers.get('Cookie');
  let access = '';
  let refresh = '';

  // Dividir la cadena de cookies en cookies individuales
  const cookieArray = cookies.split(';');
  // Iterar sobre cada cookie y buscar access y refresh
  cookieArray.forEach((cookie: string) => {
    const [name, value] = cookie.trim().split('=');
    if (name === 'access') {
      access = value;
    } else if (name === 'refresh') {
      refresh = value;
    }
  });
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/jwt/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refresh=${refresh}`
      },
    });
    if (!res.ok) {
      // El servidor respondió con un código de estado de error
      return NextResponse.json({ error: res.statusText }, { status: res.status });
    }
    const data = await res.json();
    console.log(data)
    
    return NextResponse.json(cookies);
  } catch (error) {
    // Hubo un error con la solicitud de red
    return NextResponse.json({ error: 'There was an error with the network request' });
  }
}