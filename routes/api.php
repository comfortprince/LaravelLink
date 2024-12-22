<?php

use App\Http\Controllers\FilePondController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/filepond/process', [FilePondController::class, 'store']);
Route::delete('/filepond/revert/{uniqueId}', [FilePondController::class, 'revert']);
