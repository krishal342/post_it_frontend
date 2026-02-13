import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req) {
    const token = req.cookies.get('loginToken')?.value ;
    console.log('Middleware executed. Token:', token);
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [],
};