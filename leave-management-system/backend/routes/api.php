<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LeaveController;
use App\Http\Controllers\API\AdminController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/leaves', [LeaveController::class, 'store']);
    Route::get('/leaves', [LeaveController::class, 'index']);
    Route::put('/leaves/{id}', [LeaveController::class, 'update']);

    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/users', [AdminController::class, 'users']);
        Route::get('/admin/leaves', [AdminController::class, 'leaves']);
        Route::put('/admin/leaves/{id}/approve', [AdminController::class, 'approve']);
        Route::put('/admin/leaves/{id}/reject', [AdminController::class, 'reject']);
    });
});
