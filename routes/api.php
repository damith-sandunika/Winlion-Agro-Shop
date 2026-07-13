<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\DashboardController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin API Routes
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/products', ProductController::class);
    Route::apiResource('/orders', OrderController::class)->except(['store']);
    
    // Settings, Suppliers, Stock Logs, Reports
    Route::get('/settings', [\App\Http\Controllers\Api\SettingController::class, 'index']);
    Route::post('/settings', [\App\Http\Controllers\Api\SettingController::class, 'update']);
    Route::apiResource('/suppliers', \App\Http\Controllers\Api\SupplierController::class);
    Route::apiResource('/stock-logs', \App\Http\Controllers\Api\StockLogController::class)->only(['index', 'store']);
    Route::get('/reports/sales', [\App\Http\Controllers\Api\ReportController::class, 'sales']);
    Route::get('/reports/orders', [\App\Http\Controllers\Api\ReportController::class, 'orders']);
    Route::get('/reports/stock', [\App\Http\Controllers\Api\ReportController::class, 'stock']);
});

// Public API Routes (for customer frontend)
Route::post('/public/orders', [OrderController::class, 'store']);
Route::get('/public/categories', [CategoryController::class, 'index']);
Route::get('/public/products', [ProductController::class, 'index']);
Route::get('/public/products/{product}', [ProductController::class, 'show']);
