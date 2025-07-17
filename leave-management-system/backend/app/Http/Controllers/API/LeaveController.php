<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Leave;
use App\Http\Requests\StoreLeaveRequest;
use Illuminate\Support\Facades\Auth;

class LeaveController extends Controller
{
    public function index()
    {
        $leaves = Auth::user()->leaves()->latest()->get();
        return response()->json($leaves);
    }

    public function store(StoreLeaveRequest $request)
    {
        $leave = Leave::create([
            'user_id'    => Auth::id(),
            'type'       => $request->type,
            'reason'     => $request->reason,
            'start_date' => $request->start_date,
            'end_date'   => $request->end_date,
        ]);

        return response()->json([
            'message' => 'Leave request submitted successfully.',
            'leave'   => $leave,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $leave = Leave::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        if ($leave->status !== 'pending') {
            return response()->json(['message' => 'Only pending requests can be updated.'], 403);
        }

        $leave->update($request->only(['type', 'reason', 'start_date', 'end_date']));

        return response()->json(['message' => 'Leave request updated.', 'leave' => $leave]);
    }
}
