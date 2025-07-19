<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {       
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role_id'  => 'required|exists:roles,id', // employee/admin
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }        

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
            'role_id'  => $request->role_id,
        ]);        

        $token = $user->createToken('API Token')->accessToken;

        return response()->json([
            'message' => 'User registered successfully.',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
             $user = Auth::user()->load('role');
            $token = $user->createToken('API Token')->accessToken;

            return response()->json([
                'message' => 'Login successful.',
                'user'    => $user,
                'token'   => $token,
            ]);
        } else {
            return response()->json(['message' => 'Invalid credentials.'], 401);
        }
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
