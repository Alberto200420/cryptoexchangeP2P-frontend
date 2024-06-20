import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const formData = await request.formData();
  console.log(formData, 'FROM POST formData server')
  const slug = formData.get('slug') as string;
  const voucher = formData.get('voucher') as File;
  const bitcoin_value = formData.get('bitcoin_value') as string;
  
  const cookieStore = cookies();
  const accessCookie = cookieStore.get('access')?.value;

  if (!accessCookie) {
    return NextResponse.json({ error: 'Credenciales caducadas intentan iniciar sesión nuevamente' }, { status: 401 });
  }

  const body = new FormData();
  body.append('slug', slug);
  body.append('voucher', voucher);
  body.append('bitcoin_value', bitcoin_value);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/take-offer/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessCookie}`
      },
      body: body,
    });

    if (!res.ok) {
      return NextResponse.json({ error: res.statusText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'There was an error with the network request' });
  }
}
