
export async function POST(request: Request) {
  const comment = await request.json()

  const newComment = {
    message: comment.text
  }

  return new Response(JSON.stringify(newComment), {
    headers: {"Content-type": "application/json"},
    status: 201
  })
}


export async function GET() {
  return Response.json({hello: "what"})
}