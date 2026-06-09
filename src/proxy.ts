import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {withAuth} from "next-auth/middleware"


export default withAuth(
  function proxy(){
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({req,token}) => {
        const {pathname} = req.nextUrl

        if(pathname.startsWith("/api/auth") || pathname.startsWith("/public") || pathname.startsWith("/login") || pathname.startsWith("/register")){
          return true
        }

        if(pathname.startsWith("/") || pathname.startsWith("/api/courses")){
          return true
        }
        console.log({token})
        return !!token 
        
      }
    }
  }
)


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)"
  ]
}


// export function middleware(request: NextRequest){
//   // return NextResponse.redirect(new URL("/", request.url))

//   const  response = NextResponse.next()
//   const themePreference = request.cookies.get("theme")
//   if(!themePreference){
//     response.cookies.set("theme", "dark")
//   }

//   return response
  
//   // if (request.nextUrl.pathname === "/profile"){
//   //   return NextResponse.rewrite(new URL("/hello", request.nextUrl))
//   // }
// }


// export const config = {
//   matcher: "/profile"
// }