import { NextResponse } from 'next/server'

/**
 * Contact Form API Route
 * 
 * This is a simple stub API endpoint that returns success.
 * In production, replace this with actual email service integration
 * (e.g., SendGrid, AWS SES, Resend, etc.)
 */

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, phone, message } = body
    
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // TODO: Integrate with email service
    // Example with SendGrid:
    // await sendEmail({
    //   to: 'sales@majdoman.com',
    //   from: 'noreply@alvia.com',
    //   subject: `New Contact Form Submission from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `
    // })

    console.log('Contact form submission:', { name, email, phone, message })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

