<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use Inertia\Inertia;
Route::get('/test', function() {
    return 'Hello World';
});

Route::middleware(['auth', 'verified'])->group(function(){
    
    Route::get('/',[Homecontroller::class, 'home'])->name('dashboard');
    Route::get('/messages/{user?}', [HomeController::class, 'showConversation'])->name('messages');

    Route::get('/user/{user}', [MessageController::class,'byUser'])->name('chat.user');
    Route::get('/group/{group}', [MessageController::class,'byGroup'])->name('chat.group');
    Route::post('/message', [MessageController::class,'store'])->name('message.store');
    Route::delete('/message/{message}', [MessageController::class,'destroy'])->name('message.destroy');
    Route::get('/message/older/{message}', [MessageController::class,'loadOlder'])->name('message.loadOlder');
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
