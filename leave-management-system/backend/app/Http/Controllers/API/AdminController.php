<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Leave;

class AdminController extends Controller
{
    public function users()
    {
        $users = User::with(['role', 'leaves'])
            ->withCount('leaves')
            ->get();

        return response()->json($users);
    }

    public function leaves()
    {
        $leaves = Leave::with('user')->latest()->get();
        return response()->json($leaves);
    }

    public function approve($id)
    {
        $leave = Leave::findOrFail($id);
        $leave->update(['status' => 'approved']);

        return response()->json(['message' => 'Leave approved.']);
    }

    public function reject($id)
    {
        $leave = Leave::findOrFail($id);
        $leave->update(['status' => 'rejected']);

        return response()->json(['message' => 'Leave rejected.']);
    }
}
