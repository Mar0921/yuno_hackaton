import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await request.json();

    // Fetch documents list
    const documentsResponse = await fetch('https://l4pubebewf.execute-api.us-east-1.amazonaws.com/files?folder=uploads');
    const documents = await documentsResponse.json();

    // Extract text from all documents
    let contextText = '';
    for (const doc of documents) {
      const text = await extractTextFromDocument(doc.Key);
      contextText += `\n\nDocument: ${doc.Key}\n${text}`;
    }

    // Create system prompt with context
    const systemPrompt = `Eres un asistente útil que responde en español de forma clara y profesional. Tienes acceso a la siguiente información de documentos:\n${contextText}\n\nUsa esta información para responder preguntas del usuario.`;

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY || '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'}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-1106-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    const data = await openaiResponse.json();
    const response = data.choices?.[0]?.message?.content || 'No se recibió respuesta.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

async function extractTextFromDocument(key: string): Promise<string> {
  try {
    const response = await fetch(`https://l4pubebewf.execute-api.us-east-1.amazonaws.com/file?key=${key}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = key.split('/').pop() || '';
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'txt':
        return buffer.toString('utf-8');
      case 'csv':
        // For CSV, return as text
        return buffer.toString('utf-8');
      case 'pdf':
        // Placeholder: in a real implementation, use pdf-parse
        return 'Contenido del PDF no extraído (requiere pdf-parse)';
      case 'docx':
        // Placeholder: use mammoth
        return 'Contenido del DOCX no extraído (requiere mammoth)';
      case 'xlsx':
        // Placeholder: use xlsx
        return 'Contenido del XLSX no extraído (requiere xlsx)';
      default:
        return 'Tipo de archivo no soportado para extracción de texto';
    }
  } catch (error) {
    console.error(`Error extracting text from ${key}:`, error);
    return 'Error al extraer texto del documento';
  }
}