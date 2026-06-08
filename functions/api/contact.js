// Cloudflare Pages Function — odbiera POST z formularza kontaktowego
// i wysyła e-mail przez Resend API.
//
// Wymaga sekretu RESEND_API_KEY (panel Cloudflare Pages → Settings → Environment variables,
// lokalnie: plik .dev.vars — patrz .dev.vars.example).

// FROM musi być na zweryfikowanej domenie w Resend (zlotorowicz.com).
// TO to skrzynka, którą realnie odbierasz — może być dowolny adres.
const FROM = 'Kacper Złotorowicz <kacper@zlotorowicz.com>'
const TO = 'kacper.zlotorowicz@outlook.com'

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) {
    return json({ error: 'Serwer nie jest skonfigurowany (brak klucza API).' }, 500)
  }

  let data
  try {
    data = await request.json()
  } catch {
    return json({ error: 'Niepoprawne dane formularza.' }, 400)
  }

  const { name, company, email, phone, message } = data || {}

  // Walidacja po stronie serwera (nie ufamy frontendowi).
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json({ error: 'Wymagane pola: imię i nazwisko, e-mail oraz opis.' }, 400)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Niepoprawny adres e-mail.' }, 400)
  }

  const html = `
    <h2>Nowa wiadomość z formularza zlotorowicz.com</h2>
    <p><strong>Imię i nazwisko:</strong> ${escapeHtml(name)}</p>
    ${company ? `<p><strong>Firma:</strong> ${escapeHtml(company)}</p>` : ''}
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
    <p><strong>Wiadomość:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: TO,
      reply_to: email,
      subject: `Nowy kontakt: ${name}`,
      html,
    }),
  })

  if (!resendRes.ok) {
    const detail = await resendRes.text().catch(() => '')
    console.error('Resend error:', resendRes.status, detail)
    return json(
      { error: 'Nie udało się wysłać wiadomości. Napisz proszę bezpośrednio na e-mail.' },
      502,
    )
  }

  return json({ ok: true })
}
