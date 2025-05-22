import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    console.log('Received analyze-resume request');
    const { text, jobId } = await request.json();
    console.log('Request data:', { text: text.substring(0, 100) + '...', jobId });

    if (!text) {
      return NextResponse.json(
        { error: 'No resume text provided' },
        { status: 400 }
      );
    }

    // Define job requirements based on jobId
    const jobRequirements = {
      title: "Full Stack Developer",
      requirements: [
        "3+ years of product design experience",
        "Strong UI/UX portfolio demonstrating problem-solving",
        "Comfortable documenting Figma files and research",
        "Able to work independently and in fast-paced settings"
      ],
      responsibilities: [
        "Design and implement user interfaces",
        "Collaborate with cross-functional teams",
        "Create and maintain documentation",
        "Participate in code reviews"
      ]
    };

    // Prepare the system prompt
    const systemPrompt = `You are an expert resume analyzer. Analyze the provided resume against the job requirements and return structured feedback in JSON format. Provide a comprehensive, detailed assessment.

    For each category:
    - strengths: List specific skills/experiences from the resume that match the job requirements, with concrete examples
    - weaknesses: List specific requirements that are missing or insufficiently covered, with clear gaps identified
    - pros: List specific positive aspects evident from the resume content
    - cons: List specific gaps between requirements and what's shown in the resume
    - recommendedSkills: List specific skills that would help the candidate better meet the requirements
    - assessment: Provide a detailed assessment in this structure:
      * Opening: Brief overview of candidate's background and key qualifications
      * Main Assessment: Detailed analysis of strengths and gaps
      * Recommendations: Structured in sections:
        - Onboarding plan: Specific steps for initial integration
        - Training: Required skill development areas
        - Early wins: Suggested initial projects/tasks
        - Longer-term development: Growth path and milestones

    Return the analysis in this JSON format:
    {
      "match": number (0-100), // Calculate based on specific matches with requirements
      "strengths": string[], // Specific skills/experiences that match requirements
      "weaknesses": string[], // Specific requirements not adequately covered
      "pros": string[], // Specific positive aspects from the resume
      "cons": string[], // Specific gaps between requirements and resume
      "recommendedSkills": string[], // Specific skills needed to better meet requirements
      "assessment": string // Detailed assessment with structured sections
    }

    Job Requirements:
    Title: ${jobRequirements.title}
    Requirements: ${jobRequirements.requirements.join(', ')}
    Responsibilities: ${jobRequirements.responsibilities.join(', ')}

    ASSESSMENT GUIDELINES:
    1. Be specific and detailed in all assessments
    2. Reference actual content from the resume
    3. Compare directly to job requirements
    4. Structure the assessment in clear sections
    5. Provide actionable recommendations
    6. Include both immediate and long-term development paths`;

    console.log('Calling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    console.log('OpenAI API response received');
    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI API');
    }
    const result = JSON.parse(content);
    console.log('Parsed result:', result);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in analyze-resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
} 