import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side validation using Zod
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Data formulir tidak valid",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Log internally without sensitive leaks
    console.log(`[FULLHOME ID Lead Received] Name: ${validatedData.name}, Location: ${validatedData.projectLocation}`);

    return NextResponse.json(
      {
        success: true,
        message: "Formulir konsultasi berhasil diterima.",
        lead: {
          name: validatedData.name,
          spaceType: validatedData.spaceType,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan internal server.",
      },
      { status: 500 }
    );
  }
}
