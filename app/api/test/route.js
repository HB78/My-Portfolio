export async function GET(request) {
  try {
    return Response.json('Hello, Next.js!')
    
  } catch (error) {
   console.log(error)
   return Response.json("hello don't not work")
  }
}
