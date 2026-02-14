"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitProjectPermit(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const budget = formData.get("budget") as string;
  const specs = formData.get("specs") as string;

  try {
    await resend.emails.send({
      // Use your verified domain or the testing one provided by Resend
      from: "Layoutory Website <onboarding@layoutory.in>",
      to: "bhavyarathore575@gmail.com", 
      subject: `🚧 New Project Permit: ${name}`,
      html: `
        <h1>New Work Order Received</h1>
        <p><strong>Client:</strong> ${name}</p>
        <p><strong>Project Type:</strong> ${type}</p>
        <p><strong>Budget Range:</strong> ${budget}</p>
        <hr />
        <h3>Specs / Notes:</h3>
        <p>${specs}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}