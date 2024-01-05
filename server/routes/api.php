<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserEventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/filter', [EventController::class, 'filter']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/isRegistered', [UserController::class, 'isRegistered']);

Route::middleware('client.auth')->group(function () {
    
    Route::get('/user/{email}/events', [UserEventController::class, 'getUserEvents']);
    Route::get('/user/{email}/registeredEvents', [UserEventController::class, 'registeredEventsFromUser']);
    Route::get('/user/{email}/paidEvents', [UserEventController::class, 'paidEventsFromUser']);
    Route::get('/event/{id}/users', [UserEventController::class, 'getAssistants']);
    Route::get('/event/{id}/count', [UserEventController::class, 'getTotalAssistants']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
